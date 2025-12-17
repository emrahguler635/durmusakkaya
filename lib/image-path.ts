// Helper function for image paths in static export
export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/durmusakkaya' : '';
  return `${basePath}${path}`;
}

