/**
 * Google Analytics 4 Advanced Configuration
 * Implementação otimizada para Source Design
 */

// Inicialização do dataLayer
window.dataLayer = window.dataLayer || [];

// Função gtag global
function gtag() {
    dataLayer.push(arguments);
}

// Event tracking personalizado
const AnalyticsTracker = {
    // Tracking genérico de eventos
    trackEvent: function(action, category, label, value) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': value
        });
    },

    // Tracking específico para formulários
    trackFormSubmission: function(formType) {
        this.trackEvent('form_submit', 'engagement', formType);
    },

    // Tracking para cliques em botões
    trackButtonClick: function(buttonName) {
        this.trackEvent('click', 'interaction', buttonName);
    },

    // Tracking para visualização de serviços
    trackServiceView: function(serviceName) {
        this.trackEvent('view_service', 'engagement', serviceName);
    },

    // Tracking para visualização de portfolio
    trackPortfolioView: function(projectName) {
        this.trackEvent('view_portfolio', 'engagement', projectName);
    },

    // Tracking para downloads (futuro)
    trackDownload: function(fileName) {
        this.trackEvent('download', 'engagement', fileName);
    },

    // Tracking para interações sociais
    trackSocialInteraction: function(platform, action) {
        this.trackEvent('social_' + action, 'social', platform);
    }
};

// Configuração de consentimento (LGPD compliance)
const CookieConsent = {
    consentGiven: false,
    initialized: false,

    init: function() {
        // Prevenir múltiplas inicializações
        if (this.initialized) {
            return;
        }
        this.initialized = true;

        this.consentGiven = this.getCookie('ga_consent') === 'true';

        if (!this.consentGiven) {
            this.showConsentBanner();
        } else {
            this.enableAnalytics();
        }
    },

    showConsentBanner: function() {
        // Verificar se o banner já existe
        if (document.getElementById('cookie-consent-banner')) {
            return;
        }

        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="consent-content">
                <p>Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site. Ao continuar navegando, você concorda com nossa <a href="/politica-privacidade.html" style="color: #007bff;">política de privacidade</a>.</p>
                <div class="consent-buttons">
                    <button id="accept-cookies" class="consent-btn accept">Aceitar Cookies</button>
                    <button id="reject-cookies" class="consent-btn reject">Recusar</button>
                </div>
            </div>
        `;

        // Estilos inline para o banner
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.95);
            color: white;
            padding: 20px;
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            line-height: 1.5;
        `;

        // Estilos dos botões
        const style = document.createElement('style');
        style.textContent = `
            .consent-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
            .consent-buttons { display: flex; gap: 10px; }
            .consent-btn { padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-weight: 500; }
            .consent-btn.accept { background: #007bff; color: white; }
            .consent-btn.reject { background: #6c757d; color: white; }
            .consent-btn:hover { opacity: 0.8; }
            @media (max-width: 768px) {
                .consent-content { flex-direction: column; gap: 15px; text-align: center; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(banner);

        // Event listeners
        document.getElementById('accept-cookies').addEventListener('click', () => {
            this.setConsent(true);
            this.enableAnalytics();
            this.hideBanner();
        });

        document.getElementById('reject-cookies').addEventListener('click', () => {
            this.setConsent(false);
            this.disableAnalytics();
            this.hideBanner();
        });
    },

    setConsent: function(accepted) {
        this.consentGiven = accepted;
        this.setCookie('ga_consent', accepted, 365);
    },

    enableAnalytics: function() {
        if (this.consentGiven && typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    },

    disableAnalytics: function() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    },

    hideBanner: function() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    },

    setCookie: function(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
    },

    getCookie: function(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
};

// Inicializar consentimento quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    CookieConsent.init();
});

// Exportar para uso global
window.AnalyticsTracker = AnalyticsTracker;
