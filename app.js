/**
 * Yahşihan Ölçme Değerlendirme Merkezi (Yahşihan ÖDM)
 * "Öğrencilere Destek, Öğretmenlere Yardımcı"
 * Ana Uygulama & Öğretmen Admin Paneli Motoru
 */

// ==========================================================================
// 1. VERİ YÖNETİCİSİ (DATA MANAGER - LOCALSTORAGE ENTEGRASYONU)
// ==========================================================================
const DataManager = {
  getPosts() {
    try {
      const stored = localStorage.getItem("yahsihan_posts");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("LocalStorage error:", e);
    }
    // Varsayılan verileri yükle ve kaydet
    const defaults = window.DEFAULT_BLOG_DATA ? window.DEFAULT_BLOG_DATA.posts : [];
    this.savePosts(defaults);
    return defaults;
  },

  savePosts(posts) {
    localStorage.setItem("yahsihan_posts", JSON.stringify(posts));
  },

  getCategories() {
    try {
      const stored = localStorage.getItem("yahsihan_categories");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("LocalStorage error:", e);
    }
    const defaults = window.DEFAULT_BLOG_DATA ? window.DEFAULT_BLOG_DATA.categories : [];
    this.saveCategories(defaults);
    return defaults;
  },

  saveCategories(categories) {
    localStorage.setItem("yahsihan_categories", JSON.stringify(categories));
  },

  getAuthors() {
    return window.DEFAULT_BLOG_DATA ? window.DEFAULT_BLOG_DATA.authors : {};
  },

  getSiteInfo() {
    return window.DEFAULT_BLOG_DATA ? window.DEFAULT_BLOG_DATA.siteInfo : {};
  },

  getFaqs() {
    return window.DEFAULT_BLOG_DATA ? window.DEFAULT_BLOG_DATA.faqs : [];
  },

  // Yeni Blog Yazısı Ekleme
  addPost(postData) {
    const posts = this.getPosts();
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;

    const newPost = {
      id: newId,
      slug: postData.slug || this.slugify(postData.title),
      title: postData.title,
      category: postData.category,
      categoryName: postData.categoryName || "Ders Materyali",
      categoryColor: postData.categoryColor || "#4f46e5",
      date: postData.date || this.getFormattedDate(),
      readTime: postData.readTime || "4 dk okuma",
      views: 1,
      likes: 0,
      authorKey: postData.authorKey || "ayse-ogretmen",
      customAuthor: postData.customAuthor || null,
      isFeatured: postData.isFeatured || false,
      coverImage: postData.coverImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
      excerpt: postData.excerpt,
      tags: postData.tags || ["İlkokul", "Ders Materyali"],
      materials: postData.materials || [],
      content: postData.content
    };

    posts.unshift(newPost); // Başa ekle
    this.savePosts(posts);
    return newPost;
  },

  // Blog Yazısı Güncelleme
  updatePost(id, updatedFields) {
    const posts = this.getPosts();
    const index = posts.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updatedFields };
      this.savePosts(posts);
      return posts[index];
    }
    return null;
  },

  // Blog Yazısı Silme
  deletePost(id) {
    let posts = this.getPosts();
    posts = posts.filter(p => p.id !== Number(id));
    this.savePosts(posts);
    return true;
  },

  // Kategori Ekleme
  addCategory(categoryData) {
    const categories = this.getCategories();
    const slug = categoryData.slug || this.slugify(categoryData.name);
    
    // Var mı kontrol
    if (categories.some(c => c.id === slug)) {
      return null;
    }

    const newCategory = {
      id: slug,
      name: categoryData.name,
      icon: categoryData.icon || "fa-solid fa-folder",
      color: categoryData.color || "#4f46e5",
      bgColor: `${categoryData.color || "#4f46e5"}15`,
      description: categoryData.description || "",
      gradeLevel: categoryData.gradeLevel || "İlkokul"
    };

    categories.push(newCategory);
    this.saveCategories(categories);
    return newCategory;
  },

  // Kategori Silme
  deleteCategory(catId) {
    let categories = this.getCategories();
    categories = categories.filter(c => c.id !== catId);
    this.saveCategories(categories);
    return true;
  },

  // Varsayılana Sıfırlama
  resetToDefaults() {
    if (window.DEFAULT_BLOG_DATA) {
      this.savePosts(window.DEFAULT_BLOG_DATA.posts);
      this.saveCategories(window.DEFAULT_BLOG_DATA.categories);
    }
  },

  // Yardımcı Metodlar
  slugify(text) {
    const trMap = {
      'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'I': 'i',
      'İ': 'i', 'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u'
    };
    return text.split('').map(c => trMap[c] || c).join('')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },

  getFormattedDate() {
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const now = new Date();
    return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }
};


