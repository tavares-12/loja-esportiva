# 🏪 SportMax - Loja Esportiva

Sistema completo de gestão para loja esportiva desenvolvido com **HTML**, **CSS** e **JavaScript**.

## ✨ Funcionalidades

- **Início (Dashboard)** – Resumo de produtos, clientes, vendas, faturamento e estoque baixo
- **Produtos** – CRUD completo (criar, editar, excluir) com categorias e controle de estoque
- **Clientes** – Cadastro completo de clientes
- **Vendas** – Carrinho de compras, seleção de cliente/produto, baixa automática de estoque e histórico
- **Relatórios** – Faturamento, ticket médio, gráficos de categorias e top produtos + status de estoque

## 💾 Banco de Dados

Os dados são salvos no **localStorage** do navegador (persistem mesmo após fechar a aba).

Chaves utilizadas:
- `sportmax_produtos`
- `sportmax_clientes`
- `sportmax_vendas`

## 🚀 Como usar

1. Abra o arquivo `index.html` no navegador **ou**
2. Publique no GitHub Pages:
   - Vá em **Settings → Pages**
   - Source: Deploy from a branch → `main` / root
   - Acesse: `https://tavares-12.github.io/loja-esportiva/`

## 📁 Estrutura de arquivos

```
loja-esportiva/
├── index.html          # Página inicial / Dashboard
├── produtos.html       # Gestão de produtos
├── clientes.html       # Gestão de clientes
├── vendas.html         # Realização e histórico de vendas
├── relatorios.html     # Relatórios e gráficos
├── styles.css          # Estilos responsivos
├── script.js           # Lógica + localStorage
└── README.md
```

## 🛠️ Tecnologias

- HTML5
- CSS3 (Flexbox + Grid + Design moderno)
- JavaScript (Vanilla)
- Chart.js (gráficos)
- Font Awesome (ícones)
- localStorage (persistência de dados)

---

Feito com ❤️ para o projeto de Loja Esportiva.
