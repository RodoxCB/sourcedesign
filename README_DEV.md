# 🛠️ Desenvolvimento Local - Source Design

## Servidor de Desenvolvimento

O projeto agora usa o Netlify CLI para desenvolvimento local, permitindo testar as funções serverless localmente.

### ✅ Instalação Concluída

- ✅ Netlify CLI instalado localmente
- ✅ Dependências da função instaladas (nodemailer)
- ✅ Servidor rodando em http://localhost:8888

### 🚀 Como Usar

1. **Iniciar o servidor:**
   ```bash
   npx netlify dev
   ```

2. **Acessar o site:**
   - Abra http://localhost:8888 no navegador

3. **Testar o formulário:**
   - Vá para a página de contato
   - Preencha e envie o formulário
   - A função será executada localmente

### ⚙️ Configuração das Variáveis de Ambiente

Para testar completamente o formulário, configure as seguintes variáveis:

#### 1. Gmail (Envio de Email)
```bash
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-app-gmail
```

**Como obter a senha de app do Gmail:**
1. Ative verificação em 2 etapas
2. Acesse https://myaccount.google.com/security
3. Clique em "Senhas de app"
4. Selecione "Mail" > "Outro"
5. Use a senha gerada como `EMAIL_PASS`

#### 2. Google reCAPTCHA v2
```bash
RECAPTCHA_SITE_KEY=sua-chave-site
RECAPTCHA_SECRET_KEY=sua-chave-secreta
```

**Como obter as chaves:**
1. Acesse https://www.google.com/recaptcha/admin
2. Clique em "Criar"
3. Selecione "reCAPTCHA v2" > "Caixa de seleção"
4. Adicione seu domínio (localhost para desenvolvimento)
5. Copie as chaves geradas

#### Como configurar:
- Crie um arquivo `.env` na raiz do projeto
- Adicione as variáveis acima
- Reinicie o servidor (`npx netlify dev`)

### 🧪 Testes Disponíveis

- **Formulário completo:** http://localhost:8888/pages/contato.html
- **Página de teste:** http://localhost:8888/test_form.html
- **Função contact:** http://localhost:8888/.netlify/functions/contact

### 🔧 Comandos Úteis

```bash
# Iniciar servidor
npx netlify dev

# Parar servidor
Ctrl+C

# Ver logs da função
# Aparecem automaticamente no terminal quando a função é chamada
```

### 📝 Notas Importantes

- O reCAPTCHA pode não funcionar completamente em localhost sem configuração
- Os emails serão enviados para `contato@sourcedesign.com.br`
- Rate limiting e outras funcionalidades de segurança funcionam localmente
- As funções são executadas no mesmo processo do servidor

### 🐛 Problemas Comuns

**Erro "Cannot find module 'nodemailer'"**
- Execute `npm install` na pasta `netlify/functions/`

**Formulário não envia**
- Verifique se as variáveis de ambiente estão configuradas
- Verifique os logs no terminal para erros

**reCAPTCHA não carrega**
- Adicione `localhost` como domínio permitido no Google reCAPTCHA
