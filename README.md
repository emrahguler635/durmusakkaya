# Dr. Durmuş AKKAYA - Web Sitesi

Bu proje, Dr. Durmuş AKKAYA'nın kişisel web sitesi ve yönetim panelidir.

## 🚀 Özellikler

- Modern ve responsive tasarım
- Haber yönetim sistemi
- Yönetim paneli
- Next.js 14 ile geliştirilmiştir

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production sunucusunu başlat
npm start
```

## 🌐 GitHub Pages'e Deploy

Bu proje GitHub Pages üzerinde otomatik olarak deploy edilir.

**Site URL:** https://emrahguler635.github.io/durmusakkaya/

### Otomatik Deploy

- Her `main` branch'ine push yapıldığında otomatik olarak deploy edilir
- GitHub Actions workflow'u otomatik olarak çalışır
- Deploy durumunu "Actions" sekmesinden takip edebilirsiniz

## 🔧 Yapılandırma

- `next.config.js`: Next.js yapılandırması
- `.github/workflows/deploy.yml`: GitHub Actions workflow

## 📝 Notlar

- GitHub Pages static export kullanır, bu yüzden API routes çalışmayacaktır
- Eğer API routes gerekiyorsa, Vercel veya başka bir platform kullanmanız önerilir