// ==========================================================================
// 2. ANA WEB SİTESİ UYGULAMASI (USER APPLICATION)
// ==========================================================================
const App = {
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

  init() {
    this.loadSavedData();
    this.initTheme();
    this.initEventListeners();
    this.handleInitialRoute();
    this.renderAllViews();
  },

  loadSavedData() {
    try {
      const saved = localStorage.getItem("yahsihan_saved_posts");
      this.state.savedPostIds = saved ? JSON.parse(saved) : [];
      this.updateBookmarkBadge();
    } catch (e) {
      this.state.savedPostIds = [];
    }
  },

  initTheme() {
    const savedTheme = localStorage.getItem("yahsihan_theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    this.setTheme(initialTheme);
  },

  setTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("yahsihan_theme", theme);

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
    this.showToast(`${newTheme === "dark" ? "Karanlık" : "Aydınlık"} tema seçildi.`, "info");
  },

  initEventListeners() {
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) themeBtn.addEventListener("click", () => this.toggleTheme());

    const mobileBtn = document.getElementById("mobile-menu-btn");
    if (mobileBtn) mobileBtn.addEventListener("click", () => this.toggleMobileMenu());

    const bookmarksBtn = document.getElementById("btn-open-bookmarks");
    if (bookmarksBtn) bookmarksBtn.addEventListener("click", () => this.openBookmarksDrawer());

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

    // Kısayollar
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

    window.addEventListener("hashchange", () => {
      this.handleInitialRoute();
    });
  },

  handleInitialRoute() {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("post/")) {
      const postId = parseInt(hash.replace("post/", ""), 10);
      if (postId) this.openArticleDetail(postId, false);
    } else if (hash.startsWith("kategori/")) {
      const catId = hash.replace("kategori/", "");
      this.filterByCategory(catId);
    } else if (["home", "blog", "categories", "about", "contact", "admin"].includes(hash)) {
      this.navigateTo(hash, false);
    } else {
      this.navigateTo("home", false);
    }
  },

  navigateTo(viewId, updateHash = true) {
    this.state.currentRoute = viewId;

    const views = document.querySelectorAll(".view-section");
    views.forEach(view => {
      view.style.display = "none";
    });

    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const navLinks = document.querySelectorAll(".main-nav .nav-link");
    navLinks.forEach(link => {
      if (link.getAttribute("data-nav") === viewId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    if (viewId === "admin") {
      AdminApp.init();
    }

    if (updateHash) {
      window.location.hash = viewId;
    }
  },

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

  /* ANA SAYFA BÖLÜMLERİ */
  renderHomeFeatured() {
    const container = document.getElementById("home-featured-grid");
    if (!container) return;

    const posts = DataManager.getPosts();
    const authors = DataManager.getAuthors();
    const featuredPosts = posts.filter(p => p.isFeatured);
    const displayFeatured = featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 3);

    if (displayFeatured.length === 0) return;

    const mainPost = displayFeatured[0];
    const sidePosts = displayFeatured.slice(1, 4);

    const mainAuthor = mainPost.customAuthor || authors[mainPost.authorKey] || { name: "Yahşihan ÖDM", title: "Sınıf Öğretmeni", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" };

    let html = `
      <div class="featured-card-main" onclick="App.openArticleDetail(${mainPost.id})">
        <div class="featured-img-wrap">
          <img src="${mainPost.coverImage}" alt="${mainPost.title}" loading="lazy">
          <span class="featured-badge"><i class="fa-solid fa-star"></i> Haftanın İlkokul Materyali</span>
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
              <img src="${mainAuthor.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'}" alt="${mainAuthor.name}" class="author-avatar">
              <div>
                <div class="author-name">${mainAuthor.name}</div>
                <div class="author-role">${mainAuthor.title}</div>
              </div>
            </div>
            <span class="read-more-btn">Materyali İncele <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      </div>

      <div class="featured-sidebar">
    `;

    sidePosts.forEach(post => {
      const author = post.customAuthor || authors[post.authorKey] || { name: "Yahşihan ÖDM" };
      html += `
        <div class="featured-card-mini" onclick="App.openArticleDetail(${post.id})">
          <div class="mini-thumb">
            <img src="${post.coverImage}" alt="${post.title}" loading="lazy">
          </div>
          <div class="mini-content">
            <div class="card-meta" style="margin-bottom: 4px; font-size: 0.74rem;">
              <span style="color:${post.categoryColor}; font-weight:700;">${post.categoryName}</span> • 
              <span>${post.readTime}</span>
            </div>
            <h4 class="mini-title">${post.title}</h4>
            <div style="font-size: 0.76rem; color: var(--text-muted);">
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
    if (!container) return;

    const categories = DataManager.getCategories();
    const posts = DataManager.getPosts();

    let html = "";
    categories.forEach(cat => {
      const count = posts.filter(p => p.category === cat.id).length;
      html += `
        <div class="category-card" onclick="App.filterByCategory('${cat.id}')">
          <div class="cat-icon-box" style="background: ${cat.bgColor || cat.color + '15'}; color: ${cat.color};">
            <i class="${cat.icon}"></i>
          </div>
          <h3 class="cat-title">${cat.name}</h3>
          <p class="cat-desc">${cat.description}</p>
          <div class="cat-count">
            <span>${count} Ders Materyali</span>
            <i class="fa-solid fa-arrow-right-long"></i>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  renderHomeRecentPosts() {
    const container = document.getElementById("home-recent-grid");
    if (!container) return;

    const posts = DataManager.getPosts();
    const recentPosts = [...posts].slice(0, 6);
    let html = "";

    recentPosts.forEach(post => {
      html += this.generatePostCardHtml(post);
    });

    container.innerHTML = html;
  },

  /* BLOG VE KATEGORİ FİLTRELEME */
  renderBlogCategoriesPills() {
    const container = document.getElementById("blog-category-pills");
    if (!container) return;

    const categories = DataManager.getCategories();
    const posts = DataManager.getPosts();

    let html = `
      <button class="pill-filter-btn ${this.state.activeCategory === 'all' ? 'active' : ''}" 
              onclick="App.setCategoryFilter('all')">
        <i class="fa-solid fa-list-ul"></i> Tüm Sınıflar (${posts.length})
      </button>
    `;

    categories.forEach(cat => {
      const count = posts.filter(p => p.category === cat.id).length;
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
    if (!container) return;

    const posts = DataManager.getPosts();
    const authors = DataManager.getAuthors();
    const categories = DataManager.getCategories();

    // Kesin Kategori Filtreleme
    let filtered = posts.filter(post => {
      const matchesCat = this.state.activeCategory === "all" || post.category === this.state.activeCategory;

      const query = this.state.searchQuery.toLowerCase().trim();
      const author = post.customAuthor || authors[post.authorKey] || { name: "" };
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
      filtered.sort((a, b) => b.id - a.id);
    }

    // Sonuç Metni
    const selectedCategoryObj = categories.find(c => c.id === this.state.activeCategory);
    const categoryLabel = selectedCategoryObj ? `[${selectedCategoryObj.name}] kategorisinde ` : "";

    if (countText) {
      countText.innerHTML = `${categoryLabel}Toplam <strong>${filtered.length}</strong> ilkokul ders materyali listeleniyor.`;
    }

    if (clearBtn) {
      clearBtn.style.display = (this.state.activeCategory !== "all" || this.state.searchQuery) ? "inline-flex" : "none";
    }

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

  generatePostCardHtml(post) {
    const isSaved = this.state.savedPostIds.includes(post.id);
    const authors = DataManager.getAuthors();
    const author = post.customAuthor || authors[post.authorKey] || { name: "Yahşihan ÖDM", title: "Sınıf Öğretmeni", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" };

    const tagsHtml = post.tags ? post.tags.slice(0, 3).map(tag => 
      `<span class="post-tag-chip">#${tag}</span>`
    ).join("") : "";

    return `
      <article class="post-card" onclick="App.openArticleDetail(${post.id})">
        <div class="post-thumb">
          <img src="${post.coverImage}" alt="${post.title}" loading="lazy">
          <div class="post-thumb-category">
            <span class="category-tag" style="background:${post.categoryColor || '#4f46e5'}; color:#ffffff; font-weight:700;">
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
              <img src="${author.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'}" alt="${author.name}" class="author-avatar">
              <div>
                <div class="author-name">${author.name}</div>
                <div class="author-role">${author.title}</div>
              </div>
            </div>
            <span class="read-more-btn">Materyali Aç <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      </article>
    `;
  },

  renderFullCategoriesPage() {
    const container = document.getElementById("full-categories-grid");
    if (!container) return;

    const categories = DataManager.getCategories();
    const posts = DataManager.getPosts();

    let html = "";
    categories.forEach(cat => {
      const postsInCat = posts.filter(p => p.category === cat.id);
      const postTitlesHtml = postsInCat.slice(0, 3).map(p => `
        <li style="margin-bottom: 6px; font-size: 0.84rem; color: var(--text-secondary);">
          <i class="fa-solid fa-angle-right" style="color:${cat.color}; font-size: 0.75rem; margin-right: 4px;"></i> ${p.title}
        </li>
      `).join("");

      html += `
        <div class="category-card" style="padding: 26px;" onclick="App.filterByCategory('${cat.id}')">
          <div class="cat-icon-box" style="background: ${cat.bgColor || cat.color + '15'}; color: ${cat.color}; width: 56px; height: 56px; font-size: 1.4rem;">
            <i class="${cat.icon}"></i>
          </div>
          <h3 class="cat-title" style="font-size: 1.2rem;">${cat.name}</h3>
          <p class="cat-desc" style="-webkit-line-clamp: 3; margin-bottom: 14px;">${cat.description}</p>
          
          <ul style="list-style:none; padding:0; margin-bottom: 18px; border-top: 1px dashed var(--border-subtle); padding-top: 10px;">
            ${postTitlesHtml || '<li style="font-size:0.8rem; color:var(--text-muted);">Bu kategoride yeni materyaller hazırlanıyor.</li>'}
          </ul>

          <div class="cat-count">
            <span>${postsInCat.length} Materyali Görüntüle</span>
            <i class="fa-solid fa-arrow-right-long"></i>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderAboutAuthors() {
    const container = document.getElementById("about-authors-grid");
    if (!container) return;

    const authors = DataManager.getAuthors();
    const posts = DataManager.getPosts();

    let html = "";
    Object.keys(authors).forEach(key => {
      const author = authors[key];
      const authorPostsCount = posts.filter(p => p.authorKey === key).length;

      html += `
        <div class="author-card-full">
          <img src="${author.avatar}" alt="${author.name}" class="author-card-avatar">
          <h3 class="author-card-name">${author.name}</h3>
          <div class="author-card-title">${author.title}</div>
          <p class="author-card-bio">${author.bio}</p>
          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-subtle); font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">
            <i class="fa-regular fa-newspaper"></i> ${authorPostsCount} Paylaşılan Materyal
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  renderFaqs() {
    const container = document.getElementById("faq-container");
    if (!container) return;

    const faqs = DataManager.getFaqs();
    let html = "";
    faqs.forEach((faq, index) => {
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

  /* OKUMA MODALI / TEKİL YAZI GÖRÜNÜMÜ */
  openArticleDetail(postId, updateHash = true) {
    const posts = DataManager.getPosts();
    const authors = DataManager.getAuthors();
    const post = posts.find(p => p.id === Number(postId));
    if (!post) return;

    // Okunma sayısını 1 artır
    post.views = (post.views || 0) + 1;
    DataManager.updatePost(post.id, { views: post.views });

    this.state.currentPostId = post.id;
    const author = post.customAuthor || authors[post.authorKey] || { name: "Yahşihan ÖDM", title: "Sınıf Öğretmeni", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300", bio: "Yahşihan Ölçme Değerlendirme Merkezi ilkokul zümre komisyonu." };
    const isSaved = this.state.savedPostIds.includes(post.id);

    const modal = document.getElementById("article-modal");
    const modalBody = document.getElementById("article-modal-body");
    const bookmarkBtnText = document.getElementById("modal-bookmark-text");
    const bookmarkBtnIcon = document.querySelector("#btn-modal-bookmark i");

    if (bookmarkBtnText && bookmarkBtnIcon) {
      bookmarkBtnText.textContent = isSaved ? "Kaydedildi" : "Kaydet";
      bookmarkBtnIcon.className = isSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark";
    }

    let materialsHtml = "";
    if (post.materials && post.materials.length > 0) {
      materialsHtml = `
        <div class="materials-section">
          <div class="materials-title">
            <i class="fa-solid fa-paperclip" style="color:var(--primary);"></i> Yazdırılabilir Ders Materyalleri & Ekler
          </div>
      `;
      post.materials.forEach(mat => {
        materialsHtml += `
          <div class="material-card">
            <div class="material-info">
              <i class="${mat.icon || 'fa-solid fa-file-pdf'} material-icon"></i>
              <div>
                <div class="material-name">${mat.name}</div>
                <div class="material-size">${mat.format || 'PDF'} Belgesi • ${mat.size || '1.8 MB'}</div>
              </div>
            </div>
            <button class="btn-download" onclick="App.openDownloadSimulation('${mat.name}')">
              <i class="fa-solid fa-arrow-down-to-line"></i> Ücretsiz İndir
            </button>
          </div>
        `;
      });
      materialsHtml += `</div>`;
    }

    const tagsHtml = post.tags ? post.tags.map(t => 
      `<span class="post-tag-chip" style="font-size:0.8rem; padding:4px 10px;">#${t}</span>`
    ).join(" ") : "";

    const relatedPosts = posts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 2);
    let relatedHtml = "";
    if (relatedPosts.length > 0) {
      relatedHtml = `
        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border-subtle);">
          <h4 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 16px;">
            <i class="fa-solid fa-book-bookmark" style="color: var(--primary); margin-right: 6px;"></i> İlgili Diğer İlkokul Materyalleri
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
      `;
      relatedPosts.forEach(rp => {
        relatedHtml += `
          <div class="featured-card-mini" onclick="App.openArticleDetail(${rp.id})" style="border:1px solid var(--border-subtle);">
            <div class="mini-thumb" style="width:65px; height:60px;">
              <img src="${rp.coverImage}" alt="${rp.title}">
            </div>
            <div class="mini-content">
              <h5 style="font-size:0.88rem; font-weight:700; line-height:1.3; margin-bottom:3px;">${rp.title}</h5>
              <span style="font-size:0.74rem; color:var(--text-muted);">${rp.readTime}</span>
            </div>
          </div>
        `;
      });
      relatedHtml += `</div></div>`;
    }

    modalBody.innerHTML = `
      <div class="single-article-meta">
        <span class="category-tag" style="background:${post.categoryColor || '#4f46e5'}; color:#ffffff; font-weight:700;">
          ${post.categoryName}
        </span>
        <span style="color:var(--text-muted); font-size:0.85rem;"><i class="fa-regular fa-calendar"></i> ${post.date}</span>
        <span style="color:var(--text-muted); font-size:0.85rem;"><i class="fa-regular fa-clock"></i> ${post.readTime}</span>
        <span style="color:var(--text-muted); font-size:0.85rem;"><i class="fa-regular fa-eye"></i> ${post.views} Görüntüleme</span>
      </div>

      <h1 class="single-article-title">${post.title}</h1>

      <div class="single-author-card">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${author.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'}" alt="${author.name}" class="author-avatar" style="width: 44px; height: 44px;">
          <div>
            <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-primary);">${author.name}</div>
            <div style="font-size: 0.78rem; color: var(--primary); font-weight: 600;">${author.title}</div>
          </div>
        </div>
        <button class="reading-btn" onclick="App.likeArticle(${post.id})" id="btn-like-article" style="background:var(--bg-surface);">
          <i class="fa-solid fa-heart" style="color: var(--accent-rose);"></i> <span id="like-count-display">${post.likes || 0}</span>
        </button>
      </div>

      <div class="single-cover-wrap">
        <img src="${post.coverImage}" alt="${post.title}">
      </div>

      <div class="article-rich-content ${this.state.isLargeFont ? 'font-large' : ''}" id="article-content-wrapper">
        ${post.content}
      </div>

      ${materialsHtml}

      <div style="margin: 24px 0; display: flex; gap: 6px; flex-wrap: wrap;">
        ${tagsHtml}
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 20px; display: flex; gap: 16px; align-items: center; margin-top: 30px;">
        <img src="${author.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'}" alt="${author.name}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
        <div>
          <h4 style="font-size: 0.98rem; font-weight: 800; margin-bottom: 3px;">Yazar & Zümre: ${author.name}</h4>
          <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin: 0;">${author.bio}</p>
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
    const posts = DataManager.getPosts();
    const post = posts.find(p => p.id === Number(postId));
    if (!post) return;

    post.likes = (post.likes || 0) + 1;
    DataManager.updatePost(post.id, { likes: post.likes });

    const likeDisplay = document.getElementById("like-count-display");
    if (likeDisplay) likeDisplay.textContent = post.likes;

    this.showToast("Materyali beğendiğiniz için teşekkürler! ❤️", "success");
  },

  /* YER İMLERİ */
  toggleBookmark(postId) {
    const index = this.state.savedPostIds.indexOf(postId);
    let isSaved = false;

    if (index === -1) {
      this.state.savedPostIds.push(postId);
      isSaved = true;
      this.showToast("Ders materyali kaydedilenlerinize eklendi 📌", "success");
    } else {
      this.state.savedPostIds.splice(index, 1);
      isSaved = false;
      this.showToast("Materyal kaydedilenlerden kaldırıldı.", "info");
    }

    localStorage.setItem("yahsihan_saved_posts", JSON.stringify(this.state.savedPostIds));
    this.updateBookmarkBadge();
    this.renderBlogPosts();
    this.renderHomeRecentPosts();
    this.renderBookmarksDrawerContent();

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
    if (!body) return;

    const posts = DataManager.getPosts();
    const savedPosts = posts.filter(p => this.state.savedPostIds.includes(p.id));

    if (savedPosts.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <i class="fa-regular fa-bookmark" style="font-size: 2.5rem; margin-bottom: 12px; display: block;"></i>
          <h4 style="color: var(--text-primary); margin-bottom: 6px;">Kaydedilen Materyal Yok</h4>
          <p style="font-size: 0.85rem;">Derslerinizde kullanmak istediğiniz etkinlikleri yer imlerine ekleyip buradan hızlıca ulaşabilirsiniz.</p>
        </div>
      `;
      return;
    }

    let html = "";
    savedPosts.forEach(post => {
      html += `
        <div class="featured-card-mini" style="border: 1px solid var(--border-subtle); position: relative;" onclick="App.closeBookmarksDrawer(); App.openArticleDetail(${post.id});">
          <div class="mini-thumb" style="width: 65px; height: 60px;">
            <img src="${post.coverImage}" alt="${post.title}">
          </div>
          <div class="mini-content">
            <span style="font-size: 0.72rem; color: ${post.categoryColor}; font-weight: 700;">${post.categoryName}</span>
            <h5 style="font-size: 0.86rem; font-weight: 700; line-height: 1.3; margin: 2px 0;">${post.title}</h5>
            <span style="font-size: 0.72rem; color: var(--text-muted);">${post.readTime}</span>
          </div>
          <button class="icon-btn" onclick="event.stopPropagation(); App.toggleBookmark(${post.id});" style="width: 26px; height: 26px; font-size: 0.72rem;" title="Kaldır">
            <i class="fa-solid fa-trash-can" style="color: var(--accent-rose);"></i>
          </button>
        </div>
      `;
    });

    body.innerHTML = html;
  },

  /* FİLTRELEME & ARAMA */
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
    this.showToast("Tüm filtreler sıfırlandı.", "info");
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
      this.showToast(`'${fileName}' başarıyla indirildi! Sınıfınızda iyi dersler dileriz 🏫`, "success");
    }, 1200);
  },

  shareCurrentArticle() {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "Yahşihan ÖDM İlkokul Ders Materyali",
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.showToast("Materyal bağlantısı panoya kopyalandı! 📋", "success");
      });
    }
  },

  handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("contact-name").value;
    this.showToast(`Teşekkürler Sayın ${name}! Mesajınız Yahşihan ÖDM komisyonuna iletildi. ✨`, "success");
    e.target.reset();
  },

  handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    this.showToast(`Bülten kaydınız tamamlandı (${emailInput.value}). Haftalık ilkokul materyalleri e-postanıza gönderilecek. 💌`, "success");
    e.target.reset();
  }
};


// ==========================================================================
// 3. ÖĞRETMEN ADMİN PANELİ UYGULAMASI (ADMIN APPLICATION)
// ==========================================================================
const AdminApp = {
  currentTab: "dashboard",
  editingPostId: null,

  init() {
    this.populateCategorySelects();
    this.renderDashboard();
    this.renderPostsTable();
    this.renderCategoriesTable();
  },

  switchTab(tabName) {
    this.currentTab = tabName;

    // Butonları güncelle
    const tabBtns = document.querySelectorAll(".admin-tab-btn");
    tabBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });

    // Sekmeleri gizle/göster (hem standalone hem spa desteği)
    ["dashboard", "posts", "categories"].forEach(t => {
      const el1 = document.getElementById(`admin-tab-${t}`);
      const el2 = document.getElementById(`spa-admin-tab-${t}`);
      if (el1) el1.style.display = t === tabName ? "block" : "none";
      if (el2) el2.style.display = t === tabName ? "block" : "none";
    });

    if (tabName === "dashboard") this.renderDashboard();
    if (tabName === "posts") this.renderPostsTable();
    if (tabName === "categories") this.renderCategoriesTable();
  },

  populateCategorySelects() {
    const categories = DataManager.getCategories();
    const select1 = document.getElementById("form-post-category");
    const select2 = document.getElementById("spa-form-post-category");

    let optionsHtml = categories.map(cat => 
      `<option value="${cat.id}">${cat.name} (${cat.gradeLevel || 'İlkokul'})</option>`
    ).join("");

    if (select1) select1.innerHTML = optionsHtml;
    if (select2) select2.innerHTML = optionsHtml;
  },

  renderDashboard() {
    const posts = DataManager.getPosts();
    const categories = DataManager.getCategories();

    let totalMaterials = 0;
    let totalViews = 0;
    posts.forEach(p => {
      if (p.materials) totalMaterials += p.materials.length;
      totalViews += (p.views || 0);
    });

    // Sayaçları güncelle
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setVal("dash-total-posts", posts.length);
    setVal("spa-dash-total-posts", posts.length);
    setVal("dash-total-categories", categories.length);
    setVal("spa-dash-total-categories", categories.length);
    setVal("dash-total-materials", totalMaterials);
    setVal("spa-dash-total-materials", totalMaterials);
    setVal("dash-total-views", totalViews);

    // Son 5 yazıyı doldur
    const recent5 = [...posts].slice(0, 5);
    const tbody1 = document.getElementById("dash-recent-posts-tbody");
    const tbody2 = document.getElementById("spa-dash-recent-posts-tbody");

    let rowsHtml = recent5.map(post => `
      <tr>
        <td><img src="${post.coverImage}" alt="" style="width:44px; height:40px; border-radius:6px; object-fit:cover;"></td>
        <td><strong>${post.title}</strong></td>
        <td><span class="category-tag" style="background:${post.categoryColor || '#4f46e5'}15; color:${post.categoryColor || '#4f46e5'}">${post.categoryName}</span></td>
        <td>${(post.customAuthor && post.customAuthor.name) || 'Sınıf Öğretmeni'}</td>
        <td>${post.date}</td>
        <td><i class="fa-regular fa-eye"></i> ${post.views || 0}</td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="admin-action-btn btn-edit" onclick="AdminApp.editPost(${post.id})"><i class="fa-solid fa-pen"></i></button>
            <button class="admin-action-btn btn-delete" onclick="AdminApp.deletePost(${post.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join("");

    if (tbody1) tbody1.innerHTML = rowsHtml;
    if (tbody2) tbody2.innerHTML = rowsHtml;
  },

  renderPostsTable() {
    const posts = DataManager.getPosts();
    const filterInput = document.getElementById("admin-posts-filter");
    const query = filterInput ? filterInput.value.toLowerCase().trim() : "";

    const filtered = posts.filter(p => !query || p.title.toLowerCase().includes(query) || p.categoryName.toLowerCase().includes(query));

    const tbody1 = document.getElementById("admin-posts-tbody");
    const tbody2 = document.getElementById("spa-admin-posts-tbody");

    if (filtered.length === 0) {
      const emptyRow = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">Hiç blog yazısı bulunamadı.</td></tr>`;
      if (tbody1) tbody1.innerHTML = emptyRow;
      if (tbody2) tbody2.innerHTML = emptyRow;
      return;
    }

    let rowsHtml = filtered.map(post => `
      <tr>
        <td>#${post.id}</td>
        <td><img src="${post.coverImage}" alt="" style="width:48px; height:42px; border-radius:6px; object-fit:cover;"></td>
        <td style="max-width: 280px;"><strong>${post.title}</strong></td>
        <td><span class="category-tag" style="background:${post.categoryColor || '#4f46e5'}15; color:${post.categoryColor || '#4f46e5'}">${post.categoryName}</span></td>
        <td>${(post.customAuthor && post.customAuthor.name) || 'Sınıf Öğretmeni'}</td>
        <td>${post.date}</td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="admin-action-btn btn-edit" onclick="AdminApp.editPost(${post.id})" title="Düzenle">
              <i class="fa-solid fa-pen"></i> Düzenle
            </button>
            <button class="admin-action-btn btn-delete" onclick="AdminApp.deletePost(${post.id})" title="Sil">
              <i class="fa-solid fa-trash"></i> Sil
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    if (tbody1) tbody1.innerHTML = rowsHtml;
    if (tbody2) tbody2.innerHTML = rowsHtml;
  },

  renderCategoriesTable() {
    const categories = DataManager.getCategories();
    const posts = DataManager.getPosts();

    const tbody1 = document.getElementById("admin-categories-tbody");
    const tbody2 = document.getElementById("spa-admin-categories-tbody");

    let rowsHtml = categories.map(cat => {
      const count = posts.filter(p => p.category === cat.id).length;
      return `
        <tr>
          <td><div class="cat-icon-box" style="width:36px; height:36px; font-size:1rem; background:${cat.color}15; color:${cat.color};"><i class="${cat.icon}"></i></div></td>
          <td><strong>${cat.name}</strong></td>
          <td><code>${cat.id}</code></td>
          <td><span style="font-weight:700; color:var(--primary);">${count} Yazı</span></td>
          <td>
            <button class="admin-action-btn btn-delete" onclick="AdminApp.deleteCategory('${cat.id}')" title="Sil">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    }).join("");

    if (tbody1) tbody1.innerHTML = rowsHtml;
    if (tbody2) tbody2.innerHTML = rowsHtml;
  },

  showNewPostForm() {
    this.resetPostForm();
    const container1 = document.getElementById("post-form-container");
    const container2 = document.getElementById("spa-post-form-container");
    if (container1) container1.scrollIntoView({ behavior: "smooth" });
    if (container2) container2.scrollIntoView({ behavior: "smooth" });
  },

  handleSavePost(e, isSpa = false) {
    e.preventDefault();
    const prefix = isSpa ? "spa-" : "";

    const postId = document.getElementById(`${prefix}form-post-id`).value;
    const title = document.getElementById(`${prefix}form-post-title`).value.trim();
    const category = document.getElementById(`${prefix}form-post-category`).value;
    const readTime = document.getElementById(`${prefix}form-post-readtime`).value.trim() || "4 dk okuma";
    const authorName = document.getElementById(`${prefix}form-post-author-name`).value.trim();
    const authorTitle = document.getElementById(`${prefix}form-post-author-title`).value.trim() || "Sınıf Öğretmeni";
    const image = document.getElementById(`${prefix}form-post-image`).value.trim();
    const excerpt = document.getElementById(`${prefix}form-post-excerpt`).value.trim();
    const content = document.getElementById(`${prefix}form-post-content`).value.trim();
    const tagsInput = document.getElementById(`${prefix}form-post-tags`).value.trim();
    const materialName = document.getElementById(`${prefix}form-post-material-name`).value.trim();

    const categories = DataManager.getCategories();
    const selectedCat = categories.find(c => c.id === category) || { name: "Ders Materyali", color: "#4f46e5" };

    const tags = tagsInput ? tagsInput.split(",").map(t => t.trim()).filter(Boolean) : ["İlkokul", "Materyal"];

    let materials = [];
    if (materialName) {
      materials.push({
        name: materialName,
        size: "2.5 MB",
        format: materialName.endsWith(".xlsx") ? "XLSX" : "PDF",
        icon: materialName.endsWith(".xlsx") ? "fa-solid fa-file-excel" : "fa-solid fa-file-pdf"
      });
    }

    const postPayload = {
      title,
      category,
      categoryName: selectedCat.name,
      categoryColor: selectedCat.color,
      readTime,
      customAuthor: {
        name: authorName,
        title: authorTitle,
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
        bio: `${authorName}, ${authorTitle} olarak ilkokul ders içerikleri hazırlamaktadır.`
      },
      coverImage: image,
      excerpt,
      content,
      tags,
      materials
    };

    if (postId) {
      // Düzenleme
      DataManager.updatePost(postId, postPayload);
      App.showToast("Blog yazısı başarıyla güncellendi! ✅", "success");
    } else {
      // Yeni Ekleme
      DataManager.addPost(postPayload);
      App.showToast("Yeni ilkokul blog yazısı yayınlandı! 🎉", "success");
    }

    this.resetPostForm();
    this.renderDashboard();
    this.renderPostsTable();
    App.renderAllViews();
  },

  editPost(id) {
    const posts = DataManager.getPosts();
    const post = posts.find(p => p.id === Number(id));
    if (!post) return;

    this.editingPostId = post.id;
    this.switchTab("posts");

    const populateForm = (prefix = "") => {
      const idEl = document.getElementById(`${prefix}form-post-id`);
      const titleEl = document.getElementById(`${prefix}form-post-title`);
      const catEl = document.getElementById(`${prefix}form-post-category`);
      const readEl = document.getElementById(`${prefix}form-post-readtime`);
      const authorNameEl = document.getElementById(`${prefix}form-post-author-name`);
      const authorTitleEl = document.getElementById(`${prefix}form-post-author-title`);
      const imageEl = document.getElementById(`${prefix}form-post-image`);
      const excerptEl = document.getElementById(`${prefix}form-post-excerpt`);
      const contentEl = document.getElementById(`${prefix}form-post-content`);
      const tagsEl = document.getElementById(`${prefix}form-post-tags`);
      const matEl = document.getElementById(`${prefix}form-post-material-name`);
      const formTitle = document.getElementById(`${prefix}post-form-title`);
      const cancelBtn = document.getElementById(`${prefix}btn-cancel-edit`);
      const saveBtn = document.getElementById(`${prefix}btn-save-post`);

      if (idEl) idEl.value = post.id;
      if (titleEl) titleEl.value = post.title;
      if (catEl) catEl.value = post.category;
      if (readEl) readEl.value = post.readTime;
      if (authorNameEl) authorNameEl.value = (post.customAuthor && post.customAuthor.name) || "Ayşe Çelik";
      if (authorTitleEl) authorTitleEl.value = (post.customAuthor && post.customAuthor.title) || "Sınıf Öğretmeni";
      if (imageEl) imageEl.value = post.coverImage;
      if (excerptEl) excerptEl.value = post.excerpt;
      if (contentEl) contentEl.value = post.content;
      if (tagsEl) tagsEl.value = post.tags ? post.tags.join(", ") : "";
      if (matEl) matEl.value = post.materials && post.materials[0] ? post.materials[0].name : "";

      if (formTitle) formTitle.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color:var(--secondary);"></i> Blog Yazısını Düzenle (#${post.id})`;
      if (cancelBtn) cancelBtn.style.display = "inline-flex";
      if (saveBtn) saveBtn.innerHTML = `<i class="fa-solid fa-check"></i> Değişiklikleri Kaydet`;
    };

    populateForm("");
    populateForm("spa-");

    const formCont = document.getElementById("post-form-container") || document.getElementById("spa-post-form-container");
    if (formCont) formCont.scrollIntoView({ behavior: "smooth" });
  },

  cancelEditPost() {
    this.resetPostForm();
    App.showToast("Düzenleme iptal edildi.", "info");
  },

  resetPostForm() {
    this.editingPostId = null;

    const resetOne = (prefix = "") => {
      const form = document.getElementById(`${prefix}blog-post-form`);
      if (form) form.reset();
      const idEl = document.getElementById(`${prefix}form-post-id`);
      if (idEl) idEl.value = "";
      const formTitle = document.getElementById(`${prefix}post-form-title`);
      if (formTitle) formTitle.innerHTML = `<i class="fa-solid fa-feather-pointed" style="color:var(--primary); margin-right:6px;"></i> Yeni Blog Yazısı & Materyal Ekle`;
      const cancelBtn = document.getElementById(`${prefix}btn-cancel-edit`);
      if (cancelBtn) cancelBtn.style.display = "none";
      const saveBtn = document.getElementById(`${prefix}btn-save-post`);
      if (saveBtn) saveBtn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Blog Yazısını Yayınla`;
    };

    resetOne("");
    resetOne("spa-");
  },

  deletePost(id) {
    if (confirm("Bu ilkokul blog yazısını silmek istediğinize emin misiniz?")) {
      DataManager.deletePost(id);
      App.showToast("Blog yazısı başarıyla silindi.", "info");
      this.renderDashboard();
      this.renderPostsTable();
      App.renderAllViews();
    }
  },

  handleSaveCategory(e, isSpa = false) {
    e.preventDefault();
    const prefix = isSpa ? "spa-" : "";

    const name = document.getElementById(`${prefix}form-cat-name`).value.trim();
    const slug = document.getElementById(`${prefix}form-cat-slug`).value.trim();
    const icon = document.getElementById(`${prefix}form-cat-icon`).value.trim() || "fa-solid fa-folder";
    const color = document.getElementById(`${prefix}form-cat-color`).value || "#4f46e5";
    const description = document.getElementById(`${prefix}form-cat-desc`).value.trim();

    const created = DataManager.addCategory({ name, slug, icon, color, description });
    if (!created) {
      alert("Bu kodla (slug) zaten bir kategori bulunuyor!");
      return;
    }

    App.showToast(`'${name}' kategorisi eklendi! ✨`, "success");
    e.target.reset();

    this.populateCategorySelects();
    this.renderDashboard();
    this.renderCategoriesTable();
    App.renderAllViews();
  },

  deleteCategory(catId) {
    const posts = DataManager.getPosts();
    const count = posts.filter(p => p.category === catId).length;

    if (count > 0) {
      alert(`Bu kategoriye ait ${count} adet blog yazısı bulunmaktadır. Önce o yazıları başka bir kategoriye taşıyın veya silin.`);
      return;
    }

    if (confirm(`'${catId}' kategorisini silmek istediğinize emin misiniz?`)) {
      DataManager.deleteCategory(catId);
      App.showToast("Kategori silindi.", "info");
      this.populateCategorySelects();
      this.renderDashboard();
      this.renderCategoriesTable();
      App.renderAllViews();
    }
  },

  setPresetImage(preset, isSpa = false) {
    const prefix = isSpa ? "spa-" : "";
    const images = {
      okuma: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
      matematik: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=1200",
      fen: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
      olcme: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
      teknoloji: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
    };

    const input = document.getElementById(`${prefix}form-post-image`);
    if (input && images[preset]) {
      input.value = images[preset];
      App.showToast("Örnek görsel seçildi 🖼️", "info");
    }
  },

  pickPresetImage() {
    this.setPresetImage('okuma');
  },

  insertContentSnippet(type, isSpa = false) {
    const prefix = isSpa ? "spa-" : "";
    const textarea = document.getElementById(`${prefix}form-post-content`);
    if (!textarea) return;

    let snippet = "";
    if (type === "h2") {
      snippet = "\n<h2>Örnek Alt Başlık</h2>\n<p>Açıklama metnini buraya yazabilirsiniz.</p>\n";
    } else if (type === "callout") {
      snippet = `\n<div class="callout callout-tip">\n  <div class="callout-icon"><i class="fa-solid fa-lightbulb"></i></div>\n  <div class="callout-body">\n    <h4>Öğretmen İpucu:</h4>\n    <p>Sınıfta dikkat edilmesi gereken pratik öneri.</p>\n  </div>\n</div>\n`;
    } else if (type === "list") {
      snippet = "\n<ul>\n  <li><strong>Madde 1:</strong> Açıklama</li>\n  <li><strong>Madde 2:</strong> Açıklama</li>\n</ul>\n";
    } else if (type === "code") {
      snippet = "\n<pre><code>[YAPAY ZEKÂ PROMPTU]:\nİlkokul öğrencileri için çalışma sayfası hazırla...</code></pre>\n";
    }

    textarea.value += snippet;
    textarea.focus();
    App.showToast("İçerik şablonu eklendi.", "info");
  },

  resetToDefaults() {
    if (confirm("Tüm blog yazılarını ve kategorileri orijinal Yahşihan ÖDM ilkokul örnek içeriklerine sıfırlamak istediğinize emin misiniz?")) {
      DataManager.resetToDefaults();
      this.populateCategorySelects();
      this.renderDashboard();
      this.renderPostsTable();
      this.renderCategoriesTable();
      App.renderAllViews();
      App.showToast("Varsayılan ilkokul içerikleri geri yüklendi! 🔄", "success");
    }
  }
};


// Global fonksiyon kısayolları
window.App = App;
window.AdminApp = AdminApp;
window.DataManager = DataManager;

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

// DOM Yüklendiğinde başlat
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
