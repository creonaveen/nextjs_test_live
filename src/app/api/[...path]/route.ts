import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'PUT');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'PATCH');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleRequest(request, resolvedParams, 'DELETE');
}

async function handleRequest(request: NextRequest, params: { path: string[] }, method: string) {
  try {
    const path = params.path.join('/');
    const baseUrl = process.env.BASE_API_URL;

    if (!baseUrl) {
      return NextResponse.json({ error: 'BASE_API_URL not configured' }, { status: 500 });
    }

    const url = `${baseUrl}api/${path}/`;

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    // Prepare headers without cookies
    const headers = new Headers();

    // Copy all headers except cookie-related ones
    request.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!['cookie', 'set-cookie', 'x-forwarded-cookie'].includes(lowerKey)) {
        headers.set(key, value);
      }
    });

    // Set authorization header
    headers.set('Authorization', 'Basic ZGV2ZWxvcGVyOkluc3RpdHV0dHZlaWVuMTA=');

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: 'omit', // Explicitly omit credentials
    };

    // Add body for POST, PUT, PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const body = await request.text();
      if (body) {
        requestOptions.body = body;
      }
    }
    // Make the request to the external API
    const response = await fetch(fullUrl, requestOptions);

    // Get response data
    const responseData = await response.text();

    // Prepare response headers without Set-Cookie
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!['set-cookie'].includes(lowerKey)) {
        responseHeaders.set(key, value);
      }
    });

    // Return response without cookies
    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
