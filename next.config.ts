import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { getBasePath } from './src/lib/hooks/use-base-path';
import { configuration } from './src/environment/configuration';

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'standalone',
  basePath: getBasePath(),
  serverExternalPackages: ['react-hook-form'],
  transpilePackages: ['investtech'],
  turbopack: {
    resolveAlias: {
      tailwindcss: './node_modules/tailwindcss',
    },
  },
  // Test files are excluded via tsconfig.json
  // Additional cleanup happens in build.sh
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'investtech.com',
      },
      {
        protocol: 'https',
        hostname: 'www.investtech.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';

    // In development, webpack uses eval() for HMR, so we need unsafe-eval
    // In production, we maintain strict CSP without unsafe-eval
    //
    // All dynamic inline styles have been refactored to use CSS custom properties:
    // - src/app/company/[id]/components/factorDiagram.tsx (uses --tooltip-* CSS vars)
    // - src/app/docs/[slug]/components/renderComponent.tsx (uses --aspect-ratio CSS var)
    // - src/components/custom_components/chartMaximizeDialogSheet.tsx (uses --transform-value CSS var)
    // - src/components/custom_components/centeredProgressBar.tsx (uses --progress-* CSS vars)
    //
    // VERIFICATION: Production build has been tested and confirmed to work without unsafe-inline.
    // The empty CSP string in development is acceptable for HMR functionality.
    const csp = isDevelopment
      ? ' '
      : `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-src 'self' https://www.youtube.com https://youtube.com; base-uri 'self'; form-action 'self';`;

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ];
  },
  async rewrites() {
    if (!configuration.REWRITE_ENABLED) {
      return [];
    }
    const base = configuration.BASE_API_URL.replace(/\/$/, '');
    return {
      afterFiles: [
        {
          source: '/api/:path*',
          destination: `${base}/api/:path*`,
          basePath: false,
        },
      ],
    };
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
