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

### Adımlar:

1. **GitHub Repository Oluştur**
   - GitHub'da yeni bir repository oluşturun
   - Repository adını not edin (örn: `durmus-akkaya-website`)

2. **next.config.js'i Güncelle**
   - `basePath` ve `assetPrefix` değerlerini repository adınıza göre güncelleyin

3. **GitHub'a Push Et**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
   git push -u origin main
   ```

4. **GitHub Pages Ayarları**
   - Repository Settings > Pages
   - Source: "GitHub Actions" seçin
   - Artık her push'ta otomatik deploy olacak

## 🔧 Yapılandırma

- `next.config.js`: Next.js yapılandırması
- `.github/workflows/deploy.yml`: GitHub Actions workflow

## 📝 Notlar

- GitHub Pages static export kullanır, bu yüzden API routes çalışmayacaktır
- Eğer API routes gerekiyorsa, Vercel veya başka bir platform kullanmanız önerilir

