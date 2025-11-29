/**
 * Edge Function para injetar dinamicamente a chave do reCAPTCHA
 *
 * Esta função intercepta requisições ao arquivo recaptcha-config.js
 * e substitui o placeholder pela chave real da variável de ambiente
 */

export default async (request, context) => {
  // Apenas processar o arquivo de configuração específico
  const url = new URL(request.url);
  if (!url.pathname.endsWith('/assets/js/recaptcha-config.js')) {
    return context.next();
  }

  // Buscar a resposta original
  const response = await context.next();
  const originalJs = await response.text();

  // Obter a chave da variável de ambiente
  const recaptchaSiteKey = Deno.env.get('RECAPTCHA_SITE_KEY');

  let modifiedJs = originalJs;

  if (recaptchaSiteKey) {
    // Substituir o placeholder pela chave real
    modifiedJs = originalJs.replace(
      '__RECAPTCHA_SITE_KEY_PLACEHOLDER__',
      recaptchaSiteKey
    );
  } else {
    // Em desenvolvimento, usar uma chave de fallback ou logar o erro

    // Para desenvolvimento, você pode definir uma chave de teste
    const devKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Chave de teste do Google
    modifiedJs = originalJs.replace(
      '__RECAPTCHA_SITE_KEY_PLACEHOLDER__',
      devKey
    );
  }

  // Retornar o JavaScript modificado
  return new Response(modifiedJs, {
    status: response.status,
    headers: {
      ...response.headers,
      'Content-Type': 'application/javascript',
      // Importante: não cachear este arquivo para sempre ter a chave atual
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
};
