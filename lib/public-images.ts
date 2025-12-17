// Public klasöründeki resimlerin listesi
// Yeni resim eklediğinizde buraya ekleyin
export const publicImages = [
  { name: "Varsayılan Resim", url: "/og-image.png" },
  { name: "Logo", url: "/logo.png" },
  { name: "Profil Resmi", url: "/profile.jpg" },
  { name: "Slider 1", url: "/slider1.jpg" },
  // Yeni resim eklediğinizde buraya ekleyin:
  // { name: "Haber 1", url: "/haber1.jpg" },
  // { name: "Haber 2", url: "/haber2.jpg" },
];

// Helper function to get full path with basePath
export function getPublicImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/durmusakkaya' : '';
  return `${basePath}${path}`;
}

