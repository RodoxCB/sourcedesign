/**
 * StarField Background - Fundo de partículas estelares otimizado
 * Criado para o site institucional Source Design
 * Performance otimizada: Canvas 2D, 30 FPS max, pool de objetos
 */

class StarFieldBackground {
    constructor(containerId) {
        this.containerId = containerId;
        this.canvas = null;
        this.ctx = null;
        this.stars = [];
        this.maxStars = 150;
        this.animationId = null;
        this.lastTime = 0;
        this.targetFPS = 30;
        this.frameInterval = 1000 / this.targetFPS;
        this.isVisible = true;

        // Configurações visuais
        this.config = {
            starColors: {
                primary: 'rgba(255, 255, 255, {opacity})',    // Branco
                accent: 'rgba(6, 182, 212, {opacity})',       // Azul do site
                glow: 'rgba(6, 182, 212, 0)'                  // Gradiente
            },
            movement: {
                baseSpeed: 0.3,
                variation: 0.2,
                twinkleSpeed: 0.02
            }
        };

        this.init();
    }

    init() {
        this.createCanvas();
        this.setupStars();
        this.setupEventListeners();
        this.animate();
    }

    createCanvas() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.warn('Container para starfield não encontrado:', this.containerId);
            return;
        }

        // Criar canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'starfield-canvas';
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;

        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.resizeCanvas();
        console.log('Canvas do starfield criado com sucesso');
    }

    resizeCanvas() {
        if (!this.canvas) {
            console.warn('❌ Canvas não existe para redimensionar');
            return;
        }

        const container = document.getElementById(this.containerId);
        if (!container) {
            console.warn('❌ Container não encontrado para redimensionamento');
            return;
        }

        const rect = container.getBoundingClientRect();
        console.log(`📏 Container dimensions: ${rect.width}x${rect.height}`);

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        // Definir tamanho real do canvas
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        // Escalar contexto
        this.ctx.scale(dpr, dpr);

        // Ajustar número de estrelas baseado no tamanho
        this.adjustStarCount();

        // Recriar estrelas com novo tamanho
        this.setupStars();

        console.log(`🔄 Canvas redimensionado: ${this.canvas.width}x${this.canvas.height}, ${this.maxStars} estrelas`);
    }

    adjustStarCount() {
        const area = this.canvas.width * this.canvas.height;
        const baseDensity = 8000; // pixels por estrela

        // Ajustar densidade baseado no tamanho da tela
        this.maxStars = Math.min(200, Math.max(50, Math.floor(area / baseDensity)));

        // Reduzir ainda mais em dispositivos móveis para performance
        if (window.innerWidth < 768) {
            this.maxStars = Math.floor(this.maxStars * 0.6);
        }
    }

    setupStars() {
        this.stars = [];

        for (let i = 0; i < this.maxStars; i++) {
            this.stars.push({
                // Posição aleatória
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,

                // Velocidade variável (muito lenta para não distrair)
                vx: (Math.random() - 0.5) * this.config.movement.baseSpeed,
                vy: (Math.random() - 0.5) * this.config.movement.variation,

                // Propriedades visuais
                size: Math.random() * 2 + 0.5,
                baseOpacity: Math.random() * 0.6 + 0.2,

                // Brilho pulsante
                twinkleSpeed: Math.random() * this.config.movement.twinkleSpeed + 0.005,
                twinkleOffset: Math.random() * Math.PI * 2,

                // Cor (mistura branco e azul)
                useAccentColor: Math.random() > 0.7
            });
        }
    }

    setupEventListeners() {
        // Resize responsivo
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => this.resizeCanvas(), 100);
        });

        // Pausar quando aba não está visível (economia de bateria)
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
            if (this.isVisible) {
                this.resume();
            } else {
                this.pause();
            }
        });

        // Otimização: não iniciar animação se o dispositivo prefere movimento reduzido
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.targetFPS = 15; // Reduzir FPS para usuários que preferem movimento reduzido
            this.frameInterval = 1000 / this.targetFPS;
            console.log('StarField: Movimento reduzido detectado, ajustando FPS para 15');
        }
    }

    animate = (currentTime = 0) => {
        // Throttle para manter FPS limitado (30 FPS max para economia de bateria)
        if (currentTime - this.lastTime < this.frameInterval) {
            this.animationId = requestAnimationFrame(this.animate);
            return;
        }

        this.lastTime = currentTime;

        // Só animar se estiver visível (economia de CPU quando aba não está ativa)
        if (this.isVisible) {
            this.updateStars();
            this.drawStars();
        }

        this.animationId = requestAnimationFrame(this.animate);
    }

    updateStars() {
        const time = Date.now() * 0.001;

        this.stars.forEach(star => {
            // Movimento orgânico lento
            star.x += star.vx;
            star.y += star.vy;

            // Wrap around das bordas (efeito infinito)
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;
        });
    }

    drawStars() {
        if (!this.ctx) {
            console.warn('❌ Contexto do canvas não encontrado');
            return;
        }

        // Limpar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Configurar blend mode para efeito de brilho
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'lighter';

        console.log(`🎨 Desenhando ${this.stars.length} estrelas`);

        this.stars.forEach((star, index) => {
            if (index < 5) { // Log apenas para primeiras estrelas para não poluir console
                console.log(`⭐ Estrela ${index}: x=${star.x.toFixed(1)}, y=${star.y.toFixed(1)}, size=${star.size}`);
            }

            const time = Date.now() * 0.001;

            // Calcular opacidade pulsante
            const twinkle = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
            const opacity = star.baseOpacity * twinkle;

            // Escolher cor baseado na propriedade da estrela
            const color = star.useAccentColor ?
                this.config.starColors.accent.replace('{opacity}', opacity) :
                this.config.starColors.primary.replace('{opacity}', opacity);

            // TESTE SIMPLES: Desenhar estrela simples primeiro
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = star.useAccentColor ? `rgba(6, 182, 212, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
            this.ctx.fill();

            // Desenhar estrela com gradiente de brilho
            // this.drawStarGlow(star.x, star.y, star.size, color, opacity);
        });

        this.ctx.restore();
    }

    drawStarGlow(x, y, size, color, opacity) {
        // Gradiente radial para efeito de brilho
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size * 3);

        if (color.includes('6, 182, 212')) {
            // Azul - gradiente azul para transparente
            gradient.addColorStop(0, color);
            gradient.addColorStop(0.3, `rgba(6, 182, 212, ${opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
        } else {
            // Branco - gradiente branco para azul claro
            gradient.addColorStop(0, color);
            gradient.addColorStop(0.4, `rgba(139, 229, 255, ${opacity * 0.3})`);
            gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
        }

        // Desenhar círculo com gradiente
        this.ctx.beginPath();
        this.ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Centro mais brilhante
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resume() {
        if (!this.animationId) {
            this.animate();
        }
    }

    destroy() {
        this.pause();

        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }

        window.removeEventListener('resize', this.resizeCanvas);
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎭 Inicializando StarField Background...');

    // Aguardar um pouco para garantir que todos os elementos estão prontos
    setTimeout(() => {
        initStarField();
    }, 100);
});

function initStarField() {
    console.log('🔄 Procurando seção hero...');

    // Verificar se estamos na página principal (onde existe a seção hero)
    const heroElement = document.getElementById('hero') || document.querySelector('.hero');
    console.log('🔍 Elemento hero encontrado:', heroElement);

    if (heroElement) {
        console.log('✅ Elemento hero encontrado, criando StarField...');
        try {
            window.starFieldInstance = new StarFieldBackground('hero');
            console.log('🎉 StarField Background inicializado na seção hero');

            // Verificar se o canvas foi criado
            setTimeout(() => {
                const canvas = document.getElementById('starfield-canvas');
                if (canvas) {
                    console.log('🎨 Canvas criado com sucesso:', canvas.width + 'x' + canvas.height);
                    console.log('🎯 Canvas styles:', getComputedStyle(canvas));
                } else {
                    console.error('❌ Canvas não foi criado!');
                    console.log('📄 Elementos no container hero:', heroElement.children);
                }
            }, 500);
        } catch (error) {
            console.error('💥 Erro ao criar StarField:', error);
        }

    } else {
        console.warn('⚠️ Seção hero não encontrada - starfield não será inicializado');
        const allSections = document.querySelectorAll('section');
        console.log('📄 Seções encontradas:', allSections.length, Array.from(allSections).map(s => s.className || s.id));
    }
}
