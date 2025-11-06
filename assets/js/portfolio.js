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
        // Hide all items first
        this.portfolioItems.forEach(item => {
            item.classList.remove('show');
        });

        if (filter === 'all') {
            this.filteredItems = Array.from(this.portfolioItems);
            this.portfolioItems.forEach(item => {
                item.classList.add('show');
            });
        } else {
            this.filteredItems = Array.from(this.portfolioItems).filter(item => {
                return item.getAttribute('data-category') === filter;
            });
            this.filteredItems.forEach(item => {
                item.classList.add('show');
            });
        }
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
        // Setup click handlers for portfolio items
        this.portfolioItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openModal(index);
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
                    this.closeModal();
                } else if (e.key === 'ArrowLeft') {
                    this.navigateModal(-1);
                } else if (e.key === 'ArrowRight') {
                    this.navigateModal(1);
                }
            }
        });
    }

    openModal(index) {
        if (!this.filteredItems.length) return;

        this.currentIndex = index;
        const item = this.filteredItems[this.currentIndex];

        if (!item) return;

        // Get item data
        const media = item.querySelector('.portfolio-media');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const category = item.querySelector('.portfolio-category').textContent;

        // Update modal content
        this.modalMedia.innerHTML = media.innerHTML;
        this.modalTitle.textContent = title;
        this.modalDescription.textContent = description;
        this.modalCategory.textContent = category;

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Update navigation buttons
        this.updateNavigationButtons();
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
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
