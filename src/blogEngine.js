import { BLOG_CATEGORIES, BLOG_ARTICLES, getPublishedArticles } from './blogData.js';
import { initMobileNav } from './navController.js';

export class BlogEngine {
  constructor() {
    this.articles = getPublishedArticles();
    this.activeCategory = 'All';
    this.searchQuery = '';
    this.init();
  }

  init() {
    this.bindSearch();
    this.bindCategoryFilters();
    this.bindMobileMenu();
    this.bindScrollProgress();
    this.readUrlParams();
    this.renderArticles();
  }

  bindMobileMenu() {
    initMobileNav();
  }

  bindScrollProgress() {
    const bar = document.getElementById('scroll-progress-line');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
      bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    }, { passive: true });
  }

  readUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const q = params.get('q');

    if (cat && BLOG_CATEGORIES.includes(cat)) {
      this.activeCategory = cat;
      this.updateActiveFilterPill(cat);
    }

    if (q) {
      this.searchQuery = q.trim();
      const input = document.getElementById('blog-search-input');
      if (input) input.value = this.searchQuery;
    }
  }

  bindSearch() {
    const searchInput = document.getElementById('blog-search-input');
    const clearBtn = document.getElementById('blog-search-clear');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) {
          clearBtn.style.display = this.searchQuery ? 'inline-flex' : 'none';
        }
        this.renderArticles();
      });

      // Keyboard shortcut: '/' to focus search
      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
          e.preventDefault();
          searchInput.focus();
        } else if (e.key === 'Escape' && document.activeElement === searchInput) {
          searchInput.value = '';
          this.searchQuery = '';
          if (clearBtn) clearBtn.style.display = 'none';
          this.renderArticles();
          searchInput.blur();
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        this.searchQuery = '';
        clearBtn.style.display = 'none';
        this.renderArticles();
      });
    }
  }

  bindCategoryFilters() {
    const pills = document.querySelectorAll('.blog-cat-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.dataset.category || 'All';
        this.activeCategory = cat;
        this.updateActiveFilterPill(cat);
        this.renderArticles();

        // Update URL query parameter cleanly without reloading
        const url = new URL(window.location);
        if (cat === 'All') {
          url.searchParams.delete('category');
        } else {
          url.searchParams.set('category', cat);
        }
        window.history.replaceState({}, '', url);
      });
    });
  }

  updateActiveFilterPill(cat) {
    document.querySelectorAll('.blog-cat-pill').forEach(p => {
      p.classList.toggle('active', (p.dataset.category || 'All') === cat);
    });
  }

  filterArticles() {
    return this.articles.filter(article => {
      const matchCat = this.activeCategory === 'All' || article.category === this.activeCategory;
      if (!matchCat) return false;

      if (!this.searchQuery) return true;

      const q = this.searchQuery;
      const titleMatch = article.title.toLowerCase().includes(q);
      const excerptMatch = article.excerpt.toLowerCase().includes(q);
      const tagsMatch = article.tags.some(t => t.toLowerCase().includes(q));
      const catMatch = article.category.toLowerCase().includes(q);

      return titleMatch || excerptMatch || tagsMatch || catMatch;
    });
  }

  renderArticles() {
    const container = document.getElementById('blog-articles-grid');
    const countBadge = document.getElementById('blog-results-count');
    const emptyState = document.getElementById('blog-empty-state');

    if (!container) return;

    const filtered = this.filterArticles();

    if (countBadge) {
      countBadge.textContent = `${filtered.length} of ${this.articles.length} Articles`;
    }

    if (filtered.length === 0) {
      container.style.display = 'none';
      if (emptyState) {
        emptyState.style.display = 'flex';
        const queryTerm = document.getElementById('empty-search-term');
        if (queryTerm) queryTerm.textContent = `"${this.searchQuery}"`;
      }
      return;
    }

    container.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = filtered.map(article => `
      <article class="blog-card" data-slug="${article.slug}">
        <a href="/blog/${article.slug}/" class="blog-card-media-link" aria-label="Read ${article.title}">
          <div class="blog-card-media-frame">
            <img 
              src="${article.coverImage}" 
              alt="${article.coverAlt}" 
              class="blog-card-img" 
              width="600" 
              height="338" 
              loading="lazy" 
              decoding="async"
            >
            <div class="blog-card-scrim"></div>
            <span class="blog-card-category-badge">${article.category}</span>
          </div>
        </a>

        <div class="blog-card-body">
          <div class="blog-card-meta-row">
            <time datetime="${article.publishedAt}" class="blog-card-date">${this.formatDate(article.publishedAt)}</time>
            <span class="blog-meta-dot">·</span>
            <span class="blog-card-readtime">${article.readTime}</span>
          </div>

          <h3 class="blog-card-title">
            <a href="/blog/${article.slug}/" class="blog-title-link">${article.title}</a>
          </h3>

          <p class="blog-card-excerpt">${article.excerpt}</p>

          <div class="blog-card-tags">
            ${article.tags.slice(0, 3).map(tag => `<span class="blog-tag-pill">${tag}</span>`).join('')}
          </div>

          <div class="blog-card-footer">
            <div class="blog-card-author">
              <img src="${article.author.avatar}" alt="${article.author.name} - GTM Engineer" class="blog-author-avatar" width="28" height="28" loading="lazy">
              <span class="blog-author-name">${article.author.name}</span>
            </div>
            <a href="/blog/${article.slug}/" class="blog-card-cta-link" aria-label="Read full article: ${article.title}">
              <span>Read article</span>
              <span class="cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  formatDate(dateStr) {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch {
      return dateStr;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BlogEngine();
});
