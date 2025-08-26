export function getBasePath(): string {
  if (typeof window == 'undefined') {
    return process.env.BASE_PATH || '';
  }
  return '';
}

export function getImageBasePath(): string {
  return process.env.IMAGE_BASE_PATH || '';
}
