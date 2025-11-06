# Configuração de Segurança - Source Design

## Variáveis de Ambiente Necessárias

Configure as seguintes variáveis no painel do Netlify (Site Settings > Environment Variables):

### Email Configuration
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```
- `EMAIL_USER`: Seu endereço Gmail
- `EMAIL_PASS`: Senha de aplicativo do Gmail (não a senha normal)

### reCAPTCHA Configuration
```
RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
```
- Obtenha as chaves em: https://www.google.com/recaptcha/admin

## Como Configurar o Gmail para Envio

1. Ative a verificação em duas etapas na sua conta Google
2. Gere uma senha de aplicativo:
   - Acesse https://myaccount.google.com/security
   - Clique em "Senhas de app" na seção "Como fazer login no Google"
   - Selecione "Mail" e "Outro"
   - Use a senha gerada como `EMAIL_PASS`

## Como Configurar o reCAPTCHA

1. Acesse https://www.google.com/recaptcha/admin
2. Clique em "Criar"
3. Selecione "reCAPTCHA v2" > "Caixa de seleção 'Não sou um robô'"
4. Adicione seu domínio (ex: sourcedesign.com.br)
5. Copie a chave do site para `RECAPTCHA_SITE_KEY`
6. Copie a chave secreta para `RECAPTCHA_SECRET_KEY`

## Funcionalidades de Segurança Implementadas

- ✅ Headers de segurança (CSP, HSTS, X-Frame-Options, etc.)
- ✅ Validação server-side completa
- ✅ Proteção reCAPTCHA contra spam
- ✅ Rate limiting (máximo 3 envios por 15 minutos por IP)
- ✅ Sanitização de dados de entrada
- ✅ Envio de email profissional
- ✅ Validação em tempo real no frontend
- ✅ Tratamento adequado de erros

## Rate Limiting

- **Limite**: 3 envios por IP a cada 15 minutos
- **Headers de resposta**:
  - `X-RateLimit-Limit`: Limite máximo
  - `X-RateLimit-Remaining`: Tentativas restantes
  - `X-RateLimit-Reset`: Timestamp de reset

## Testando a Segurança

1. Tente enviar o formulário sem preencher campos obrigatórios
2. Tente enviar sem completar o reCAPTCHA
3. Tente enviar múltiplas vezes rapidamente (rate limiting)
4. Verifique se o email é recebido corretamente
5. Teste o redirecionamento para WhatsApp

## Monitoramento

Monitore os logs do Netlify Functions para:
- Tentativas de envio suspeitas
- Erros de validação
- Ativações de rate limiting
- Problemas de envio de email
