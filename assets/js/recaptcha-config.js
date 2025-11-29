/**
 * Configuração dinâmica do reCAPTCHA
 * Esta configuração é injetada automaticamente pela Edge Function do Netlify
 * com a chave real da variável de ambiente RECAPTCHA_SITE_KEY
 */
window.RECAPTCHA_CONFIG = {
  // Esta chave será substituída dinamicamente pela Edge Function
  siteKey: '__RECAPTCHA_SITE_KEY_PLACEHOLDER__',

  // Configurações adicionais do reCAPTCHA (opcional)
  theme: 'light',
  size: 'normal',
  callback: 'onRecaptchaSuccess',
  'expired-callback': 'onRecaptchaExpired'
};

/**
 * Função chamada quando o reCAPTCHA é resolvido com sucesso
 */
function onRecaptchaSuccess(token) {
  // reCAPTCHA validado com sucesso
  // Você pode adicionar lógica adicional aqui se necessário
}

/**
 * Função chamada quando o reCAPTCHA expira
 */
function onRecaptchaExpired() {
  // reCAPTCHA expirou, será renovado automaticamente
  // O reCAPTCHA se renovará automaticamente
}
