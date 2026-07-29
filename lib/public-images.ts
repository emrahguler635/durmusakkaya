// Public klasöründeki resimlerin listesi
// Yeni resim eklediğinizde buraya ekleyin
// This file is only used client-side in admin panel

export const publicImages = [
  { name: "Varsayılan Resim", url: "/og-image.png" },
  { name: "Logo", url: "/logo.png" },
  { name: "Profil Resmi", url: "/profile.jpg" },
  { name: "Slider 1", url: "/slider1.jpg" },
  { name: "Haber 1 - Yılın CEO'su Ödülü", url: "/haber1.jpg" },
  { name: "Haber 2 - Yeni Stratejik Ortaklık", url: "/haber2.jpg" },
  { name: "Haber 3 - Sürdürülebilirlik Zirvesi", url: "/haber3.jpg" },
  { name: "Haber 4 - Dijital Dönüşüm Projesi", url: "/haber4.jpg" },
];

// Helper function to get full path with basePath
export function getPublicImagePath(path: string): string {
  const basePath = '/durmusakkaya';
  if (!path) return `${basePath}/og-image.png`;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
