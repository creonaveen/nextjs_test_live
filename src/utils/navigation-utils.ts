export const getUrlWithParams = (path: string, searchParams: string | URLSearchParams) => {
  // Check if the path already contains query parameters
  const [basePath, existingQueryString] = path.split('?');

  // Start with any existing params from the path
  const existingParams = new URLSearchParams(existingQueryString || '');

  // Get the new params from searchParams
  const newParams = new URLSearchParams(searchParams.toString());

  // Merge params: searchParams take priority over existing params in the path
  // This ensures we don't duplicate params like market_id and lang
  existingParams.forEach((value, key) => {
    if (!newParams.has(key)) {
      newParams.set(key, value);
    }
  });

  const queryString = newParams.toString();
  return `${basePath}${queryString ? `?${queryString}` : ''}`;
};

/**
 * Reloads the current page.
 */
export const reloadPage = () => {
  window.location.reload();
};

/**
 * Redirects to the specified URL.
 * @param url - The URL to redirect to
 */
export const redirectToUrl = (url: string) => {
  window.location.href = url;
};
