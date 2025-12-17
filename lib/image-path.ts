// Helper function for image paths in static export
export function getImagePath(path: string): string {
  // Always use basePath for GitHub Pages
  const basePath = '/durmusakkaya';
  // Remove leading slash from path if it exists to avoid double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}

