/**
 * Öğretmenler İçin Eğitim Blogu - Veri Tabanı ve Örnek İçerikler
 */

const BLOG_DATA = {
  categories: [
    {
      id: "yapay-zeka",
      name: "Yapay Zekâ",
      icon: "fa-solid fa-brain",
      color: "#4f46e5",
      bgColor: "rgba(79, 70, 229, 0.08)",
      description: "Eğitimde ChatGPT, Claude, görsel üretim araçları ve yapay zekâ destekli ders hazırlık rehberleri.",
      count: 2
    },
    {
      id: "ders-materyalleri",
      name: "Ders Materyalleri",
      icon: "fa-solid fa-folder-open",
      color: "#0284c7",
      bgColor: "rgba(2, 132, 199, 0.08)",
      description: "Tüm branşlar için hazır çalışma yaprakları, sunumlar, interaktif etkinlikler ve indirilebilir PDF'ler.",
      count: 2
    },
    {
      id: "egitim-teknolojileri",
      name: "Eğitim Teknolojileri",
      icon: "fa-solid fa-laptop-code",
      color: "#059669",
      bgColor: "rgba(5, 150, 105, 0.08)",
      description: "Sınıf içi etkileşim araçları, dijital tahta uygulamaları, web 2.0 araçları ve eğitim yazılımları.",
      count: 1
    },
    {
      id: "pedagoji-rehberlik",
      name: "Pedagoji & Rehberlik",
      icon: "fa-solid fa-chalkboard-user",
      color: "#d97706",
      bgColor: "rgba(217, 119, 6, 0.08)",
      description: "Sınıf yönetimi, öğrenci motivasyonu, pozitif disiplin stratejileri ve veli iletişimi rehberleri.",
      count: 2
    },
    {
      id: "olcme-degerlendirme",
      name: "Ölçme & Değerlendirme",
      icon: "fa-solid fa-square-poll-vertical",
      color: "#db2777",
      bgColor: "rgba(219, 39, 119, 0.08)",
      description: "Yeni nesil soru hazırlama teknikleri, rubrik şablonları, formatif ve summatif değerlendirme araçları.",
      count: 1
    }
  ],

  authors: {
    "zeynep-kaya": {
      name: "Öğr. Gör. Zeynep Kaya",
      title: "Eğitim Teknoloğu & Yapay Zekâ Eğitmeni",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
      bio: "12 yıldır öğretmen eğitimi, dijital pedagoji ve sınıfta üretken yapay zekâ entegrasyonu üzerine çalışmaktadır."
    },
    "murat-demir": {
      name: "Murat Demir",
      title: "Uzman Matematik Öğretmeni",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      bio: "Ortaokul ve lise kademelerinde GeoGebra ve somutlaştırılmış matematik etkinlikleri geliştiren eğitim gönüllüsü."
    },
    "elif-sahin": {
      name: "Elif Şahin",
      title: "Bilişim Teknolojileri & Kodlama Öğretmeni",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
      bio: "Web 2.0 araçları, eğitsel oyunlaştırma ve sınıf içi interaktif etkileşim platformları uzmanı."
    },
    "ahmet-yilmaz": {
      name: "Dr. Ahmet Yılmaz",
      title: "Eğitim Bilimci & PDR Uzmanı",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      bio: "Sınıf iklimi, pozitif disiplin yöntemleri ve öğretmen iyi oluş hali (well-being) araştırmacısı."
    },
    "selin-yurtsever": {
      name: "Selin Yurtsever",
      title: "Ölçme ve Değerlendirme Uzmanı",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
      bio: "Beceri temelli soru yazımı, dereceli puanlama anahtarı (rubrik) geliştirme ve MEB müfredat danışmanı."
    }
  },

  posts: [
    {
      id: 1,
      slug: "ogretmenler-icin-chatgpt-ve-yapay-zeka-rehberi",
      title: "Öğretmenler İçin ChatGPT ve Yapay Zekâ Rehberi: 10 Kat Hızlı Ders Planı ve Sınav Hazırlama",
      category: "yapay-zeka",
      categoryName: "Yapay Zekâ",
      categoryColor: "#4f46e5",
      date: "18 Ağustos 2026",
      readTime: "6 dk okuma",
      views: 3420,
      likes: 218,
      authorKey: "zeynep-kaya",
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Haftalık ders planlarını, Bloom taksonomisine uygun soru köklerini ve seviyelendirilmiş okuma metinlerini yapay zekâ ile dakikalar içinde nasıl hazırlayabilirsiniz?",
      tags: ["ChatGPT", "Yapay Zekâ", "Ders Planı", "Bloom Taksonomisi", "Prompt Mühendisliği"],
      materials: [
        {
          name: "Ogretmenler_Icin_50_Hazir_ChatGPT_Prompt_Sablonu.pdf",
          size: "2.4 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        },
        {
          name: "Bloom_Taksonomisine_Uygun_Soru_Uretim_Matrisi.xlsx",
          size: "450 KB",
          format: "XLSX",
          icon: "fa-solid fa-file-excel"
        }
      ],
      content: `
        <p class="lead">Geleneksel ders hazırlığı süreçleri; haftalık kazanım planları, farklı öğrenme hızlarına göre ödev ayrıştırma ve soru hazırlama gibi adımlarla öğretmenlerin saatlerini alabiliyor. Doğru kurgulanmış yapay zekâ komutları (promptlar) sayesinde bu süreyi %80 oranında kısaltmak mümkün.</p>
        
        <h2>1. Yapay Zekâ Bir Öğretmenin Yerini Alabilir mi?</h2>
        <p>Kesinlikle hayır. Yapay zekâ bir "öğretmen" değil; öğretmenin yükünü hafifleten, fikir veren ve rutin görevleri otomatize eden çok güçlü bir <strong>öğretmen asistanıdır</strong>. Pedagojik kararlar, öğrencinin gözünün içine bakarak anlaşılan duygu durumu ve sınıf atmosferinin yönetimi daima öğretmenin tekelindedir.</p>

        <div class="callout callout-tip">
          <div class="callout-icon"><i class="fa-solid fa-lightbulb"></i></div>
          <div class="callout-body">
            <h4>Altın Kural: Rol + Bağlam + Görev + Format</h4>
            <p>ChatGPT'ye sadece <em>"Bana 7. sınıf fen ders planı yaz"</em> demek yerine; <em>"Sen deneyimli bir fen bilimleri öğretmenisin. 7. sınıf 'Kuvvet ve Enerji' ünitesi için 40 dakikalık, 5E öğrenme modeline uygun, interaktif etkinlik içeren bir ders akışı hazırla."</em> şeklinde komut vermelisiniz.</p>
          </div>
        </div>

        <h2>2. Bloom Taksonomisine Uygun Çoktan Seçmeli ve Açık Uçlu Soru Üretimi</h2>
        <p>Öğrencilerinizin sadece ezber düzeyini (Hatırlama) değil; analiz, değerlendirme ve sentez basamaklarını ölçmek istiyorsanız aşağıdaki prompt yapısını kullanabilirsiniz:</p>

        <pre><code>[KAZANIM]: 8. Sınıf Türkçe - Cümlenin Ögeleri
[HEDEF SEVİYE]: LGS formatında, beceri temelli ve günlük yaşam senaryolu.
[İSTEK]: Yukarıdaki kazanıma yönelik; 2 adet hatırlama, 2 adet analiz ve 1 adet sentez düzeyinde 5 adet çoktan seçmeli soru hazırla. Her sorunun doğru cevabını ve çeldiricilerin pedagojik açıklamasını ekle.</code></pre>

        <h2>3. Farklılaştırılmış Öğretim (Differentiated Instruction)</h2>
        <p>Aynı sınıfta bulunan farklı anlama hızlarındaki öğrenciler için aynı metnin 3 farklı seviyesini üretmek ChatGPT ile 30 saniyelik bir iştir:</p>
        <ul>
          <li><strong>Seviye 1 (Temel Düzey):</strong> Kısa cümleler, sadeleştirilmiş terimler ve görsel betimlemeler.</li>
          <li><strong>Seviye 2 (Müfredat Standart):</strong> Standart 6. sınıf kazanım düzeyi.</li>
          <li><strong>Seviye 3 (İleri Düzey / Zenginleştirilmiş):</strong> Kritik düşünme soruları ve çapraz disiplin bağlantıları.</li>
        </ul>

        <div class="callout callout-info">
          <div class="callout-icon"><i class="fa-solid fa-download"></i></div>
          <div class="callout-body">
            <h4>Dersinizde Hemen Kullanabileceğiniz Ekler</h4>
            <p>Aşağıdaki materyaller bölümünden, Türkiye müfredatına özel test edilmiş 50 adet öğretmen prompt şablonunu tek tıkla cihazınıza indirebilirsiniz.</p>
          </div>
        </div>
      `
    },
    {
      id: 2,
      slug: "matematik-icin-interaktif-geogebra-ve-calisma-kagitlari",
      title: "Ortaokul ve Lise Matematik İçin İnteraktif GeoGebra ve Çalışma Kâğıtları Seti",
      category: "ders-materyalleri",
      categoryName: "Ders Materyalleri",
      categoryColor: "#0284c7",
      date: "15 Ağustos 2026",
      readTime: "4 dk okuma",
      views: 2890,
      likes: 194,
      authorKey: "murat-demir",
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Öğrencilerin geometri ve fonksiyonları soyut bir ezber yerine dinamik sürgülerle keşfederek öğrenmelerini sağlayan hazır GeoGebra materyal paketi.",
      tags: ["Matematik", "GeoGebra", "Ders Materyali", "Geometri", "LGS & YKS"],
      materials: [
        {
          name: "GeoGebra_Trigonometri_ve_Fonksiyonlar_Paketi.zip",
          size: "8.1 MB",
          format: "ZIP",
          icon: "fa-solid fa-file-zipper"
        },
        {
          name: "Somut_Matematik_Etkinlik_Sayfalari_PDF.pdf",
          size: "4.7 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">Matematik öğretiminde en büyük zorluklardan biri, öğrencilerin 2 boyutlu tahtada veya defterde soyut kalan kavramları zihinlerinde canlandıramamasıdır. GeoGebra gibi dinamik yazılımlar bu bariyeri tamamen ortadan kaldırıyor.</p>

        <h2>Neden Dinamik Geometri Araçları?</h2>
        <p>Öğrenciye bir üçgenin iç açıları toplamının 180 derece olduğunu söylemek bir bilgidir; ancak köşeleri fareyle sürüklerken açılar değiştiği halde toplamın sürekli 180 kaldığını kendi gözleriyle görmesi <strong>derin ve kalıcı öğrenmedir</strong>.</p>

        <div class="callout callout-tip">
          <div class="callout-icon"><i class="fa-solid fa-check-double"></i></div>
          <div class="callout-body">
            <h4>Akıllı Tahta İle Uyumlu Kullanım İpucu</h4>
            <p>Materyal paketimizdeki <code>.ggb</code> uzantılı dosyaları herhangi bir kurulum yapmadan doğrudan <em>geogebra.org/classic</em> üzerinden akıllı tahtanızda tam ekran çalıştırabilirsiniz.</p>
          </div>
        </div>

        <h2>Paket İçeriğinde Neler Var?</h2>
        <ul>
          <li><strong>Pisagor Teoremi Kanıt Simülatörü:</strong> Alan korunumlu dinamik su tankı ve kare parçalama animasyonu.</li>
          <li><strong>Fonksiyon Dönüşümleri:</strong> Parabol ve trigonometrik eğrilerin katsayı değişimlerine göre şekil alma kılavuzu.</li>
          <li><strong>Dairede Açı & Yay İlişkisi:</strong> Teğet-kiriş açılarının interaktif sürgü kontrolleri.</li>
        </ul>
      `
    },
    {
      id: 3,
      slug: "sinifta-etkilesimi-artiran-7-ucretsiz-dijital-arac",
      title: "Sınıfta Katılımı ve Etkileşimi Zirveye Taşıyan 7 Ücretsiz Dijital Araç",
      category: "egitim-teknolojileri",
      categoryName: "Eğitim Teknolojileri",
      categoryColor: "#059669",
      date: "12 Ağustos 2026",
      readTime: "5 dk okuma",
      views: 4120,
      likes: 312,
      authorKey: "elif-sahin",
      isFeatured: true,
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Padlet, Mentimeter, Canva Edu, Wordwall ve daha fazlası... Sınıftaki her öğrencinin derse aktif katılımını sağlayan pratik eğitim teknolojileri rehberi.",
      tags: ["Web 2.0", "Eğitim Teknolojileri", "Oyunlaştırma", "Canva", "Mentimeter", "Wordwall"],
      materials: [
        {
          name: "Sinif_Ici_Dijital_Araclar_Karsilastirma_Tablosu.pdf",
          size: "1.8 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">Sınıfta parmak kaldıran 3-4 öğrenciyle ders işleme devri kapandı. Tüm sınıfın anonim veya isimli olarak fikir belirttiği, anlık oylama yaptığı ve eğitsel oyunlarla öğrendiği bir sınıf ortamı yaratmak artık çok kolay.</p>

        <h2>1. Mentimeter (Anlık Geri Bildirim ve Kelime Bulutu)</h2>
        <p>Derse başlarken öğrencilerin konuya dair ön bilgilerini veya hislerini 1 dakikalık bir "Kelime Bulutu" (Word Cloud) anketiyle tahtaya yansıtabilirsiniz. Telefon veya tablet üzerinden QR kodla 10 saniyede katılım sağlanır.</p>

        <h2>2. Padlet (Dijital Mantar Pano)</h2>
        <p>Grup projeleri, ödev teslimleri ve sınıf içi beyin fırtınaları için öğrencilerin resim, ses kaydı, metin ve bağlantı yapıştırabildiği harika bir işbirlikli çalışma alanı.</p>

        <h2>3. Wordwall (Hızlı Oyunlaştırma)</h2>
        <p>5 dakikada eşleştirme, çarkıfelek, köstebek vurmaca veya labirent kovalamaca formatında interaktif testler oluşturup akıllı tahtada yarışma düzenleyebilirsiniz.</p>

        <h2>4. Canva for Education (Tamamen Ücretsiz Pro Özellikler)</h2>
        <p>Öğretmen belgenizle başvurduğunuzda Canva'nın tüm premium grafik, sunum ve çalışma sayfası şablonlarına ömür boyu ücretsiz erişim sağlayabilirsiniz.</p>
      `
    },
    {
      id: 4,
      slug: "yeni-nesil-sinif-yonetimi-ve-pozitif-disiplin",
      title: "Yeni Nesil Sınıf Yönetimi: Öğrencileri Sürece Dahil Eden 5 Pozitif Disiplin Stratejisi",
      category: "pedagoji-rehberlik",
      categoryName: "Pedagoji & Rehberlik",
      categoryColor: "#d97706",
      date: "09 Ağustos 2026",
      readTime: "7 dk okuma",
      views: 2450,
      likes: 180,
      authorKey: "ahmet-yilmaz",
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Ceza ve ödül kısır döngüsüne girmeden; karşılıklı saygı, net sınırlar ve içsel motivasyonla huzurlu bir sınıf iklimi inşa etmenin bilimsel yolları.",
      tags: ["Sınıf Yönetimi", "Pedagoji", "Pozitif Disiplin", "Rehberlik", "Öğrenci Psikolojisi"],
      materials: [
        {
          name: "Sinif_Anlasmasi_ve_Kural_Gelistirme_Sablonu.docx",
          size: "320 KB",
          format: "DOCX",
          icon: "fa-solid fa-file-word"
        }
      ],
      content: `
        <p class="lead">Sınıf yönetimi, öğrencileri sessizce sırada oturtmak değil; öğrenmeye istekli, güven dolu ve birbirine saygılı bir topluluk inşa etme sanatıdır.</p>

        <h2>1. 'Kurallar' Değil, 'Sınıf Anlaşması'</h2>
        <p>Öğretmenin tek taraflı dikte ettiği kurallar direnç üretir. Yılın ilk haftasında öğrencilerle birlikte <em>"Bu sınıfta kendimizi nasıl güvende ve mutlu hissederiz?"</em> sorusu etrafında maddeleri belirleyip herkesin imzaladığı bir poster asmak sahiplenmeyi katbekat artırır.</p>

        <h2>2. Davranışa Odaklanın, Kişiliğe Değil</h2>
        <p><em>"Çok yaramazsın"</em> veya <em>"Dikkatsizsin"</em> gibi yaftalar yerine; <em>"Arkadaşın konuşurken sözünü kestiğinde kendisini dinlenmemiş hissediyor"</em> şeklinde net durum tespiti yapın.</p>

        <h2>3. 'Ben' Dili ve Sessiz İşaretler</h2>
        <p>Sınıfta ses yükseldiğinde öğretmenin bağırması gürültüyü ikiye katlar. Ritmik alkış, iki elin havaya kaldırılması veya küçük bir masa zili gibi önceden kararlaştırılmış görsel/işitsel çapa sinyalleri kullanın.</p>
      `
    },
    {
      id: 5,
      slug: "rubrik-dereceli-puanlama-anahtari-hazirlama-rehberi",
      title: "Rubrik (Dereceli Puanlama Anahtarı) Hazırlama Rehberi ve Örnek Şablonlar",
      category: "olcme-degerlendirme",
      categoryName: "Ölçme & Değerlendirme",
      categoryColor: "#db2777",
      date: "05 Ağustos 2026",
      readTime: "5 dk okuma",
      views: 1980,
      likes: 145,
      authorKey: "selin-yurtsever",
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Öğrenci projelerini, sunumları ve kompozisyonları objektif, şeffaf ve geribildirim odaklı değerlendirmek için analitik rubrik oluşturma adımları.",
      tags: ["Ölçme Değerlendirme", "Rubrik", "Performans Görevi", "MEB Kriterleri"],
      materials: [
        {
          name: "Analitik_ve_Holistik_Rubrik_Ornek_Sablonlari.xlsx",
          size: "620 KB",
          format: "XLSX",
          icon: "fa-solid fa-file-excel"
        },
        {
          name: "Proje_Degerlendirme_Formu_PDF.pdf",
          size: "1.2 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">Öğrencilerin bir performans görevinden neden 85 veya 70 aldığını şeffaf bir şekilde anlaması, öğrenme açığını kapatmanın en kritik adımıdır.</p>

        <h2>Holistik mi, Analitik Rubrik mi?</h2>
        <p><strong>Holistik (Bütünsel) Rubrik:</strong> Sürecin genel başarısını tek bir puan aralığında hızlıca değerlendirmek için uygundur (Örn: Hızlı resim veya kompozisyon taraması).</p>
        <p><strong>Analitik Rubrik:</strong> Görevi alt boyutlara (Araştırma, İçerik Derinliği, Sunum Becerisi, Kaynakça Kullanımı) bölerek her kritere 1-4 arası ayrı puan verir. Öğrenciye net yol gösterir.</p>

        <h2>Etkili Bir Rubrik İçin 4 Temel Adım</h2>
        <ol>
          <li>Öğrenme hedefini (kazanımı) açıkça tanımlayın.</li>
          <li>Kriterleri belirleyin (Maksimum 4-6 kriter idealdir).</li>
          <li>Başarı düzeylerini adlandırın (Geliştirilmeli, Yeterli, İyi, Mükemmel).</li>
          <li>Her düzey için gözlemlenebilir davranış tanımları yazın.</li>
        </ol>
      `
    },
    {
      id: 6,
      slug: "gorsel-uretim-araclari-ile-ders-sunumlarini-zenginlestirme",
      title: "Görsel Üretim Araçları (Midjourney & Canva Magic) ile Ders Sunumlarını Zenginleştirme",
      category: "yapay-zeka",
      categoryName: "Yapay Zekâ",
      categoryColor: "#4f46e5",
      date: "01 Ağustos 2026",
      readTime: "4 dk okuma",
      views: 2670,
      likes: 188,
      authorKey: "zeynep-kaya",
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Tarih, fen ve edebiyat derslerinde öğrencilerin hayal gücünü harekete geçirecek benzersiz ve telifsiz eğitsel illüstrasyonlar üretin.",
      tags: ["Görsel Yapay Zekâ", "Midjourney", "Canva", "Sunum Teknikleri", "Görselleştirme"],
      materials: [
        {
          name: "Egitimde_Gorsel_Prompt_Rehberi.pdf",
          size: "3.5 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">Ders kitaplarındaki klasik fotoğrafların ötesine geçerek; Fatih Sultan Mehmet'in kütüphanesini, bir bitki hücresinin iç kesitini veya Mars kolonisi simülasyonunu öğrencilerinizin gözleri önüne serebilirsiniz.</p>

        <h2>Telif Derdi Olmadan Özgün Eğitsel Görseller</h2>
        <p>Google Görseller'de saatlerce çözünürlüğü düşük ya da telif hakkı korumalı görseller aramak yerine, istediğiniz pedagojik sahneyi tam olarak tarif edip saniyeler içinde üretebilirsiniz.</p>

        <h2>Örnek Fen Bilgisi Promptu:</h2>
        <pre><code>"Educational 3D scientific illustration of a plant cell with chloroplast, mitochondria and nucleus, labeled cross-section, bright clean educational style, high resolution --ar 16:9"</code></pre>
      `
    },
    {
      id: 7,
      slug: "ogretmenler-icin-zaman-yonetimi-ve-haftalik-planlama",
      title: "Öğretmenler İçin Zaman Yönetimi: Tükenmişlikten Korunma ve Haftalık Planlama",
      category: "pedagoji-rehberlik",
      categoryName: "Pedagoji & Rehberlik",
      categoryColor: "#d97706",
      date: "28 Temmuz 2026",
      readTime: "5 dk okuma",
      views: 1830,
      likes: 162,
      authorKey: "ahmet-yilmaz",
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Evrak işleri, sınav okumaları ve ders hazırlığı arasında sıkışmadan öğretmenin kendi yaşamına ve mesleki gelişimine kaliteli vakit ayırma yöntemleri.",
      tags: ["Zaman Yönetimi", "Öğretmen Gelişimi", "Well-being", "Planlama"],
      materials: [
        {
          name: "Ogretmen_Haftalik_Planlama_ve_Zaman_Cizelgesi.pdf",
          size: "890 KB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">Öğretmenlik sadece okul zili çaldığında başlayan ve biten bir meslek değildir; ancak sınırları çizilmediğinde kronik yorgunluk ve tükenmişlik kaçınılmaz olur.</p>

        <h2>1. 'Zaman Bloklama' (Time Blocking) Tekniği</h2>
        <p>Sınav kağıtlarını gün içine parça parça yaymak yerine haftada 2 kez 45'er dakikalık kesintisiz odaklanma blokları belirleyin.</p>

        <h2>2. 2 Dakika Kuralı</h2>
        <p>Bir e-postayı yanıtlamak veya bir formu onaylamak 2 dakikadan az sürecekse, onu yapılacaklar listesine eklemeden anında tamamlayın.</p>
      `
    },
    {
      id: 8,
      slug: "lgs-ve-yks-icin-yeni-nesil-paragraf-ve-mantik-sorulari",
      title: "LGS ve YKS İçin Yeni Nesil Paragraf ve Mantık Muhakeme Soru Seti",
      category: "ders-materyalleri",
      categoryName: "Ders Materyalleri",
      categoryColor: "#0284c7",
      date: "22 Temmuz 2026",
      readTime: "4 dk okuma",
      views: 3150,
      likes: 240,
      authorKey: "murat-demir",
      isFeatured: false,
      coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200",
      excerpt: "MEB ve ÖSYM formatına %100 uyumlu; grafik, tablo ve infografik yorumlama temelli özgün soru fasikülü.",
      tags: ["LGS", "YKS", "Paragraf", "Mantık Muhakeme", "Soru Bankası"],
      materials: [
        {
          name: "Yeni_Nesil_Paragraf_ve_Mantik_Fasikulu.pdf",
          size: "5.2 MB",
          format: "PDF",
          icon: "fa-solid fa-file-pdf"
        }
      ],
      content: `
        <p class="lead">Öğrencilerin sınavda en çok vakit kaybettiği infografik ve mantık muhakeme sorularında pratik kazanmalarını sağlayacak özel çalışma fasikülü.</p>
        
        <h2>Fasikülde Neler Var?</h2>
        <ul>
          <li>Çapraz tablo yorumlama soruları.</li>
          <li>Akış şeması ve algoritma mantıklı sözel sorular.</li>
          <li>Detaylı video çözümlü QR kod bağlantıları.</li>
        </ul>
      `
    }
  ],

  faqs: [
    {
      question: "Bu sitedeki materyalleri sınıfımda ücretsiz kullanabilir miyim?",
      answer: "Evet! Sitede paylaşılan tüm ders materyalleri, çalışma yaprakları ve şablonlar eğitim amacıyla tamamen ücretsizdir. Kendi sınıfınızda çıktı alarak veya dijital olarak serbestçe kullanabilirsiniz."
    },
    {
      question: "Ben de sitede blog yazarı veya materyal üreticisi olabilir miyim?",
      answer: "Harika olur! Öğretmenler arası bilgi ve materyal paylaşımını destekliyoruz. İletişim sayfasındaki formu doldurarak branşınızı ve paylaşmak istediğiniz içerik konusunu bize iletebilirsiniz."
    },
    {
      question: "Ders planı ve yapay zekâ promptlarını MEB müfredatına göre uyarlayabilir miyim?",
      answer: "Kesinlikle. Yazılarımızdaki tüm prompt örnekleri MEB kazanım yapısına uyumlu şekilde modüler olarak hazırlanmıştır; sınıf seviyenize ve kazanım kodunuza göre kolayca özelleştirebilirsiniz."
    },
    {
      question: "Yeni eklenen yazılardan ve materyallerden nasıl haberdar olabilirim?",
      answer: "Ana sayfada veya sayfa altındaki 'Öğretmen Bülteni' alanına e-posta adresinizi bırakarak haftalık derleme bültenimize ücretsiz abone olabilirsiniz."
    }
  ],

  testimonials: [
    {
      name: "Ayşe Özkan",
      role: "Sınıf Öğretmeni, İzmir",
      comment: "Ders hazırlık süremi yarıya indiren pratik yapay zekâ promptları ve hemen sınıfta uygulayabileceğim çalışma yaprakları için harika bir kaynak!",
      avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Mehmet Can Tan",
      role: "Fen Bilimleri Öğretmeni, Ankara",
      comment: "Eğitim teknolojilerini laf kalabalığından arındırıp sınıfta doğrudan ne işe yaradığını anlatan sade ve profesyonel bir platform.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Derya Korkmaz",
      role: "Rehberlik ve Psikolojik Danışman, İstanbul",
      comment: "Pozitif sınıf yönetimi ve öğretmen iyi oluş haline yönelik yazılar tüm zümre arkadaşlarımın takdirini kazandı.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    }
  ]
};

// Global export
if (typeof window !== "undefined") {
  window.BLOG_DATA = BLOG_DATA;
}
