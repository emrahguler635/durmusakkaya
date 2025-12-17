// Public klasöründeki resimlerin listesi
// Yeni resim eklediğinizde buraya ekleyin
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
  const basePath = process.env.NODE_ENV === 'production' ? '/durmusakkaya' : '';
  return `${basePath}${path}`;
}

