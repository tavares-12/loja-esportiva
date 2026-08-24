# ⚡ SportMax — Loja Esportiva

Sistema completo de loja esportiva com **Node.js + Express + SQLite**.

## 🛠️ Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Banco de dados:** SQLite3

## 🚀 Como rodar no Codespaces

1. Abra o Codespace do repositório `loja-esportiva`
2. No terminal, rode **apenas isto**:

```bash
npm install
node server.js
```

3. Clique em **Open in Browser** na porta **3000**

Pronto! O site e a API estarão rodando.

### Comandos que você citou (equivalente)

```bash
node -v                  # ver versão do Node (já vem instalado)
npm install              # instala express, sqlite3 e cors
node server.js           # inicia o servidor
```

> Não precisa de `npm init -y` nem instalar pacote por pacote — o `package.json` já está pronto.

## 📡 API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/produtos` | Listar produtos |
| POST | `/api/produtos` | Criar produto |
| PUT | `/api/produtos/:id` | Editar produto |
| DELETE | `/api/produtos/:id` | Excluir produto |
| GET | `/api/clientes` | Listar clientes |
| POST | `/api/clientes` | Criar cliente |
| GET | `/api/vendas` | Listar vendas |
| POST | `/api/vendas` | Nova venda |
| GET | `/api/relatorios` | Dados de relatório |

## 📁 Estrutura

```
loja-esportiva/
├── server.js              → Backend Express + SQLite
├── package.json           → Dependências
├── database.sqlite        → Criado automaticamente ao rodar
├── public/                → Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── produtos.html
│   ├── carrinho.html
│   ├── clientes.html
│   ├── vendas.html
│   ├── relatorios.html
│   ├── styles.css
│   └── script.js
├── .devcontainer/         → Config Codespaces
└── README.md
```

## 📦 24 produtos de exemplo

Já vêm cadastrados no banco na primeira execução.

---

**SportMax** — Performance que você sente.
