// Helper function for image paths in static export
export function getImagePath(path: string): string {
  if (!path) return "/og-image.png";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return path.startsWith("/") ? path : `/${path}`;
}
