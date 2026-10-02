# ☕ Blog do Peão

> **O portal oficial de quem bate o ponto, sobrevive às reuniões e ri pra não chorar.**

O **Blog do Peão** é uma plataforma moderna, leve e divertida de contos e crônicas corporativas, inspirada na rotina real dos escritórios brasileiros: guerras de Tupperware na copa, chamados misteriosos de TI, o horror do Feedback 360 e reuniões que deveriam ter sido um pombo correio.

---

## 🚀 Funcionalidades

- **📖 Leitor de Contos Imersivo:**
  - Barra de progresso de leitura em tempo real no topo da tela.
  - Ajuste de tamanho da fonte (P / M / G).
  - Reações temáticas da firma: ☕ *Pede Café*, 🤡 *Rindo de Nervoso*, 🤦‍♂️ *Vergonha Alheia*, ❤️ *Solidariedade ao Peão*.
  - Rádio Peão (área de comentários anônimos por causo).
  - Download individual de qualquer conto em arquivo **Markdown (.md)** com frontmatter pronto.

- **✍️ Bater Ponto (Editor de Contos Integrado):**
  - Escreva diretamente pelo navegador sem precisar mexer em código.
  - Pré-visualização em tempo real (lado a lado ou abas).
  - Barra de formatação rápida (negrito, itálico, títulos, citações, listas).
  - Gerador divertido de codinomes para o crachá do autor (*ex: "Fiscal de Tupperware", "Mestre do PROCV"*).
  - Cálculo automático de tempo de leitura.

- **📌 Mural da Copa (Micro-causos):**
  - Feed de desabafos e causos rápidos de até 280 caracteres.
  - Botão de curtida/apoio cafeinado.

- **🔍 Busca & Filtros:**
  - Busca instantânea por título, resumo, conteúdo, autor ou categoria.
  - Filtros por setor: *Copa & Café, Reuniões Intermináveis, Gambiarras de TI, RH & Dinâmicas, Hora Extra, Diretoria & Ideias*.

- **🔖 Pasta Secreta (Salvos):**
  - Salve seus contos favoritos para ler no almoço ou no transporte público.

- **🌗 Turno do Dia / Turno da Noite:**
  - Alternância de tema claro/escuro com tipografia serifada de alta legibilidade.

- **💾 Armazenamento & Backup:**
  - Tudo fica salvo no armazenamento local do navegador (LocalStorage).
  - Botão para exportar backup completo de todos os contos em JSON com um clique.

---

## 🛠️ Tecnologias Utilizadas

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Marked](https://marked.js.org/) (renderizador de Markdown)

---

## 🏃 Como Rodar Localmente

1. Abra o terminal na pasta do projeto:
\`\`\`bash
cd C:\Users\adria\.gemini\antigravity\scratch\blog-do-peao
\`\`\`

2. Instale as dependências (caso ainda não tenha feito):
\`\`\`bash
npm install
\`\`\`

3. Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`

4. Abra no seu navegador:
\`\`\`
http://localhost:3000
\`\`\`

---

## 🌐 Como Publicar na Internet Gratuitamente

Você pode colocar o **Blog do Peão** online em 2 minutos em plataformas como a **Vercel** ou **Netlify**:

### Pela Vercel:
1. Suba o código para um repositório no seu GitHub.
2. Acesse [vercel.com](https://vercel.com) e conecte sua conta.
3. Importe o repositório `blog-do-peao`.
4. O build command padrão (`npm run build`) e output directory (`dist`) serão detectados automaticamente.
5. Clique em **Deploy**!
