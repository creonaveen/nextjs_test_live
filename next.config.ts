import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { getBasePath } from './src/lib/hooks/useBasePath';

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'standalone',
  basePath: getBasePath(),
  assetPrefix: `${getBasePath()}/`,
  /* images: {
    domains: ['firebasestorage.googleapis.com'],
  }, */
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
