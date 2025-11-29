/**
 * Portfolio Manager - Sistema completo de gerenciamento do portfolio
 * Recursos: filtros avançados, modal de galeria, lazy loading, acessibilidade
 */

class PortfolioManager {
  constructor(options = {}) {
    this.container = options.container || '#portfolioGallery';
    this.modal = options.modal || '#portfolioModal';
    this.filterButtons = options.filterButtons || '.filter-btn';
    this.projects = portfolioProjects; // Importado do portfolio-data.js

    this.currentFilter = 'all';
    this.currentProject = null;
    this.currentImageIndex = 0;
    this.isModalOpen = false;
    this.zoomLevel = 1;
    this.isZoomed = false;

    this.init();
  }

  async init() {
    this.renderProjects();
    this.applyFilter('all'); // Aplica filtro "todos" por padrão
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.setupAccessibility();
    this.initializeLazyLoading();
  }

  // Renderiza todos os projetos
  renderProjects() {
    const container = document.querySelector(this.container);
    if (!container) return;

    container.innerHTML = '';

    this.projects.forEach((project, index) => {
      const card = this.createProjectCard(project, index);
      container.appendChild(card);
    });
  }

  // Cria card individual do projeto
  createProjectCard(project, index) {
    const card = document.createElement('div');
    const categories = project.categories || [project.category];
    const primaryCategory = project.category;
    card.className = `portfolio-item ${primaryCategory}-item`;
    card.setAttribute('data-category', primaryCategory);
    card.setAttribute('data-categories', categories.join(' '));
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Abrir galeria: ${project.title} - ${project.category === 'video' ? 'Vídeo' : (project.images?.length || 0) + ' imagens'}`);

    // Adiciona classe de delay para animação escalonada
    card.style.setProperty('--item-order', index);

    const mediaCount = project.category === 'video' ? 1 : (project.images?.length || 0);

    if (project.category === 'video') {
      // Card para vídeo
      card.innerHTML = `
        <div class="portfolio-card">
          <div class="portfolio-media video-media">
            <div class="video-thumbnail">
              <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
              <div class="play-overlay">
                <i class="material-icons">play_arrow</i>
              </div>
              <div class="image-count-badge">
                <i class="material-icons">videocam</i>
              </div>
            </div>
          </div>
          <div class="portfolio-content">
            <h3>${project.title}</h3>
            <p>${project.subtitle}</p>
            <div class="portfolio-meta">
              ${categories.map(cat => `<span class="category-badge ${cat}">${this.getCategoryLabel(cat)}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    } else {
      // Card para imagens
      card.innerHTML = `
        <div class="portfolio-card">
          <div class="portfolio-media">
            <img src="${project.coverImage}" alt="${project.title}" loading="lazy">
            <div class="image-count-badge">
              <i class="material-icons">image</i>
              ${mediaCount}
            </div>
          </div>
          <div class="portfolio-content">
            <h3>${project.title}</h3>
            <p>${project.subtitle}</p>
            <div class="portfolio-meta">
              ${categories.map(cat => `<span class="category-badge ${cat}">${this.getCategoryLabel(cat)}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // Event listener para abrir modal
    card.addEventListener('click', () => this.openProjectModal(project));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.openProjectModal(project);
      }
    });

    return card;
  }

  // Abre modal do projeto
  openProjectModal(project) {
    this.currentProject = project;
    this.currentImageIndex = 0;
    this.zoomLevel = 1;
    this.isZoomed = false;
    this.isModalOpen = true;

    const modal = document.querySelector(this.modal);
    const modalImage = document.getElementById('modalImage');
    const modalCounter = document.getElementById('modalCounter');

    if (project.category === 'video') {
      // Modal para vídeo
      this.setupVideoModal(project);
    } else {
      // Modal para imagens
      this.renderThumbnails();
      this.loadImage(0);
    }

    // Mostra modal
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Configura modal para vídeo
  setupVideoModal(project) {
    const modalMedia = document.querySelector('.modal-media') || document.getElementById('modalMedia');
    const modalCounter = document.getElementById('modalCounter');

    if (!modalMedia) {
      console.error('Elemento .modal-media não encontrado');
      return;
    }

    if (!project.vimeoId) {
      console.error('vimeoId não definido no projeto');
      modalMedia.innerHTML = `
        <div class="error-message">
          <i class="material-icons">error_outline</i>
          <p>Vídeo não configurado</p>
          <small>ID do Vimeo não encontrado</small>
        </div>
      `;
      return;
    }

    // Esconde elementos de galeria de imagens
    const thumbnails = document.getElementById('modalThumbnails');
    const zoomControls = document.querySelector('.zoom-controls');
    if (thumbnails) thumbnails.style.display = 'none';
    if (zoomControls) zoomControls.style.display = 'none';

    // Mostra vídeo incorporado
    const iframeSrc = `https://player.vimeo.com/video/${project.vimeoId}?autoplay=0&title=0&byline=0&portrait=0`;

    modalMedia.innerHTML = `
      <div class="video-container">
        <iframe src="${iframeSrc}"
                width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
                loading="lazy"></iframe>
        <div class="video-loading" id="videoLoading">
          <div class="spinner"></div>
          <p>Carregando vídeo...</p>
        </div>
      </div>
    `;

    if (modalCounter) modalCounter.textContent = 'Vídeo';

    // Garante que o container de vídeo seja visível
    modalMedia.style.display = 'flex';
    modalMedia.style.visibility = 'visible';

    // Gerencia o estado de carregamento do vídeo
    setTimeout(() => {
      const iframe = modalMedia.querySelector('iframe');
      const loadingElement = document.getElementById('videoLoading');
      const videoContainer = modalMedia.querySelector('.video-container');

      if (videoContainer) {
        videoContainer.style.display = 'block';
        videoContainer.style.visibility = 'visible';
      }

      if (iframe) {
        iframe.onload = () => {
          if (loadingElement) loadingElement.style.display = 'none';
        };
        iframe.onerror = () => {
          if (loadingElement) {
            loadingElement.innerHTML = `
              <div class="error-message">
                <i class="material-icons">error_outline</i>
                <p>Vídeo não disponível</p>
                <small>Verifique sua conexão ou tente novamente</small>
              </div>
            `;
          }
        };

        // Timeout fallback
        setTimeout(() => {
          if (loadingElement) loadingElement.style.display = 'none';
        }, 5000);
      } else {
        console.error('Iframe não encontrado após inserção');
      }
    }, 100);
  }

  // Carrega imagem no modal
  async loadImage(index) {
    if (!this.currentProject || !this.currentProject.images || !this.currentProject.images[index]) return;

    const imageLoading = document.getElementById('imageLoading');
    const modalImage = document.getElementById('modalImage');
    const modalCounter = document.getElementById('modalCounter');

    // Mostra loading
    imageLoading.style.display = 'flex';
    modalImage.style.display = 'none';

    const image = this.currentProject.images[index];

    // Simula carregamento (em produção, seria um Promise real)
    await new Promise(resolve => {
      modalImage.onload = () => resolve();
      modalImage.src = image.url;
      modalImage.alt = image.alt;
      modalImage.style.transform = 'scale(1)';
    });

    // Esconde loading e mostra imagem
    imageLoading.style.display = 'none';
    modalImage.style.display = 'block';

    // Atualiza contador
    modalCounter.textContent = `${index + 1} / ${this.currentProject.images.length}`;

    // Atualiza miniaturas ativas
    this.updateActiveThumbnail(index);

    // Reset zoom
    this.resetZoom();
  }

  // Renderiza miniaturas
  renderThumbnails() {
    const thumbnailsContainer = document.getElementById('modalThumbnails');
    if (!thumbnailsContainer || !this.currentProject || !this.currentProject.images) return;

    thumbnailsContainer.style.display = 'flex';
    document.querySelector('.zoom-controls').style.display = 'flex';
    thumbnailsContainer.innerHTML = '';

    this.currentProject.images.forEach((image, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';
      thumbnail.innerHTML = `<img src="${image.url}" alt="${image.alt}" loading="lazy">`;
      thumbnail.addEventListener('click', () => this.loadImage(index));
      thumbnailsContainer.appendChild(thumbnail);
    });
  }

  // Atualiza thumbnail ativa
  updateActiveThumbnail(activeIndex) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === activeIndex);
    });
  }

