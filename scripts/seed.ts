import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@basak.com.tr" },
    update: { password: hashedPassword },
    create: {
      email: "admin@basak.com.tr",
      password: hashedPassword,
      name: "Admin",
      role: "admin"
    }
  });

  // Create sample news
  const newsData = [
    {
      title: "Başak A.Ş. Yıllık Toplantısı Gerçekleştirildi",
      summary: "Şirketimizin yıllık değerlendirme toplantısı başarıyla tamamlandı. Gelecek hedefler ve stratejiler belirlendi.",
      content: "Başak A.Ş. olarak yıllık değerlendirme toplantımızı başarıyla gerçekleştirdik. Toplantıda geçtiğimiz yılın performansı değerlendirildi ve önümüdeki dönem için stratejik hedefler belirlendi.\n\nEkibimizle birlikte sürdürülebilir büyüme ve inovasyon odaklı projeler üzerinde çalışmaya devam ediyoruz.",
      imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/professional-business-youtube-thumbnail-design-template-18657e12282bb71600d8e45b11d23619_screen.jpg",
      slug: "basak-yillik-toplantisi",
      published: true
    },
    {
      title: "Yeni Yatırım Projeleri Açıklandı",
      summary: "Şirketimiz önemli yatırım projelerini kamuoyuyla paylaştı. Büyüme stratejisi doğrultusunda adımlar atılıyor.",
      content: "Başak A.Ş. olarak büyüme stratejimiz doğrultusunda yeni yatırım projelerimizi açıkladık.\n\nTeknoloji ve inovasyon alanındaki yatırımlarımız, sektördeki rekabet gücümüzü artırmayı hedefliyor. Önümüdeki dönemde bu projelerin detaylarını paylaşmaya devam edeceğiz.",
      imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/074/148/970/small_2x/stock-market-price-changes-background-video.jpg",
      slug: "yeni-yatirim-projeleri",
      published: true
    },
    {
      title: "Teknoloji Zirvesi'nde Konuşmacı Olduk",
      summary: "Dr. Durmuş AKKAYA, Türkiye Teknoloji Zirvesi'nde dijital dönüşüm konusunda sunum yaptı.",
      content: "Türkiye Teknoloji Zirvesi'nde \"Kurumsal Dijital Dönüşüm\" konulu bir sunum gerçekleştirdim.\n\nSunumda şirketlerin dijital dönüşüm süreçlerinde karşılaştıkları zorlukları ve başarılı örnekleri paylaştım. Katılımcılarla verimli bir fikir alışverişinde bulunduk.",
      imageUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/tech-news-vlog-banner-design-template-d0bcbaa36f7aba8df3f78c22a6975884_screen.jpg",
      slug: "teknoloji-zirvesi-konusmaci",
      published: true
    }
  ];

  for (const news of newsData) {
    await prisma.news.upsert({
      where: { slug: news.slug },
      update: {},
      create: news
    });
  }

  console.log("Seed tamamlandı!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
