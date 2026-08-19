/**
 * Öğretmenler Odası - Modern Eğitim Blogu JavaScript Uygulaması
 * (State yönetimi, dinamik filtreleme, SPA yönlendirme, modal, yer imleri, tema ve bildirimler)
 */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  // Uygulama Durumu (State)
  state: {
    currentRoute: "home",
    activeCategory: "all",
    searchQuery: "",
    sortBy: "newest",
    savedPostIds: [],
    currentPostId: null,
    isLargeFont: false,
    theme: "light"
  },

  // Başlatıcı
  init() {
    this.loadSavedData();
    this.initTheme();
    this.initEventListeners();
    this.handleInitialRoute();
    this.renderAllViews();
  },

  // Yerel Depolamadan Veri Yükleme (LocalStorage)
  loadSavedData() {
    try {
      const saved = localStorage.getItem("ogretmen_saved_posts");
      this.state.savedPostIds = saved ? JSON.parse(saved) : [];
      this.updateBookmarkBadge();
    } catch (e) {
      this.state.savedPostIds = [];
    }
  },

  // Tema Yönetimi (Dark / Light Mode)
  initTheme() {
    const savedTheme = localStorage.getItem("ogretmen_theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    this.setTheme(initialTheme);
  },

  setTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ogretmen_theme", theme);

    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
      if (theme === "dark") {
        themeIcon.className = "fa-solid fa-sun";
        themeIcon.parentElement.setAttribute("title", "Aydınlık Temaya Geç");
      } else {
        themeIcon.className = "fa-regular fa-moon";
        themeIcon.parentElement.setAttribute("title", "Karanlık Temaya Geç");
      }
    }
  },

  toggleTheme() {
    const newTheme = this.state.theme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
    this.showToast(`${newTheme === "dark" ? "Karanlık" : "Aydınlık"} tema etkinleştirildi.`, "info");
  },

  // Olay Dinleyicileri (Event Listeners)
  initEventListeners() {
    // Tema Butonu
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) themeBtn.addEventListener("click", () => this.toggleTheme());

    // Mobil Menü
    const mobileBtn = document.getElementById("mobile-menu-btn");
    if (mobileBtn) mobileBtn.addEventListener("click", () => this.toggleMobileMenu());

    // Kaydedilenler Çekmecesi
    const bookmarksBtn = document.getElementById("btn-open-bookmarks");
    if (bookmarksBtn) bookmarksBtn.addEventListener("click", () => this.openBookmarksDrawer());

    // Hızlı Arama Butonu
    const quickSearchBtn = document.getElementById("btn-quick-search");
    if (quickSearchBtn) {
      quickSearchBtn.addEventListener("click", () => {
        this.navigateTo("blog");
        setTimeout(() => {
          const input = document.getElementById("blog-search-input");
          if (input) input.focus();
        }, 100);
      });
    }

    // Klavye Kısayolları (Ctrl+K Arama, Esc Kapatma)
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.navigateTo("blog");
        setTimeout(() => {
          const input = document.getElementById("blog-search-input");
          if (input) input.focus();
        }, 100);
      } else if (e.key === "Escape") {
        this.closeArticleModal();
        this.closeBookmarksDrawer();
        this.closeMobileMenu();
      }
    });

    // Hash Değişimi Dinleyicisi
    window.addEventListener("hashchange", () => {
      this.handleInitialRoute();
    });
  },

  // Yönlendirme (Routing)
  handleInitialRoute() {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("post/")) {
      const postId = parseInt(hash.replace("post/", ""), 10);
      if (postId) {
        this.openArticleDetail(postId, false);
      }
    } else if (hash.startsWith("kategori/")) {
      const catId = hash.replace("kategori/", "");
      this.filterByCategory(catId);
    } else if (["home", "blog", "categories", "about", "contact"].includes(hash)) {
      this.navigateTo(hash, false);
    } else {
      this.navigateTo("home", false);
    }
  },

  navigateTo(viewId, updateHash = true) {
    this.state.currentRoute = viewId;

    // Tüm görünümleri gizle
    const views = document.querySelectorAll(".view-section");
    views.forEach(view => {
      view.style.display = "none";
    });

    // Hedef görünümü aç
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Navigasyon linklerini güncelle
    const navLinks = document.querySelectorAll(".main-nav .nav-link");
    navLinks.forEach(link => {
      if (link.getAttribute("data-nav") === viewId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    if (updateHash) {
      window.location.hash = viewId;
    }
  },

  // Tüm Görünümleri Ekrana Basma
  renderAllViews() {
    this.renderHomeFeatured();
    this.renderHomeCategories();
    this.renderHomeRecentPosts();
    this.renderBlogCategoriesPills();
    this.renderBlogPosts();
    this.renderFullCategoriesPage();
    this.renderAboutAuthors();
    this.renderFaqs();
  },

  /* ==========================================================================
     1. ANA SAYFA RENDER FONKSİYONLARI
     ========================================================================== */
  renderHomeFeatured() {
    const container = document.getElementById("home-featured-grid");
    if (!container || !window.BLOG_DATA) return;

    const featuredPosts = BLOG_DATA.posts.filter(p => p.isFeatured);
    if (featuredPosts.length === 0) return;

    const mainPost = featuredPosts[0];
    const sidePosts = featuredPosts.slice(1, 4);

    const mainAuthor = BLOG_DATA.authors[mainPost.authorKey] || { name: "Editör", avatar: "", title: "Eğitimci" };

    let html = `
      <!-- Ana Büyük Öne Çıkan Kart -->
      <div class="featured-card-main" onclick="App.openArticleDetail(${mainPost.id})">
        <div class="featured-img-wrap">
          <img src="${mainPost.coverImage}" alt="${mainPost.title}" loading="lazy">
          <span class="featured-badge"><i class="fa-solid fa-star"></i> Haftanın Başyazısı</span>
        </div>
        <div class="featured-content">
          <div class="card-meta">
            <span class="category-tag" style="background:${mainPost.categoryColor}15; color:${mainPost.categoryColor}">
              <i class="fa-solid fa-tag"></i> ${mainPost.categoryName}
            </span>
            <span><i class="fa-regular fa-clock"></i> ${mainPost.readTime}</span>
            <span><i class="fa-regular fa-calendar"></i> ${mainPost.date}</span>
          </div>
          <h3 class="card-title">${mainPost.title}</h3>
          <p class="card-excerpt">${mainPost.excerpt}</p>
          <div class="card-footer">
            <div class="author-info">
              <img src="${mainAuthor.avatar}" alt="${mainAuthor.name}" class="author-avatar">
              <div>
                <div class="author-name">${mainAuthor.name}</div>
                <div class="author-role">${mainAuthor.title}</div>
              </div>
            </div>
            <span class="read-more-btn">Yazıyı Oku <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      </div>

      <!-- Yan Öne Çıkan Liste Kartları -->
      <div class="featured-sidebar">
    `;

    sidePosts.forEach(post => {
      const author = BLOG_DATA.authors[post.authorKey] || { name: "Editör" };
      html += `
        <div class="featured-card-mini" onclick="App.openArticleDetail(${post.id})">
          <div class="mini-thumb">
            <img src="${post.coverImage}" alt="${post.title}" loading="lazy">
          </div>
          <div class="mini-content">
            <div class="card-meta" style="margin-bottom: 4px; font-size: 0.76rem;">
              <span style="color:${post.categoryColor}; font-weight:700;">${post.categoryName}</span> • 
              <span>${post.readTime}</span>
            </div>
            <h4 class="mini-title">${post.title}</h4>
            <div style="font-size: 0.78rem; color: var(--text-muted);">
              <i class="fa-regular fa-user"></i> ${author.name}
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  },

  renderHomeCategories() {
    const container = document.getElementById("home-categories-grid");
    if (!container || !window.BLOG_DATA) return;

    let html = "";
    BLOG_DATA.categories.forEach(cat => {
      // Bu kategoride kaç yazı var sayalım
      const count = BLOG_DATA.posts.filter(p => p.category === cat.id).length;
      html += `
        <div class="category-card" onclick="App.filterByCategory('${cat.id}')">
          <div class="cat-icon-box" style="background: ${cat.bgColor}; color: ${cat.color};">
            <i class="${cat.icon}"></i>
          </div>
          <h3 class="cat-title">${cat.name}</h3>
          <p class="cat-desc">${cat.description}</p>
          <div class="cat-count">
            <span>${count} Makale & Materyal</span>
            <i class="fa-solid fa-arrow-right-long"></i>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  renderHomeRecentPosts() {
    const container = document.getElementById("home-recent-grid");
    if (!container || !window.BLOG_DATA) return;

    // En son 6 yazıyı al
    const recentPosts = [...BLOG_DATA.posts].slice(0, 6);
    let html = "";

    recentPosts.forEach(post => {
      html += this.generatePostCardHtml(post);
    });

    container.innerHTML = html;
  },

  /* ==========================================================================
     2. BLOG LİSTESİ VE FİLTRELEME RENDER
     ========================================================================== */
  renderBlogCategoriesPills() {
    const container = document.getElementById("blog-category-pills");
    if (!container || !window.BLOG_DATA) return;

    let html = `
      <button class="pill-filter-btn ${this.state.activeCategory === 'all' ? 'active' : ''}" 
              onclick="App.setCategoryFilter('all')">
        <i class="fa-solid fa-list-ul"></i> Tüm Yazılar (${BLOG_DATA.posts.length})
      </button>
    `;

    BLOG_DATA.categories.forEach(cat => {
      const count = BLOG_DATA.posts.filter(p => p.category === cat.id).length;
      const isActive = this.state.activeCategory === cat.id ? "active" : "";
      html += `
        <button class="pill-filter-btn ${isActive}" 
                onclick="App.setCategoryFilter('${cat.id}')">
          <i class="${cat.icon}"></i> ${cat.name} (${count})
        </button>
      `;
    });

    container.innerHTML = html;
  },

  renderBlogPosts() {
    const container = document.getElementById("blog-posts-grid");
    const countText = document.getElementById("results-count-text");
    const emptyState = document.getElementById("blog-empty-state");
    const clearBtn = document.getElementById("btn-clear-filters");
    if (!container || !window.BLOG_DATA) return;

    // Filtreleme
    let filtered = BLOG_DATA.posts.filter(post => {
      // Kategori kontrolü
      const matchesCat = this.state.activeCategory === "all" || post.category === this.state.activeCategory;

      // Arama terimi kontrolü
      const query = this.state.searchQuery.toLowerCase().trim();
      const author = BLOG_DATA.authors[post.authorKey] || { name: "" };
      const matchesSearch = !query || 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.categoryName.toLowerCase().includes(query) ||
        author.name.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)));

      return matchesCat && matchesSearch;
    });

    // Sıralama
    if (this.state.sortBy === "popular") {
      filtered.sort((a, b) => b.views - a.views);
    } else if (this.state.sortBy === "likes") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else {
      // newest (id veya sıra)
      filtered.sort((a, b) => b.id - a.id);
    }

    // Sonuç metni
    if (countText) {
      countText.innerHTML = `Toplam <strong>${filtered.length}</strong> eğitim içeriği bulundu.`;
    }

    // Temizle butonu görünürlüğü
    if (clearBtn) {
      clearBtn.style.display = (this.state.activeCategory !== "all" || this.state.searchQuery) ? "inline-flex" : "none";
    }

    // Boş durum kontrolü
    if (filtered.length === 0) {
      container.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";

    let html = "";
    filtered.forEach(post => {
      html += this.generatePostCardHtml(post);
    });

    container.innerHTML = html;
  },

  // Tekil Blog Kartı HTML Şablonu
  generatePostCardHtml(post) {
    const isSaved = this.state.savedPostIds.includes(post.id);
    const author = BLOG_DATA.authors[post.authorKey] || { name: "Eğitimci", title: "Öğretmen", avatar: "" };

    const tagsHtml = post.tags ? post.tags.slice(0, 3).map(tag => 
      `<span class="post-tag-chip">#${tag}</span>`
    ).join("") : "";

    return `
      <article class="post-card" onclick="App.openArticleDetail(${post.id})">
        <div class="post-thumb">
          <img src="${post.coverImage}" alt="${post.title}" loading="lazy">
          <div class="post-thumb-category">
            <span class="category-tag" style="background:${post.categoryColor}; color:#ffffff; font-weight:700;">
              ${post.categoryName}
            </span>
          </div>
          <button class="post-bookmark-btn ${isSaved ? 'saved' : ''}" 
                  onclick="event.stopPropagation(); App.toggleBookmark(${post.id})" 
                  title="${isSaved ? 'Kaydedilenlerden Çıkar' : 'Kaydet'}">
            <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
          </button>
        </div>

        <div class="post-body">
          <div class="post-meta-row">
            <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
            <span>•</span>
            <span><i class="fa-regular fa-clock"></i> ${post.readTime}</span>
          </div>

          <h3 class="post-title">${post.title}</h3>
          <p class="post-snippet">${post.excerpt}</p>

          <div class="post-tags-row">
            ${tagsHtml}
          </div>

          <div class="post-bottom">
            <div class="author-info">
              <img src="${author.avatar}" alt="${author.name}" class="author-avatar">
              <div>
                <div class="author-name">${author.name}</div>
                <div class="author-role">${author.title}</div>
              </div>
            </div>
            <span class="read-more-btn">Oku <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      </article>
    `;
  },

  /* ==========================================================================
     3. KATEGORİLER & DİĞER SAYFALAR RENDER
     ========================================================================== */
  renderFullCategoriesPage() {
    const container = document.getElementById("full-categories-grid");
    if (!container || !window.BLOG_DATA) return;

    let html = "";
    BLOG_DATA.categories.forEach(cat => {
      const postsInCat = BLOG_DATA.posts.filter(p => p.category === cat.id);
      const postTitlesHtml = postsInCat.slice(0, 3).map(p => `
        <li style="margin-bottom: 6px; font-size: 0.85rem; color: var(--text-secondary);">
          <i class="fa-solid fa-angle-right" style="color:${cat.color}; font-size: 0.75rem; margin-right: 4px;"></i> ${p.title}
        </li>
      `).join("");

      html += `
        <div class="category-card" style="padding: 28px;" onclick="App.filterByCategory('${cat.id}')">
          <div class="cat-icon-box" style="background: ${cat.bgColor}; color: ${cat.color}; width: 60px; height: 60px; font-size: 1.5rem;">
            <i class="${cat.icon}"></i>
          </div>
          <h3 class="cat-title" style="font-size: 1.25rem;">${cat.name}</h3>
          <p class="cat-desc" style="-webkit-line-clamp: 3; margin-bottom: 16px;">${cat.description}</p>
          
          <ul style="list-style:none; padding:0; margin-bottom: 20px; border-top: 1px dashed var(--border-subtle); padding-top: 12px;">
            ${postTitlesHtml}
          </ul>

          <div class="cat-count">
            <span>${postsInCat.length} Makaleyi İncele</span>
            <i class="fa-solid fa-arrow-right-long"></i>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderAboutAuthors() {
    const container = document.getElementById("about-authors-grid");
    if (!container || !window.BLOG_DATA) return;

    let html = "";
    Object.keys(BLOG_DATA.authors).forEach(key => {
      const author = BLOG_DATA.authors[key];
      const authorPostsCount = BLOG_DATA.posts.filter(p => p.authorKey === key).length;

      html += `
        <div class="author-card-full">
          <img src="${author.avatar}" alt="${author.name}" class="author-card-avatar">
          <h3 class="author-card-name">${author.name}</h3>
          <div class="author-card-title">${author.title}</div>
          <p class="author-card-bio">${author.bio}</p>
          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-subtle); font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">
            <i class="fa-regular fa-newspaper"></i> ${authorPostsCount} Yayınlanmış Yazı
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderFaqs() {
    const container = document.getElementById("faq-container");
    if (!container || !window.BLOG_DATA || !BLOG_DATA.faqs) return;

    let html = "";
    BLOG_DATA.faqs.forEach((faq, index) => {
      html += `
        <div class="faq-item ${index === 0 ? 'active' : ''}">
          <div class="faq-header" onclick="App.toggleFaq(this)">
            <span>${faq.question}</span>
            <i class="fa-solid fa-chevron-down faq-icon"></i>
          </div>
          <div class="faq-content" style="${index === 0 ? 'max-height: 200px;' : ''}">
            <p>${faq.answer}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  toggleFaq(headerElement) {
    const item = headerElement.parentElement;
    const content = item.querySelector(".faq-content");
    const isOpen = item.classList.contains("active");

    // Diğerlerini kapat
    document.querySelectorAll(".faq-item").forEach(other => {
      other.classList.remove("active");
      const otherContent = other.querySelector(".faq-content");
      if (otherContent) otherContent.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  },

  /* ==========================================================================
     4. BLOG DETAY GÖRÜNÜMÜ & OKUMA MODALI
     ========================================================================== */
  openArticleDetail(postId, updateHash = true) {
    const post = BLOG_DATA.posts.find(p => p.id === postId);
    if (!post) return;

    this.state.currentPostId = postId;
    const author = BLOG_DATA.authors[post.authorKey] || { name: "Eğitimci", title: "Öğretmen", avatar: "", bio: "" };
    const isSaved = this.state.savedPostIds.includes(post.id);

    const modal = document.getElementById("article-modal");
    const modalBody = document.getElementById("article-modal-body");
    const bookmarkBtnText = document.getElementById("modal-bookmark-text");
    const bookmarkBtnIcon = document.querySelector("#btn-modal-bookmark i");

    if (bookmarkBtnText && bookmarkBtnIcon) {
      bookmarkBtnText.textContent = isSaved ? "Kaydedildi" : "Kaydet";
      bookmarkBtnIcon.className = isSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark";
    }

    // İndirilebilir materyaller kutusu
    let materialsHtml = "";
    if (post.materials && post.materials.length > 0) {
      materialsHtml = `
        <div class="materials-section">
          <div class="materials-title">
            <i class="fa-solid fa-paperclip" style="color:var(--primary);"></i> Dersiniz İçin İndirilebilir Materyaller
          </div>
      `;
      post.materials.forEach(mat => {
        materialsHtml += `
          <div class="material-card">
            <div class="material-info">
              <i class="${mat.icon} material-icon"></i>
              <div>
                <div class="material-name">${mat.name}</div>
                <div class="material-size">${mat.format} Belgesi • ${mat.size}</div>
              </div>
            </div>
            <button class="btn-download" onclick="App.openDownloadSimulation('${mat.name}')">
              <i class="fa-solid fa-arrow-down-to-line"></i> İndir
            </button>
          </div>
        `;
      });
      materialsHtml += `</div>`;
    }

    // Etiketler
    const tagsHtml = post.tags ? post.tags.map(t => 
      `<span class="post-tag-chip" style="font-size:0.8rem; padding:4px 10px;">#${t}</span>`
    ).join(" ") : "";

    // Benzer Yazılar
    const relatedPosts = BLOG_DATA.posts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 2);
    let relatedHtml = "";
    if (relatedPosts.length > 0) {
      relatedHtml = `
        <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid var(--border-subtle);">
          <h4 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 20px;">
            <i class="fa-solid fa-book-bookmark" style="color: var(--primary); margin-right: 6px;"></i> İlgili Diğer Rehberler
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
      `;
      relatedPosts.forEach(rp => {
        relatedHtml += `
          <div class="featured-card-mini" onclick="App.openArticleDetail(${rp.id})" style="border:1px solid var(--border-subtle);">
            <div class="mini-thumb" style="width:70px; height:65px;">
              <img src="${rp.coverImage}" alt="${rp.title}">
            </div>
            <div class="mini-content">
              <h5 style="font-size:0.9rem; font-weight:700; line-height:1.3; margin-bottom:4px;">${rp.title}</h5>
              <span style="font-size:0.75rem; color:var(--text-muted);">${rp.readTime}</span>
            </div>
          </div>
        `;
      });
      relatedHtml += `</div></div>`;
    }

    modalBody.innerHTML = `
      <div class="single-article-meta">
        <span class="category-tag" style="background:${post.categoryColor}; color:#ffffff; font-weight:700;">
          ${post.categoryName}
        </span>
        <span style="color:var(--text-muted); font-size:0.88rem;"><i class="fa-regular fa-calendar"></i> ${post.date}</span>
        <span style="color:var(--text-muted); font-size:0.88rem;"><i class="fa-regular fa-clock"></i> ${post.readTime}</span>
        <span style="color:var(--text-muted); font-size:0.88rem;"><i class="fa-regular fa-eye"></i> ${post.views} Okunma</span>
      </div>

      <h1 class="single-article-title">${post.title}</h1>

      <div class="single-author-card">
        <div style="display: flex; align-items: center; gap: 14px;">
          <img src="${author.avatar}" alt="${author.name}" class="author-avatar" style="width: 48px; height: 48px;">
          <div>
            <div style="font-weight: 800; font-size: 1rem; color: var(--text-primary);">${author.name}</div>
            <div style="font-size: 0.8rem; color: var(--primary); font-weight: 600;">${author.title}</div>
          </div>
        </div>
        <button class="reading-btn" onclick="App.likeArticle(${post.id})" id="btn-like-article" style="background:var(--bg-surface);">
          <i class="fa-solid fa-heart" style="color: var(--accent-rose);"></i> <span id="like-count-display">${post.likes}</span>
        </button>
      </div>

      <div class="single-cover-wrap">
        <img src="${post.coverImage}" alt="${post.title}">
      </div>

      <div class="article-rich-content ${this.state.isLargeFont ? 'font-large' : ''}" id="article-content-wrapper">
        ${post.content}
      </div>

      ${materialsHtml}

      <div style="margin: 30px 0; display: flex; gap: 8px; flex-wrap: wrap;">
        ${tagsHtml}
      </div>

      <!-- Yazar Biyografi Kutusu -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; display: flex; gap: 20px; align-items: center; margin-top: 40px;">
        <img src="${author.avatar}" alt="${author.name}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-light);">
        <div>
          <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 4px;">Yazar Hakkında: ${author.name}</h4>
          <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5; margin: 0;">${author.bio}</p>
        </div>
      </div>

      ${relatedHtml}
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (updateHash) {
      window.location.hash = `post/${post.id}`;
    }
  },

  closeArticleModal() {
    const modal = document.getElementById("article-modal");
    if (modal && modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      this.state.currentPostId = null;

      // URL hash geri güncelle
      if (window.location.hash.startsWith("#post/")) {
        window.location.hash = this.state.currentRoute;
      }
    }
  },

  handleModalBackdropClick(event) {
    if (event.target.id === "article-modal") {
      this.closeArticleModal();
    }
  },

  toggleFontSize() {
    this.state.isLargeFont = !this.state.isLargeFont;
    const content = document.getElementById("article-content-wrapper");
    if (content) {
      content.classList.toggle("font-large", this.state.isLargeFont);
      this.showToast(this.state.isLargeFont ? "Yazı boyutu büyütüldü." : "Varsayılan yazı boyutuna dönüldü.", "info");
    }
  },

  likeArticle(postId) {
    const post = BLOG_DATA.posts.find(p => p.id === postId);
    if (!post) return;

    post.likes += 1;
    const likeDisplay = document.getElementById("like-count-display");
    if (likeDisplay) {
      likeDisplay.textContent = post.likes;
    }
    this.showToast("İçeriği beğendiğiniz için teşekkürler! ❤️", "success");
  },

  /* ==========================================================================
     5. YER İMLERİ (BOOKMARKS) YÖNETİMİ
     ========================================================================== */
  toggleBookmark(postId) {
    const index = this.state.savedPostIds.indexOf(postId);
    let isSaved = false;

    if (index === -1) {
      this.state.savedPostIds.push(postId);
      isSaved = true;
      this.showToast("Yazı kaydedilenler listenize eklendi 📌", "success");
    } else {
      this.state.savedPostIds.splice(index, 1);
      isSaved = false;
      this.showToast("Yazı kaydedilenler listenizden kaldırıldı.", "info");
    }

    localStorage.setItem("ogretmen_saved_posts", JSON.stringify(this.state.savedPostIds));
    this.updateBookmarkBadge();
    this.renderBlogPosts();
    this.renderHomeRecentPosts();
    this.renderBookmarksDrawerContent();

    // Modal içindeki buton durumunu güncelle
    if (this.state.currentPostId === postId) {
      const bookmarkBtnText = document.getElementById("modal-bookmark-text");
      const bookmarkBtnIcon = document.querySelector("#btn-modal-bookmark i");
      if (bookmarkBtnText && bookmarkBtnIcon) {
        bookmarkBtnText.textContent = isSaved ? "Kaydedildi" : "Kaydet";
        bookmarkBtnIcon.className = isSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark";
      }
    }
  },

  toggleModalBookmark() {
    if (this.state.currentPostId) {
      this.toggleBookmark(this.state.currentPostId);
    }
  },

  updateBookmarkBadge() {
    const badge = document.getElementById("bookmark-badge-count");
    if (badge) {
      const count = this.state.savedPostIds.length;
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    }
  },

  openBookmarksDrawer() {
    this.renderBookmarksDrawerContent();
    const backdrop = document.getElementById("bookmarks-backdrop");
    const drawer = document.getElementById("bookmarks-drawer");
    if (backdrop && drawer) {
      backdrop.classList.add("active");
      drawer.classList.add("active");
    }
  },

  closeBookmarksDrawer() {
    const backdrop = document.getElementById("bookmarks-backdrop");
    const drawer = document.getElementById("bookmarks-drawer");
    if (backdrop && drawer) {
      backdrop.classList.remove("active");
      drawer.classList.remove("active");
    }
  },

  renderBookmarksDrawerContent() {
    const body = document.getElementById("bookmarks-drawer-body");
    if (!body || !window.BLOG_DATA) return;

    if (this.state.savedPostIds.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <i class="fa-regular fa-bookmark" style="font-size: 2.5rem; margin-bottom: 12px; display: block;"></i>
          <h4 style="color: var(--text-primary); margin-bottom: 6px;">Henüz Kaydedilen Yazı Yok</h4>
          <p style="font-size: 0.85rem;">Beğendiğiniz veya daha sonra okumak istediğiniz ders materyallerini yer imlerine ekleyebilirsiniz.</p>
        </div>
      `;
      return;
    }

    const savedPosts = BLOG_DATA.posts.filter(p => this.state.savedPostIds.includes(p.id));
    let html = "";

    savedPosts.forEach(post => {
      html += `
        <div class="featured-card-mini" style="border: 1px solid var(--border-subtle); position: relative;" onclick="App.closeBookmarksDrawer(); App.openArticleDetail(${post.id});">
          <div class="mini-thumb" style="width: 70px; height: 65px;">
            <img src="${post.coverImage}" alt="${post.title}">
          </div>
          <div class="mini-content">
            <span style="font-size: 0.72rem; color: ${post.categoryColor}; font-weight: 700;">${post.categoryName}</span>
            <h5 style="font-size: 0.88rem; font-weight: 700; line-height: 1.3; margin: 2px 0 4px;">${post.title}</h5>
            <span style="font-size: 0.74rem; color: var(--text-muted);">${post.readTime}</span>
          </div>
          <button class="icon-btn" onclick="event.stopPropagation(); App.toggleBookmark(${post.id});" style="width: 28px; height: 28px; font-size: 0.75rem;" title="Kaldır">
            <i class="fa-solid fa-trash-can" style="color: var(--accent-rose);"></i>
          </button>
        </div>
      `;
    });

    body.innerHTML = html;
  },

  /* ==========================================================================
     6. FİLTRELEME & ARAMA İŞLEYİCİLERİ
     ========================================================================== */
  filterByCategory(categoryId) {
    this.state.activeCategory = categoryId;
    this.navigateTo("blog");
    this.renderBlogCategoriesPills();
    this.renderBlogPosts();
  },

  setCategoryFilter(categoryId) {
    this.state.activeCategory = categoryId;
    this.renderBlogCategoriesPills();
    this.renderBlogPosts();
  },

  handleFilterChange() {
    const searchInput = document.getElementById("blog-search-input");
    const sortSelect = document.getElementById("blog-sort-select");

    if (searchInput) this.state.searchQuery = searchInput.value;
    if (sortSelect) this.state.sortBy = sortSelect.value;

    this.renderBlogPosts();
  },

  resetBlogFilters() {
    this.state.activeCategory = "all";
    this.state.searchQuery = "";
    this.state.sortBy = "newest";

    const searchInput = document.getElementById("blog-search-input");
    const sortSelect = document.getElementById("blog-sort-select");

    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "newest";

    this.renderBlogCategoriesPills();
    this.renderBlogPosts();
    this.showToast("Tüm filtreler temizlendi.", "info");
  },

  handleHeroSearch() {
    const heroInput = document.getElementById("hero-search-input");
    if (!heroInput) return;

    const val = heroInput.value.trim();
    if (val) {
      this.state.searchQuery = val;
      this.navigateTo("blog");

      const blogInput = document.getElementById("blog-search-input");
      if (blogInput) blogInput.value = val;

      this.renderBlogPosts();
    }
  },

  // Mobil Menü Aç/Kapat
  toggleMobileMenu() {
    const drawer = document.getElementById("mobile-drawer");
    const backdrop = document.getElementById("mobile-drawer-backdrop");
    if (drawer && backdrop) {
      drawer.style.transform = drawer.style.transform === "translateX(0px)" ? "translateX(-100%)" : "translateX(0px)";
      backdrop.classList.toggle("active");
    }
  },

  closeMobileMenu() {
    const drawer = document.getElementById("mobile-drawer");
    const backdrop = document.getElementById("mobile-drawer-backdrop");
    if (drawer && backdrop) {
      drawer.style.transform = "translateX(-100%)";
      backdrop.classList.remove("active");
    }
  },

  /* ==========================================================================
     7. ETKİLEŞİMLER (TOAST, İNDİRME, PAYLAŞIM, FORMLAR)
     ========================================================================== */
  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = "fa-solid fa-circle-info";
    if (type === "success") icon = "fa-solid fa-circle-check";

    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  openDownloadSimulation(fileName) {
    this.showToast(`'${fileName}' indiriliyor...`, "info");
    setTimeout(() => {
      this.showToast(`'${fileName}' başarıyla indirildi! Sınıfınızda iyi dersler dileriz 🎓`, "success");
    }, 1200);
  },

  shareCurrentArticle() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "Öğretmenler için harika bir eğitim materyali!",
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showToast("Yazı bağlantısı panoya kopyalandı! 📋", "success");
      });
    }
  },

  handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("contact-name").value;
    this.showToast(`Teşekkürler ${name}! Mesajınız editör ekibimize ulaştı. En kısa sürede dönüş yapacağız. ✨`, "success");
    e.target.reset();
  },

  handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    this.showToast(`Bülten kaydınız tamamlandı (${emailInput.value}). Her Pazar görüşmek üzere! 💌`, "success");
    e.target.reset();
  }
};

// Global fonksiyon kısayolları
window.navigateTo = (view) => App.navigateTo(view);
window.filterByCategory = (catId) => App.filterByCategory(catId);
window.openArticleDetail = (postId) => App.openArticleDetail(postId);
window.closeArticleModal = () => App.closeArticleModal();
window.closeBookmarksDrawer = () => App.closeBookmarksDrawer();
window.closeMobileMenu = () => App.closeMobileMenu();
window.toggleFontSize = () => App.toggleFontSize();
window.toggleModalBookmark = () => App.toggleModalBookmark();
window.shareCurrentArticle = () => App.shareCurrentArticle();
window.openDownloadSimulation = (file) => App.openDownloadSimulation(file);
window.handleContactSubmit = (e) => App.handleContactSubmit(e);
window.handleNewsletterSubmit = (e) => App.handleNewsletterSubmit(e);
window.handleHeroSearch = () => App.handleHeroSearch();
window.handleFilterChange = () => App.handleFilterChange();
window.resetBlogFilters = () => App.resetBlogFilters();
window.handleModalBackdropClick = (e) => App.handleModalBackdropClick(e);
