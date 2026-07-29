// Helper function for image paths in static export
export function getImagePath(path: string): string {
  const basePath = '/durmusakkaya';
  if (!path) return `${basePath}/og-image.png`;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
