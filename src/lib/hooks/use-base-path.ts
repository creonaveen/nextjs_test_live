import { configuration } from '../../environment/configuration';

export function getBasePath(): string {
  // In development, don't use basePath so localhost:3000/ works
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  if (typeof window === 'undefined') {
    return configuration.BASE_PATH || '';
  }
  return configuration.BASE_PATH;
}
