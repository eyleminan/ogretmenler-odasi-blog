/**
 * Yahşihan Ölçme Değerlendirme Merkezi (Yahşihan ÖDM)
 * İlkokul (1., 2., 3., 4. Sınıf) Eğitim Blogu ve Materyal Veri Tabanı
 * "Öğrencilere Destek, Öğretmenlere Yardımcı"
 */

const DEFAULT_BLOG_DATA = {
  siteInfo: {
    name: "Yahşihan Ölçme Değerlendirme Merkezi",
    shortName: "Yahşihan ÖDM",
    slogan: "Öğrencilere Destek, Öğretmenlere Yardımcı",
    description: "1., 2., 3. ve 4. sınıf öğretmenlerimiz ve öğrencilerimiz için ücretsiz ders materyalleri, süreç odaklı ölçme araçları, okuma-yazma etkinlikleri ve sınıf içi dijital rehberler.",
    city: "Kırıkkale / Yahşihan",
    email: "yahsihanodm@meb.gov.tr"
  },

  categories: [
    {
      id: "1-sinif",
      name: "1. Sınıf Materyalleri",
      icon: "fa-solid fa-shapes",
      color: "#ec4899",
      bgColor: "rgba(236, 72, 153, 0.08)",
      description: "İlk okuma-yazma, ses temelli hece çalışmaları, çizgi etkinlikleri, el-göz koordinasyonu ve somut matematik.",
      gradeLevel: "1. Sınıf"
    },
    {
      id: "2-sinif",
      name: "2. Sınıf Materyalleri",
      icon: "fa-solid fa-puzzle-piece",
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.08)",
      description: "Ritmik saymalar, çarpım tablosu oyunları, anlamlı okuma metinleri ve temel hayat bilgisi etkinlikleri.",
      gradeLevel: "2. Sınıf"
    },
    {
      id: "3-sinif",
      name: "3. Sınıf Materyalleri",
      icon: "fa-solid fa-cubes",
      color: "#0284c7",
      bgColor: "rgba(2, 132, 199, 0.08)",
      description: "5N1K okuduğunu anlama sayfaları, problem çözme stratejileri, fen bilimleri keşif kartları.",
      gradeLevel: "3. Sınıf"
    },
    {
      id: "4-sinif",
      name: "4. Sınıf Materyalleri",
      icon: "fa-solid fa-graduation-cap",
      color: "#059669",
      bgColor: "rgba(5, 150, 105, 0.08)",
      description: "Beceri temelli sorular, sosyal bilgiler projeleri, yer kabuğu deneyleri ve ortaokula hazırlık fasikülleri.",
      gradeLevel: "4. Sınıf"
    },
    {
      id: "olcme-degerlendirme",
      name: "Ölçme & Değerlendirme",
      icon: "fa-solid fa-square-poll-vertical",
      color: "#d97706",
      bgColor: "rgba(217, 119, 6, 0.08)",
      description: "İlkokul için süreç odaklı rubrikler, gözlem formları, öğrenci öz değerlendirme ve biçimlendirici testler.",
      gradeLevel: "Tüm Kademeler"
    },
    {
      id: "ogretmen-teknoloji",
      name: "Öğretmen & Teknoloji",
      icon: "fa-solid fa-wand-magic-sparkles",
      color: "#4f46e5",
      bgColor: "rgba(79, 70, 229, 0.08)",
      description: "Sınıf öğretmenleri için yapay zekâ ile masal/boyama sayfası üretimi, akıllı tahta oyunları ve sınıf yönetimi.",
      gradeLevel: "Öğretmen Rehberi"
    }
  ],

  authors: {
    "ayse-ogretmen": {
      name: "Ayşe Çelik",
      title: "Uzman Sınıf Öğretmeni (1. & 2. Sınıf)",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
      bio: "14 yıldır ilkokul 1. ve 2. sınıflarda ilk okuma-yazma öğretimi ve oyun temelli matematik üzerine çalışan sınıf öğretmeni."
    },
    "mehmet-odm": {
      name: "Mehmet Yılmaz",
      title: "Ölçme ve Değerlendirme Koordinatörü",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      bio: "Yahşihan ÖDM bünyesinde ilkokul kademesi beceri temelli değerlendirme ve rubrik geliştirme sorumlusu."
    },
    "zeynep-hoca": {
      name: "Zeynep Demir",
      title: "Sınıf Öğretmeni & Eğitim Teknoloğu (3. & 4. Sınıf)",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
      bio: "İlkokulda akıllı tahta uygulamaları, dijital oyunlaştırma ve 4. sınıf fen deneyleri üzerine içerik geliştirmektedir."
    },
    "emre-hoca": {
      name: "Emre Aksoy",
      title: "İlkokul Matematik ve PDR Danışmanı",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
      bio: "İlkokul öğrencilerinde dikkat ve odaklanma oyunları, somut matematik materyalleri ve pozitif sınıf iklimi uzmanı."
    }
  },

  posts: [
    {
      id: 1,
      slug: "1-sinif-ilk-okuma-yazma-surecinde-heceleme-ve-ses-etkinlikleri",
      title: "1. Sınıf İlk Okuma Yazma Sürecinde Heceleme ve Ses Temelli Cümle Etkinlikleri Seti",
      category: "1-sinif",
      categoryName: "1. Sınıf Materyalleri",
      categoryColor: "#ec4899",
      date: "19 Ağustos 2026",
      readTime: "5 dk okuma",
      views: 3820,
      likes: 275,
      authorKey: "ayse-ogretmen",
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
      excerpt: "1. sınıf minik öğrencilerimiz için harf gruplarına göre ayrılmış, boyama ve kes-yapıştır destekli somut ilk okuma çalışma yaprakları.",
      tags: ["1. Sınıf", "İlk Okuma Yazma", "Ses Grubu", "Hece Tablosu", "Çalışma Kağıdı"],
      materials: [
        {
          name: "1_Sinif_ANETIL_Ses_Grubu_Hece_ve_Okuma_Fasikulu.pdf",
          size: "4.8 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        },
        {
          name: "Gorselli_Hece_Birlestirme_ve_Cizgi_Calismalari.pdf",
          size: "3.2 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">1. sınıf ilk okuma yazma süreci, hem minik öğrencilerimiz hem de öğretmenlerimiz için sabır, oyun ve somutlaştırma gerektiren büyülü bir yolculuktur. Harfleri yalnızca tahtaya yazmak yerine çoklu duyuya hitap eden etkinliklerle kalıcı hale getiriyoruz.</p>

        <h2>1. Ses Hissettirme ve Çoklu Duyu Etkinlikleri</h2>
        <p>Her yeni sese geçerken masal anlatımı, tekerleme ve drama ile sesin melodisini hissettirmek kritik öneme sahiptir. Öğrencilerin sesi parmaklarıyla havada, kum havuzunda ve oyun hamurunda şekillendirmesi kas hafızasını hızlandırır.</p>

        <div class="callout callout-tip">
          <div class="callout-icon"><i class="fa-solid fa-lightbulb"></i></div>
          <div class="callout-body">
            <h4>Öğretmen Tavsiyesi: Hece Treni Oyunu</h4>
            <p>Sınıfta oluşturacağınız 3 vagonlu bir karton tren maketine hece kartlarını takarak öğrencilerin yeni kelimeleri birleştirirken eğlenerek okumasını sağlayabilirsiniz.</p>
          </div>
        </div>

        <h2>2. Ezberletmeden Anlamlı Okumaya Geçiş</h2>
        <p>Hece ezberletmek yerine açık ve kapalı hecelerin ses birleşim mantığını kavratmak, ilerleyen aylardaki akıcı okumanın temel taşıdır.</p>
        <ul>
          <li><strong>Açık Heceler:</strong> Ba, Ka, Sa, Ma gibi ünlüyle biten canlı heceler.</li>
          <li><strong>Kapalı Heceler:</strong> Ak, El, On, Al gibi ses birleşimleri.</li>
          <li><strong>3 Sesli Anlamlı Kelimeler:</strong> Bak, Gel, Koş, Tut gibi eylem bildiren sözcükler.</li>
        </ul>

        <h2>3. İndirilebilir Sınıf İçi Materyaller</h2>
        <p>Aşağıdaki bağlantılardan MEB 1. sınıf müfredatına %100 uyumlu, yazdırılabilir A4 boyutundaki fasikülleri ücretsiz olarak indirebilirsiniz.</p>
      `
    },
    {
      id: 2,
      slug: "2-sinif-ritmik-saymalar-ve-carpim-tablosunu-somutlastiran-oyun-kartlari",
      title: "2. Sınıf Ritmik Saymalar ve Çarpım Tablosunu Somutlaştıran Oyun Kartları Paketi",
      category: "2-sinif",
      categoryName: "2. Sınıf Materyalleri",
      categoryColor: "#8b5cf6",
      date: "16 Ağustos 2026",
      readTime: "4 dk okuma",
      views: 3120,
      likes: 215,
      authorKey: "ayse-ogretmen",
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=1200",
      excerpt: "2., 3., 4., 5. ve 10'ar ritmik saymayı ve çarpım tablosu mantığını ezberletmeden oyunlaştıran renkli flash kartlar ve tombala oyunu.",
      tags: ["2. Sınıf", "Ritmik Sayma", "Çarpım Tablosu", "Matematik Oyunu", "İlkokul Matematik"],
      materials: [
        {
          name: "2_Sinif_Carpim_Tablosu_Tombala_ve_Oyun_Seti.pdf",
          size: "6.1 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        },
        {
          name: "Ritmik_Sayma_Tirtil_ve_Merdiven_Panosu.pdf",
          size: "2.9 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">İlkokul 2. sınıfta matematik sevgisinin temelini 'tekrar eden toplama işlemi' olarak çarpma kavramı oluşturur. Ritmik saymaları ritim, müzik ve renkli kartlarla öğrenen çocuklar çarpım tablosundan korkmaz!</p>

        <h2>Çarpma İşlemini Somutlaştırmanın 3 Yolu</h2>
        <p>Öğrenciye <em>3 x 4 = 12</em> ezberletilmeden önce; 3 kutunun içine 4'er ceviz koyularak toplamın 12 olduğu gösterilmelidir (Gruplama mantığı).</p>

        <div class="callout callout-tip">
          <div class="callout-icon"><i class="fa-solid fa-puzzle-piece"></i></div>
          <div class="callout-body">
            <h4>Sınıfta 'Çarpma Şampiyonu' Tombalası</h4>
            <p>PDF içeriğindeki tombala kartlarını öğrencilere dağıtın. Öğretmen <em>"5 kere 4?"</em> dediğinde taştaki 20 sayısını bulan ilk öğrenci pulunu yerleştirir.</p>
          </div>
        </div>
      `
    },
    {
      id: 3,
      slug: "3-sinif-okudugunu-anlama-ve-5n1k-metin-analizi-calisma-yapraklari",
      title: "3. Sınıf Okuduğunu Anlama ve 5N1K Metin Analizi Çalışma Yaprakları",
      category: "3-sinif",
      categoryName: "3. Sınıf Materyalleri",
      categoryColor: "#0284c7",
      date: "14 Ağustos 2026",
      readTime: "5 dk okuma",
      views: 2940,
      likes: 198,
      authorKey: "zeynep-hoca",
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Öğrencilerin okudukları hikâyelerden anlam çıkarmasını, ana fikir tespit etmesini ve 5N1K sorularını eksiksiz yanıtlamasını sağlayan eğlenceli metinler.",
      tags: ["3. Sınıf", "Türkçe", "5N1K", "Okuduğunu Anlama", "Hikaye Haritası"],
      materials: [
        {
          name: "3_Sinif_10_Adet_Ozgun_5N1K_Hikaye_Seti.pdf",
          size: "3.7 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        },
        {
          name: "Hikaye_Unsuru_ve_Karakter_Analiz_Formu.pdf",
          size: "1.4 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">3. sınıfta sadece hızlı okumak yeterli değildir; metindeki duygu geçişlerini anlamak, sebep-sonuç ilişkisi kurmak ve olay akışını zihinde canlandırmak hedeflenir.</p>

        <h2>5N1K Dedektifleri Etkinliği</h2>
        <p>Her öğrenciye bir dedektif büyüteci şablonu vererek metin içerisindeki <strong>Kim, Ne, Nerede, Ne Zaman, Nasıl ve Neden</strong> sorularının ipuçlarını farklı renkli fosforlu kalemlerle çizdiriyoruz.</p>

        <ul>
          <li><strong>Kim? (Mavi):</strong> Olayın kahramanları.</li>
          <li><strong>Nerede? (Yeşil):</strong> Mekân ve çevre detayları.</li>
          <li><strong>Ne Zaman? (Turuncu):</strong> Zaman dilimi.</li>
          <li><strong>Neden? (Kırmızı):</strong> Olayın gerçekleşme sebebi.</li>
        </ul>
      `
    },
    {
      id: 4,
      slug: "4-sinif-yer-kabugu-ve-maddenin-halleri-interaktif-deney-seti",
      title: "4. Sınıf Fen Bilimleri: Yer Kabuğu ve Maddenin Halleri İnteraktif Deney ve Görsel Seti",
      category: "4-sinif",
      categoryName: "4. Sınıf Materyalleri",
      categoryColor: "#059669",
      date: "11 Ağustos 2026",
      readTime: "4 dk okuma",
      views: 2680,
      likes: 184,
      authorKey: "zeynep-hoca",
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Sınıf ortamında basit malzemelerle yapılabilecek kayaç, fosil ve madde deneyleri; görsel şemalar ve deney raporu şablonları.",
      tags: ["4. Sınıf", "Fen Bilimleri", "Yer Kabuğu", "Maddenin Halleri", "Basit Deneyler"],
      materials: [
        {
          name: "4_Sinif_Fen_Bilimleri_Deney_ve_Gozlem_Defteri.pdf",
          size: "4.2 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">4. sınıf öğrencilerimizin bilime olan merakını uyandırmak için kitaptaki kuru tanımlar yerine mutfak malzemeleriyle (un, su, oyun hamuru, sirke) yapılan somut deneyler gibisi yoktur!</p>

        <h2>Sınıfta 15 Dakikada Fosil Oluşumu Deneyi</h2>
        <p>Oyun hamuru ve alçı kullanarak yaprak veya deniz kabuğu izi çıkarıyoruz. Öğrenciler milyonlarca yıllık jeolojik katmanlaşma mantığını kendi elleriyle deneyimliyor.</p>
      `
    },
    {
      id: 5,
      slug: "ilkokulda-surec-odakli-degerlendirme-ve-rubrik-sablonlari",
      title: "İlkokulda Süreç Odaklı Değerlendirme: Gözlem Formları ve Beceri Rubrikleri",
      category: "olcme-degerlendirme",
      categoryName: "Ölçme & Değerlendirme",
      categoryColor: "#d97706",
      date: "08 Ağustos 2026",
      readTime: "6 dk okuma",
      views: 4210,
      likes: 310,
      authorKey: "mehmet-odm",
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Yahşihan ÖDM onaylı; ilkokul 1-4. sınıf Türkçe, Matematik ve Hayat Bilgisi kazanımları için hazırlanmış hazır rubrik ve gözlem ölçekleri.",
      tags: ["Yahşihan ÖDM", "Ölçme Değerlendirme", "Rubrik", "Süreç Değerlendirme", "Gözlem Formu"],
      materials: [
        {
          name: "Ilkokul_1_4_Sinif_Surec_Odakli_Rubrik_Paketi.xlsx",
          size: "850 KB",
          format: "XLSX",
          icon: "fa-solid fa-file-excel"
        },
        {
          name: "Ogrenci_Bireysel_Gelisim_ve_Gozlem_Olcegi_PDF.pdf",
          size: "2.1 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">İlkokul kademesinde klasik not odaklı sınavlar yerine; çocuğun çabasını, akran işbirliğini ve beceri kazanımını ölçen süreç temelli araçlar kullanılmalıdır.</p>

        <h2>Yahşihan ÖDM Süreç Odaklı Değerlendirme İlkeleri</h2>
        <ul>
          <li><strong>Anlık Geribildirim:</strong> Hatanın hemen ardından düzeltici, cesaretlendirici ipucu vermek.</li>
          <li><strong>Öz Değerlendirme:</strong> Öğrencinin 'Bugün neyi iyi yaptım, nerede zorlandım?' sorusunu cevaplaması.</li>
          <li><strong>Gelişim Dosyası (Portfolyo):</strong> Öğrencinin dönem başı ile dönem sonu arasındaki somut ilerlemesini belgelemek.</li>
        </ul>
      `
    },
    {
      id: 6,
      slug: "sinif-ogretmenleri-icin-yapay-zeka-ozgun-okuma-masali-ve-boyama-sayfasi",
      title: "Sınıf Öğretmenleri İçin Yapay Zekâ: Dakikalar İçinde Özgün Masal ve Boyama Sayfası Üretimi",
      category: "ogretmen-teknoloji",
      categoryName: "Öğretmen & Teknoloji",
      categoryColor: "#4f46e5",
      date: "03 Ağustos 2026",
      readTime: "5 dk okuma",
      views: 3650,
      likes: 289,
      authorKey: "emre-hoca",
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Sınıfınızdaki öğrencilerin isimlerinin geçtiği eğitici değerler masalları ve ders kazanımına özel çizgi boyama sayfalarını yapay zekâ ile üretme rehberi.",
      tags: ["Yapay Zekâ", "Sınıf Öğretmeni", "ChatGPT", "Değerler Eğitimi", "Boyama Sayfası"],
      materials: [
        {
          name: "Sinif_Ogretmenleri_Icin_25_Hazir_Masal_ve_Etkinlik_Promptu.pdf",
          size: "2.8 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">Bir sınıf öğretmeninin en büyük gücü öğrencilerini tanımasıdır. Yapay zekâyı kullanarak sınıfınızdaki Ali, Elif ve Can'ın başkahraman olduğu, 'paylaşma' veya 'doğa sevgisi' temalı sıcacık bir okuma masalını 1 dakikada üretebilirsiniz.</p>

        <h2>Örnek Değerler Eğitimi Masal Promptu:</h2>
        <pre><code>"Sen deneyimli bir ilkokul 2. sınıf öğretmenisin. Sınıfımdaki öğrenciler için 'Arkadaşlık ve Yardımlaşma' temasını işleyen, içinde basit heceler ve diyaloglar bulunan 150 kelimelik neşeli bir masal yaz. Masalın sonuna 3 adet okuduğunu anlama sorusu ekle."</code></pre>
      `
    }
  ],

  faqs: [
    {
      question: "Yahşihan ÖDM materyallerini sınıfımda çıktı alarak ücretsiz dağıtabilir miyim?",
      answer: "Kesinlikle evet! Yahşihan Ölçme Değerlendirme Merkezi olarak sitemizdeki tüm çalışma yaprakları, fasiküller, rubrikler ve testler ilkokul öğretmenlerimize ve öğrencilerimize tamamen ücretsizdir."
    },
    {
      question: "Materyaller MEB ilkokul (1-4. Sınıf) müfredatına ve kazanımlarına uygun mu?",
      answer: "Evet, paylaşılan her çalışma kağıdı ve değerlendirme ölçeği Milli Eğitim Bakanlığı Temel Eğitim Genel Müdürlüğü'nün güncel ilkokul ders kazanımları ve haftalık ders çizelgesi titizlikle incelenerek hazırlanmıştır."
    },
    {
      question: "Sınıf öğretmeni olarak ben de hazırladığım özgün materyalleri paylaşabilir miyim?",
      answer: "Çok memnun oluruz! Sitemizin İletişim sayfasından veya Yahşihan ÖDM iletişim kanallarından hazırladığınız PDF/Word materyallerinizi bize ulaştırabilir, adınızla sitede yayınlatabilirsiniz."
    },
    {
      question: "Admin panelinden yeni blog yazısı veya ders materyali nasıl eklenir?",
      answer: "Sayfanın üst menüsündeki 'Admin Paneli' butonuna tıklayarak veya doğrudan '#admin' adresine giderek teknik bilgiye gerek kalmadan yeni başlık, kapak görseli ve içerik girip anında yayınlayabilirsiniz."
    }
  ]
};

// Global export
if (typeof window !== "undefined") {
  window.DEFAULT_BLOG_DATA = DEFAULT_BLOG_DATA;
}
