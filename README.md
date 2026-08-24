# ⚡ SportMax — Loja Esportiva

Site profissional de e-commerce esportivo com área de administração.

## 🛒 Funcionalidades da Loja

- **Home** com hero, categorias e produtos em destaque
- **Catálogo** com filtros por categoria, preço e ordenação
- **Carrinho de compras** completo (adicionar, alterar qtd, remover)
- **Frete grátis** acima de R$ 299
- **Checkout** com seleção de cliente e baixa automática de estoque

## 🛠️ Área Admin

- Gestão de **Produtos** (CRUD)
- Gestão de **Clientes**
- **Histórico de Vendas**
- **Relatórios** com gráficos (Chart.js)

## 📦 24 produtos de exemplo

Futebol, Corrida, Fitness, Basquete, Tênis, Natação e Ciclismo.

## 💾 Banco de Dados

Dados salvos no **localStorage** do navegador:
- `sportmax_produtos`
- `sportmax_clientes`
- `sportmax_vendas`
- `sportmax_carrinho`

## 🚀 Como usar

### Opção 1 — GitHub Pages
1. Settings → Pages → Deploy from branch → `main`
2. Acesse: https://tavares-12.github.io/loja-esportiva/

### Opção 2 — GitHub Codespaces
1. No repositório, clique em **Code** → **Codespaces** → **Create codespace on main**
2. Aguarde o ambiente carregar (já vem com Live Server)
3. Abra o arquivo `index.html`
4. Clique com o botão direito → **Open with Live Server**  
   ou no terminal:
   ```bash
   live-server --port=5500
   ```
5. O site abre automaticamente no navegador

### Opção 3 — Local
Abra o arquivo `index.html` diretamente no navegador.

## 📁 Arquivos

```
├── index.html          → Home da loja
├── produtos.html       → Catálogo + Admin produtos
├── carrinho.html       → Carrinho e checkout
├── clientes.html       → Gestão de clientes
├── vendas.html         → Histórico de vendas
├── relatorios.html     → Relatórios e gráficos
├── styles.css
├── script.js
├── .devcontainer/      → Configuração do Codespaces
└── README.md
```

## 🔄 Atualizar no Codespaces

Se o Codespace já estiver aberto e o código no GitHub mudou:

```bash
git pull origin main
```

---

**SportMax** — Performance que você sente.
