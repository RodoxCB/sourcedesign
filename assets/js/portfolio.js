// Portfolio Filter and Modal Functionality
class PortfolioManager {
    constructor() {
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.modal = document.getElementById('portfolioModal');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.modalClose = document.getElementById('modalClose');
        this.modalMedia = document.getElementById('modalMedia');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.modalCategory = document.getElementById('modalCategory');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentIndex = 0;
        this.filteredItems = [];
        this.currentGalleryIndex = 0;
        this.currentGallery = [];

        this.init();
    }

    init() {
        this.setupFilters();
        this.setupModal();
        this.showAllItems(); // Show all items initially
    }

    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterItems(filter);
                this.updateActiveFilter(button);
            });
        });
    }

    filterItems(filter) {
        if (filter === 'all') {
            // Mostrar todos os items na ordem original, mas com identidade visual primeiro
            const identityItems = Array.from(this.portfolioItems).filter(item =>
                item.getAttribute('data-category') === 'identity'
            );
            const otherItems = Array.from(this.portfolioItems).filter(item =>
                item.getAttribute('data-category') !== 'identity'
            );
            this.filteredItems = [...identityItems, ...otherItems];
            this.animateGridReorder(this.filteredItems);
        } else {
            // Filtrar apenas items da categoria selecionada
            this.filteredItems = Array.from(this.portfolioItems).filter(item => {
                return item.getAttribute('data-category') === filter;
            });
            this.animateGridReorder(this.filteredItems);
        }
    }


    animateGridReorder(visibleItems) {
        // Iniciar animação imediatamente
        setTimeout(() => {
            // ESTADO 0: Tornar todos os cards invisíveis INSTANTANEAMENTE
            this.portfolioItems.forEach(item => {
                item.style.transition = 'none'; // Desabilitar transições temporariamente
                item.style.opacity = '0'; // Opacity 0 imediato
                item.classList.remove('show');
                item.style.order = '';
            });

            // Forçar reflow para aplicar mudanças imediatamente
            this.portfolioItems[0].offsetHeight;

            // ESTADO 1: Reordenar todos os cards (ainda invisíveis)
            setTimeout(() => {
                // Aplicar ordem a todos os cards
                this.portfolioItems.forEach((item, index) => {
                    if (visibleItems.includes(item)) {
                        item.style.order = visibleItems.indexOf(item);
                    } else {
                        item.style.order = visibleItems.length + index; // Itens invisíveis vão para o final
                    }
                });

                // ESTADO 2: Revelar apenas os cards visíveis
                setTimeout(() => {
                    // Reabilitar transições apenas para os cards que vão aparecer
                    visibleItems.forEach(item => {
                        item.style.transition = ''; // Restaurar transições CSS
                        item.style.opacity = ''; // Remover opacity inline para usar CSS
                        item.classList.add('show');
                    });

                    // Garantir que cards invisíveis permanecem invisíveis
                    this.portfolioItems.forEach(item => {
                        if (!visibleItems.includes(item)) {
                            item.style.opacity = '0';
                            item.classList.remove('show');
                        }
                    });

                }, 50); // Pequeno delay para garantir ordem aplicada

            }, 50); // Delay mínimo para reordenação

        }, 100); // Pequeno delay antes de iniciar a animação
    }

    updateActiveFilter(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    showAllItems() {
        this.portfolioItems.forEach(item => {
            item.classList.add('show');
        });
        this.filteredItems = Array.from(this.portfolioItems);
    }

    setupModal() {
        // Setup click and keyboard handlers for portfolio items
        this.portfolioItems.forEach((item, originalIndex) => {
            // Click handler
            item.addEventListener('click', (e) => {
                const galleryData = item.getAttribute('data-gallery');

                // Find the current index in filteredItems
                const currentIndex = this.filteredItems.indexOf(item);

                if (galleryData) {
                    // Handle gallery modal
                    e.preventDefault();
                    this.openModal(currentIndex);
                    return;
                }

                // Handle internal modal for videos
                this.openModal(currentIndex);
            });

            // Keyboard handler for accessibility
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const currentIndex = this.filteredItems.indexOf(item);
                    this.openModal(currentIndex);
                }
            });
        });

        // Modal close handlers
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }

        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', (e) => {
                if (e.target === this.modalOverlay) {
                    this.closeModal();
                }
            });
        }

        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.navigateModal(-1));
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.navigateModal(1));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal && this.modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.closeModal();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    if (this.currentGallery.length > 0) {
                        this.navigateGallery(-1);
                    } else {
                        this.navigateModal(-1);
                    }
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    if (this.currentGallery.length > 0) {
                        this.navigateGallery(1);
                    } else {
                        this.navigateModal(1);
                    }
                }
            }
        });
    }

    openModal(index) {
        if (!this.filteredItems.length) return;

        this.currentIndex = index;
        const item = this.filteredItems[this.currentIndex];

        if (!item) return;

        // Store reference to the element that triggered the modal for focus management
        this.lastFocusedElement = document.activeElement;

        // Get item data
        const media = item.querySelector('.portfolio-media');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const category = item.querySelector('.portfolio-category').textContent;

        // Check if this is a Vimeo video or gallery
        const vimeoId = item.getAttribute('data-vimeo-id');
        const galleryData = item.getAttribute('data-gallery');

        if (vimeoId) {
            // Create Vimeo embed for videos
            this.modalMedia.innerHTML = `
                <iframe src="https://player.vimeo.com/video/${vimeoId}"
                        width="100%"
                        height="100%"
                        frameborder="0"
                        allow="autoplay; fullscreen"
                        allowfullscreen>
                </iframe>
            `;
        } else if (galleryData) {
            // Handle gallery modal
            this.currentGallery = JSON.parse(galleryData);
            this.currentGalleryIndex = 0;
            this.renderGallery();
        } else {
            // Copy media content for images
            this.modalMedia.innerHTML = media.innerHTML;
        }

        this.modalTitle.textContent = title;
        this.modalDescription.textContent = description;
        this.modalCategory.textContent = category;

        // Update modal ARIA attributes
        this.modal.setAttribute('aria-hidden', 'false');
        this.modalOverlay.setAttribute('aria-hidden', 'false');

        // Announce modal opening to screen readers
        const announcer = document.getElementById('galleryAnnouncer');
        if (announcer) {
            announcer.textContent = `Galeria aberta: ${title}`;
        }

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Move focus to modal close button for keyboard navigation
        if (this.modalClose) {
            setTimeout(() => {
                this.modalClose.focus();
            }, 100);
        }

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    renderGallery() {
        if (!this.currentGallery.length) return;

        const currentImage = this.currentGallery[this.currentGalleryIndex];
        const totalImages = this.currentGallery.length;

        this.modalMedia.innerHTML = `
            <div class="gallery-container">
                <img src="${currentImage.url}"
                     alt="${currentImage.alt}"
                     class="gallery-image"
                     loading="lazy">
                ${totalImages > 1 ? `
                    <div class="gallery-counter">
                        ${this.currentGalleryIndex + 1} / ${totalImages}
                    </div>
                    <button class="gallery-nav-btn gallery-prev" aria-label="Imagem anterior" tabindex="0">
                        <i class="material-icons">chevron_left</i>
                    </button>
                    <button class="gallery-nav-btn gallery-next" aria-label="Próxima imagem" tabindex="0">
                        <i class="material-icons">chevron_right</i>
                    </button>
                ` : ''}
            </div>
        `;

        // Announce current image to screen readers
        const announcer = document.getElementById('galleryAnnouncer');
        if (announcer) {
            announcer.textContent = `Imagem ${this.currentGalleryIndex + 1} de ${totalImages}: ${currentImage.alt}`;
        }

        // Attach event listeners para navegação da galeria
        if (totalImages > 1) {
            this.modalMedia.querySelector('.gallery-prev').addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigateGallery(-1);
            });

            this.modalMedia.querySelector('.gallery-next').addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigateGallery(1);
            });
        }
    }

    navigateGallery(direction) {
        if (!this.currentGallery.length) return;

        this.currentGalleryIndex += direction;

        // Loop circular
        if (this.currentGalleryIndex < 0) {
            this.currentGalleryIndex = this.currentGallery.length - 1;
        } else if (this.currentGalleryIndex >= this.currentGallery.length) {
            this.currentGalleryIndex = 0;
        }

        this.renderGallery();
    }

    closeModal() {
        // Update modal ARIA attributes
        this.modal.setAttribute('aria-hidden', 'true');
        this.modalOverlay.setAttribute('aria-hidden', 'true');

        // Clear announcer
        const announcer = document.getElementById('galleryAnnouncer');
        if (announcer) {
            announcer.textContent = '';
        }

        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentGallery = [];
        this.currentGalleryIndex = 0;

        // Restore focus to the element that triggered the modal
        if (this.lastFocusedElement) {
            setTimeout(() => {
                this.lastFocusedElement.focus();
            }, 100);
        }
    }

    navigateModal(direction) {
        if (!this.filteredItems.length) return;

        this.currentIndex += direction;

        if (this.currentIndex < 0) {
            this.currentIndex = this.filteredItems.length - 1;
        } else if (this.currentIndex >= this.filteredItems.length) {
            this.currentIndex = 0;
        }

        this.openModal(this.currentIndex);
    }

    updateNavigationButtons() {
        if (this.filteredItems.length <= 1) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = 'flex';
            this.nextBtn.style.display = 'flex';
        }
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.portfolio-gallery')) {
        new PortfolioManager();
    }
});
