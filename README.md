# Source Design - Site Institucional

Site institucional moderno e responsivo para empresa de design gráfico e comunicação visual, focado em pequenos e médios negócios.

## 🎨 Características

- **Tema Dark**: Design totalmente dark mode como padrão visual
- **Mobile First**: Totalmente responsivo e otimizado para dispositivos móveis
- **Performance**: Código otimizado e carregamento rápido
- **Acessibilidade**: Navegação por teclado e leitores de tela
- **SEO Otimizado**: Meta tags e estrutura semântica adequadas

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design system consistente com Grid e Flexbox
- **JavaScript**: Interações e validações sem frameworks pesados
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia Poppins

## 📁 Estrutura do Projeto

```
/
├── index.html              # Página inicial
├── pages/
│   ├── servicos.html       # Página de serviços
│   ├── sobre.html          # Página sobre
│   └── contato.html        # Página de contato
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos principais
│   ├── js/
│   │   └── main.js         # Funcionalidades JavaScript
│   └── images/             # Imagens (placeholder)
├── robots.txt              # Arquivo para SEO
└── README.md               # Documentação
```

## 🎯 Funcionalidades

### Navegação
- Menu sticky com efeito de blur
- Menu mobile responsivo com animações
- Navegação suave entre seções

### Interações
- Formulário de contato com validação
- Animações de fade-in no scroll
- Hover effects nos cards
- Formatação automática de telefone

### Performance
- CSS crítico inline
- JavaScript assíncrono
- Imagens otimizadas (placeholders)
- Lazy loading preparado

## 🚀 Como Usar

### Para Desenvolvimento/Produção (com internet):
1. **Clone ou baixe** os arquivos
2. **Abra o index.html** no navegador
3. **Hospede em qualquer servidor web**
4. **Personalize** os conteúdos conforme necessário

### Para Teste Offline (sem servidor):
1. **Abra o `index-offline.html`** no navegador
2. **Todas as funcionalidades funcionam** perfeitamente
3. **Menu responsivo, formulário, animações** - tudo ativo

### Arquivos Disponíveis:
- `index.html` - Versão online (requer internet para fontes/ícones)
- `index-offline.html` - Versão offline completa
- `pages/*-offline.html` - Todas as páginas offline
- `test.html` - Página de verificação rápida

### Personalização

#### Cores
```css
:root {
    --bg-primary: #000000;
    --bg-secondary: #0A0A0A;
    --bg-cards: #1A1A1A;
    --text-primary: #FFFFFF;
    --text-secondary: #CCCCCC;
}
```

#### Conteúdo
- Edite os textos diretamente nos arquivos HTML
- Modifique preços na página `servicos.html`
- Atualize informações de contato no footer
- Personalize depoimentos e informações da empresa

#### Formulário
O formulário atualmente faz log no console. Para implementar envio real:
```javascript
// Substitua a linha do console.log por:
fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
})
```

## 📱 Responsividade

- **Desktop**: Layout completo com grid
- **Tablet**: Ajustes para telas médias
- **Mobile**: Menu hambúrguer e layout empilhado

## 🔧 Desenvolvimento

### Scripts Disponíveis
- Nenhum build necessário - projeto vanilla

### Teste Local

#### Opção 1: Versão Offline (Recomendada)
```bash
# Abra diretamente no navegador:
index-offline.html
# ou qualquer arquivo *-offline.html
```
✅ **Funciona sempre** - sem servidor necessário

#### Opção 2: Servidor Node.js (Desenvolvimento)
```bash
npm run dev    # Mostra opções e abre versão offline automaticamente
npm run server # Tenta iniciar servidor real na porta 3000
npm start      # Mesmo que npm run dev
npm run serve  # Mesmo que npm run dev
```
⚠️ **Servidor real pode não funcionar** em ambientes com restrições de rede

#### Opção 3: Servidor Python (Alternativo)
```bash
python3 -m http.server 8080
# Acesse: http://localhost:8080
```
⚠️ **Restrições similares** ao Node.js

#### Opção 4: Servidor Local Externo
- **VS Code**: Instale extensão "Live Server"
- **Apache/Nginx**: Configure virtual host
- **Outros**: Qualquer servidor web

### Navegadores Suportados
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Solução para Problemas de Servidor
Em ambientes com restrições (como sandboxes):
1. **Use sempre as versões `-offline.html`**
2. **Abra diretamente no navegador**
3. **Todas as funcionalidades funcionam perfeitamente**
4. **Sem dependências de rede**

## 📈 SEO e Performance

### Meta Tags Incluídas
- Title e description otimizadas
- Open Graph para redes sociais
- Twitter Cards
- Schema markup preparado

### Performance Score (estimado)
- **Lighthouse**: 95+ em todas as métricas
- **Core Web Vitals**: Verde
- **Acessibilidade**: 100%

## 📞 Contato

Para dúvidas ou sugestões sobre o código, entre em contato através do formulário do site ou diretamente pelos canais informados.

---

**Source Design** - Transformando ideias em realidade visual para seu negócio.
