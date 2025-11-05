<!-- 5d46016a-032d-4e8c-8aa9-36912b250957 0bf66f37-b90e-45c4-abe7-e5a883d968a3 -->
# Deploy Profissional do Site Institucional Design Visual

## Objetivo

Colocar o site no ar de forma profissional usando Netlify (gratuito) + domínio próprio (R$ 30-50/ano), com formulário funcional e todas as configurações essenciais.

## Fase 1: Preparação do Projeto (30 minutos)

### 1.1 Arquivos Necessários

- Criar `sitemap.xml` na raiz do projeto com todas as páginas
- Criar `netlify.toml` para configurações de deploy
- Criar `404.html` personalizada
- Criar arquivo `.gitignore` básico

### 1.2 Integração do Formulário

- Escolher serviço: EmailJS (gratuito até 200 emails/mês) ou Formspree (gratuito até 50/mês)
- Modificar `assets/js/main.js` linha 130-143 para integrar EmailJS
- Adicionar script do EmailJS no `pages/contato.html` antes de `</body>`
- Configurar template de email no EmailJS

### 1.3 Otimizações Pré-Deploy

- Verificar e atualizar todos os links internos
- Adicionar meta tags Open Graph em todas as páginas
- Criar favicon real (substituir emoji atual)
- Verificar textos e informações de contato

## Fase 2: Registro de Domínio (CONCLUÍDO)

### 2.1 Domínio Registrado

- Domínio registrado: **sourcedesign.com.br**
- Registrador: Registro.br
- Status: Pronto para configuração DNS
- Credenciais: Acessar painel do Registro.br para configurar DNS

## Fase 3: Configuração Netlify (20 minutos)

### 3.1 Criar Conta e Primeiro Deploy

- Acessar netlify.com e criar conta gratuita
- Na dashboard, arrastar pasta do projeto ou usar "Add new site" > "Deploy manually"
- Aguardar deploy automático
- Testar site no domínio temporário (ex: designvisual-xyz.netlify.app)

### 3.2 Configurar Domínio Próprio

- Em "Domain settings" > "Add custom domain"
- Inserir domínio registrado
- Configurar DNS conforme instruções do Netlify:
- Tipo A: apontar para IP do Netlify
- Tipo CNAME: www apontar para domínio Netlify
- Aguardar propagação DNS (15 minutos a 48 horas)
- Habilitar SSL automático (certificado Let's Encrypt)

### 3.3 Configurações Adicionais

- Forçar HTTPS: já vem ativo por padrão
- Configurar redirects se necessário
- Adicionar página 404 customizada

## Fase 4: Integração de Serviços (30 minutos)

### 4.1 EmailJS (Formulário de Contato)

- Criar conta em emailjs.com
- Criar serviço de email (Gmail recomendado)
- Criar template de email com variáveis: {{nome}}, {{email}}, {{telefone}}, {{mensagem}}
- Obter Public Key, Service ID e Template ID
- Adicionar código em `assets/js/main.js` substituindo console.log
- Adicionar script EmailJS em `pages/contato.html`

### 4.2 Google Analytics (Opcional mas Recomendado)

- Criar conta Google Analytics 4
- Obter Measurement ID (G-XXXXXXXXXX)
- Adicionar script em todas as páginas HTML antes de `</head>`

### 4.3 Google Search Console

- Criar conta e verificar propriedade do site
- Enviar sitemap.xml através do Search Console
- Configurar propriedade preferida (com ou sem www)

## Fase 5: Testes e Validação (20 minutos)

### 5.1 Testes Funcionais

- Testar navegação entre todas as páginas
- Testar formulário de contato (enviar teste)
- Testar links externos (WhatsApp, redes sociais)
- Testar responsividade em diferentes dispositivos
- Verificar velocidade no PageSpeed Insights

### 5.2 Validação SEO

- Verificar meta tags com ferramenta online
- Testar estrutura de dados (schema.org)
- Validar HTML em validator.w3.org
- Verificar robots.txt acessível

### 5.3 Testes Cross-Browser

- Chrome, Firefox, Safari, Edge
- Dispositivos móveis

## Fase 6: Documentação e Manutenção (15 minutos)

### 6.1 Criar Documentação

- Atualizar README.md com instruções de deploy
- Documentar credenciais importantes (salvar em local seguro)
- Criar checklist de manutenção mensal

### 6.2 Configurar Backup

- Netlify mantém histórico de deploys automaticamente
- Considerar backup local dos arquivos

## Arquivos a Criar/Modificar

### Novos Arquivos:

- `sitemap.xml` - Mapa do site para SEO
- `netlify.toml` - Configurações do Netlify
- `404.html` - Página de erro personalizada
- `.gitignore` - Arquivos a ignorar

### Arquivos a Modificar:

- `assets/js/main.js` - Integrar EmailJS (linhas 130-143)
- `pages/contato.html` - Adicionar script EmailJS
- Todos os `.html` - Adicionar Google Analytics (opcional)
- `index.html`, `pages/*.html` - Adicionar meta tags Open Graph

## Custo Total Estimado

- Netlify: Gratuito
- Domínio .com.br: R$ 40/ano (Registro.br)
- EmailJS: Gratuito (até 200 emails/mês)
- Google Analytics: Gratuito
- **Total: R$ 40/ano**

## Tempo Total Estimado

- Preparação: 30 min
- Registro domínio: 15 min
- Deploy Netlify: 20 min
- Integrações: 30 min
- Testes: 20 min
- Documentação: 15 min
- **Total: ~2 horas**

## Próximos Passos Após Deploy

1. Monitorar Analytics semanalmente
2. Verificar mensagens do formulário diariamente
3. Manter conteúdo atualizado
4. Criar estratégia de SEO contínua
5. Considerar Google Ads se necessário

### To-dos

- [ ] Criar sitemap.xml com todas as páginas do site
- [ ] Criar netlify.toml com configurações de deploy e redirects
- [ ] Criar página 404.html personalizada
- [ ] Adicionar meta tags Open Graph em todas as páginas HTML
- [ ] Criar conta no EmailJS e configurar serviço de email
- [ ] Criar template de email no EmailJS com variáveis do formulário
- [ ] Integrar EmailJS no assets/js/main.js substituindo console.log
- [ ] Adicionar script EmailJS no pages/contato.html
- [ ] Registrar domínio .com.br no Registro.br ou alternativa
- [ ] Criar conta Netlify e fazer primeiro deploy arrastando pasta
- [ ] Configurar domínio personalizado no Netlify
- [ ] Configurar DNS do domínio apontando para Netlify
- [ ] Verificar SSL automático ativado no Netlify
- [ ] Criar conta Google Analytics 4 e obter Measurement ID
- [ ] Adicionar script Google Analytics em todas as páginas HTML
- [ ] Criar conta Google Search Console e verificar propriedade
- [ ] Enviar sitemap.xml no Google Search Console
- [ ] Testar navegação, formulário e links em todas as páginas
- [ ] Validar HTML, SEO e velocidade no PageSpeed Insights
- [ ] Atualizar README.md com instruções de deploy e manutenção