  // Fecha modal
  closeModal() {
    const modal = document.querySelector(this.modal);
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    this.isModalOpen = false;
    this.currentProject = null;
    this.zoomLevel = 1;
    this.isZoomed = false;

    // Reset modal content
    const modalMedia = document.querySelector('.modal-media');
    modalMedia.innerHTML = `
      <div class="media-container">
        <img id="modalImage" src="" alt="" style="display: none;">
        <div class="image-loading" id="imageLoading">
          <div class="spinner"></div>
        </div>
      </div>
      <div class="zoom-controls">
        <button class="zoom-btn" id="zoomIn" aria-label="Ampliar imagem">
          <i class="material-icons">zoom_in</i>
        </button>
        <button class="zoom-btn" id="zoomOut" aria-label="Reduzir imagem">
          <i class="material-icons">zoom_out</i>
        </button>
        <button class="zoom-btn" id="zoomReset" aria-label="Resetar zoom">
          <i class="material-icons">center_focus_strong</i>
        </button>
      </div>
    `;
  }

  // Configura event listeners
  setupEventListeners() {
    // Botão fechar
    const closeBtn = document.getElementById('modalClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Overlay
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeModal());
    }

    // Navegação
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.navigateImage(-1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.navigateImage(1));
    }

    // Zoom controls
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomResetBtn = document.getElementById('zoomReset');

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => this.zoomImage(0.25));
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => this.zoomImage(-0.25));
    }
    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', () => this.resetZoom());
    }

    // Filtros
    document.querySelectorAll(this.filterButtons).forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.applyFilter(filter);
      });
    });
  }

  // Navegação entre imagens
  navigateImage(direction) {
    if (!this.currentProject || this.currentProject.category === 'video') return;

    const totalImages = this.currentProject.images.length;
    this.currentImageIndex = (this.currentImageIndex + direction + totalImages) % totalImages;
    this.loadImage(this.currentImageIndex);
  }

  // Controle de zoom
  zoomImage(delta) {
    if (this.currentProject?.category === 'video') return;

    const modalImage = document.getElementById('modalImage');
    if (!modalImage) return;

    this.zoomLevel = Math.max(0.5, Math.min(3, this.zoomLevel + delta));
    modalImage.style.transform = `scale(${this.zoomLevel})`;
    this.isZoomed = this.zoomLevel > 1;

    // Atualiza cursor
    modalImage.style.cursor = this.isZoomed ? 'grab' : 'zoom-in';
  }

  // Reset zoom
  resetZoom() {
    if (this.currentProject?.category === 'video') return;

    const modalImage = document.getElementById('modalImage');
    if (!modalImage) return;

    this.zoomLevel = 1;
    modalImage.style.transform = 'scale(1)';
    this.isZoomed = false;
    modalImage.style.cursor = 'zoom-in';
  }

  // Aplicação de filtros
  applyFilter(filter) {
    this.currentFilter = filter;

    // Atualiza botões ativos
    document.querySelectorAll(this.filterButtons).forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    // Filtra projetos
    const items = document.querySelectorAll('.portfolio-item');
    let visibleCount = 0;

    items.forEach(item => {
      const itemCategories = item.dataset.categories ? item.dataset.categories.split(' ') : [item.dataset.category];
      const shouldShow = filter === 'all' || itemCategories.includes(filter);
      item.classList.toggle('show', shouldShow);

      if (shouldShow) {
        item.style.setProperty('--item-order', visibleCount);
        visibleCount++;
      }
    });

    // Anima entrada dos itens
    setTimeout(() => {
      items.forEach((item, index) => {
        if (item.classList.contains('show')) {
          item.style.setProperty('--item-order', index);
        }
      });
    }, 100);
  }

  // Navegação por teclado
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.isModalOpen) return;

      switch (e.key) {
        case 'Escape':
          this.closeModal();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.navigateImage(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.navigateImage(1);
          break;
        case '+':
        case '=':
          e.preventDefault();
          this.zoomImage(0.25);
          break;
        case '-':
          e.preventDefault();
          this.zoomImage(-0.25);
          break;
        case '0':
          e.preventDefault();
          this.resetZoom();
          break;
      }
    });
  }

  // Configurações de acessibilidade
  setupAccessibility() {
    // Anúncios para leitores de tela
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.className = 'sr-only';
    document.body.appendChild(this.announcer);
  }

  // Lazy loading de imagens
  initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Trigger load
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Utilitários
  getCategoryLabel(category) {
    const labels = {
      identity: 'Identidade Visual',
      video: 'Vídeos',
      print: 'Materiais Impressos',
      digital: 'Digital'
    };
    return labels[category] || category;
  }

  // Método público para abrir projeto específico
  openProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      this.openProjectModal(project);
    }
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#portfolioGallery')) {
    window.portfolioManager = new PortfolioManager();
  }
});
