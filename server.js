const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Banco de dados SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar no SQLite:', err.message);
  } else {
    console.log('✅ Conectado ao banco SQLite');
    initDatabase();
  }
});

// Criar tabelas e dados iniciais
function initDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      categoria TEXT NOT NULL,
      preco REAL NOT NULL,
      estoque INTEGER NOT NULL DEFAULT 0,
      imagem TEXT DEFAULT '',
      destaque INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT,
      cidade TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS vendas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      data TEXT NOT NULL,
      total REAL NOT NULL,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS venda_itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      venda_id INTEGER NOT NULL,
      produto_id INTEGER NOT NULL,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      quantidade INTEGER NOT NULL,
      FOREIGN KEY (venda_id) REFERENCES vendas(id),
      FOREIGN KEY (produto_id) REFERENCES produtos(id)
    )`);

    db.get('SELECT COUNT(*) as total FROM produtos', (err, row) => {
      if (!err && row.total === 0) {
        const produtos = [
          ['Bola de Futebol Nike Flight', 'Futebol', 349.90, 40, '', 1],
          ['Camisa Brasil 2026 Oficial', 'Futebol', 349.90, 55, '', 1],
          ['Camisa Flamengo 2025/26', 'Futebol', 299.90, 38, '', 0],
          ['Chuteira Nike Mercurial', 'Futebol', 599.90, 22, '', 1],
          ['Tênis Nike Air Zoom Pegasus', 'Corrida', 699.90, 30, '', 1],
          ['Tênis Adidas Ultraboost 23', 'Corrida', 899.90, 18, '', 1],
          ['Tênis Asics Gel-Nimbus 25', 'Corrida', 799.90, 25, '', 0],
          ['Shorts Nike Dri-FIT', 'Corrida', 129.90, 60, '', 0],
          ['Halteres Ajustáveis 20kg', 'Fitness', 449.90, 15, '', 1],
          ['Colchonete Yoga Premium', 'Fitness', 89.90, 70, '', 0],
          ['Kit Elásticos de Resistência', 'Fitness', 79.90, 45, '', 0],
          ['Garrafa Térmica 1L Sport', 'Fitness', 69.90, 80, '', 0],
          ['Bola de Basquete Spalding NBA', 'Basquete', 299.90, 28, '', 1],
          ['Tênis Nike LeBron XXI', 'Basquete', 999.90, 12, '', 1],
          ['Regata Nike Dri-FIT Basketball', 'Basquete', 149.90, 35, '', 0],
          ['Raquete Wilson Pro Staff', 'Tênis', 899.90, 10, '', 1],
          ['Bola de Tênis Wilson Championship', 'Tênis', 49.90, 100, '', 0],
          ['Óculos de Natação Speedo', 'Natação', 99.90, 50, '', 0],
          ['Touca de Natação Silicone', 'Natação', 39.90, 65, '', 0],
          ['Maiô Speedo Competição', 'Natação', 249.90, 20, '', 0],
          ['Capacete Ciclismo Giro', 'Ciclismo', 399.90, 18, '', 0],
          ['Luvas de Ciclismo Pearl Izumi', 'Ciclismo', 119.90, 32, '', 0],
          ['Camisa Ciclismo Manga Longa', 'Ciclismo', 189.90, 24, '', 0],
          ['Meião Futebol Nike Squad', 'Futebol', 59.90, 90, '', 0]
        ];

        const stmt = db.prepare('INSERT INTO produtos (nome, categoria, preco, estoque, imagem, destaque) VALUES (?, ?, ?, ?, ?, ?)');
        produtos.forEach(p => stmt.run(p));
        stmt.finalize();
        console.log('✅ 24 produtos inseridos');
      }
    });

    db.get('SELECT COUNT(*) as total FROM clientes', (err, row) => {
      if (!err && row.total === 0) {
        const clientes = [
          ['João Silva', 'joao.silva@email.com', '(11) 99999-1111', 'São Paulo'],
          ['Maria Santos', 'maria.santos@email.com', '(21) 98888-2222', 'Rio de Janeiro'],
          ['Pedro Oliveira', 'pedro.oli@email.com', '(31) 97777-3333', 'Belo Horizonte'],
          ['Ana Costa', 'ana.costa@email.com', '(41) 96666-4444', 'Curitiba'],
          ['Lucas Ferreira', 'lucas.f@email.com', '(51) 95555-5555', 'Porto Alegre']
        ];
        const stmt = db.prepare('INSERT INTO clientes (nome, email, telefone, cidade) VALUES (?, ?, ?, ?)');
        clientes.forEach(c => stmt.run(c));
        stmt.finalize();
        console.log('✅ 5 clientes inseridos');
      }
    });
  });
}

// ==================== ROTAS API ====================

app.get('/api/produtos', (req, res) => {
  const { categoria, busca, precoMax, ordem } = req.query;
  let sql = 'SELECT * FROM produtos WHERE 1=1';
  const params = [];

  if (categoria) { sql += ' AND categoria = ?'; params.push(categoria); }
  if (busca) { sql += ' AND nome LIKE ?'; params.push(`%${busca}%`); }
  if (precoMax) { sql += ' AND preco <= ?'; params.push(parseFloat(precoMax)); }

  if (ordem === 'preco-asc') sql += ' ORDER BY preco ASC';
  else if (ordem === 'preco-desc') sql += ' ORDER BY preco DESC';
  else if (ordem === 'estoque') sql += ' ORDER BY estoque DESC';
  else sql += ' ORDER BY nome ASC';

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

app.get('/api/produtos/:id', (req, res) => {
  db.get('SELECT * FROM produtos WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(row);
  });
});

app.post('/api/produtos', (req, res) => {
  const { nome, categoria, preco, estoque, imagem, destaque } = req.body;
  if (!nome || preco == null || estoque == null) {
    return res.status(400).json({ erro: 'Nome, preço e estoque são obrigatórios' });
  }
  db.run(
    'INSERT INTO produtos (nome, categoria, preco, estoque, imagem, destaque) VALUES (?, ?, ?, ?, ?, ?)',
    [nome, categoria || 'Outros', preco, estoque, imagem || '', destaque ? 1 : 0],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: this.lastID, nome, categoria, preco, estoque, imagem, destaque });
    }
  );
});

app.put('/api/produtos/:id', (req, res) => {
  const { nome, categoria, preco, estoque, imagem, destaque } = req.body;
  db.run(
    'UPDATE produtos SET nome=?, categoria=?, preco=?, estoque=?, imagem=?, destaque=? WHERE id=?',
    [nome, categoria, preco, estoque, imagem || '', destaque ? 1 : 0, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado' });
      res.json({ mensagem: 'Produto atualizado', id: req.params.id });
    }
  );
});

app.delete('/api/produtos/:id', (req, res) => {
  db.run('DELETE FROM produtos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json({ mensagem: 'Produto excluído' });
  });
});

app.get('/api/clientes', (req, res) => {
  db.all('SELECT * FROM clientes ORDER BY nome', (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

app.post('/api/clientes', (req, res) => {
  const { nome, email, telefone, cidade } = req.body;
  if (!nome || !email) return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  db.run(
    'INSERT INTO clientes (nome, email, telefone, cidade) VALUES (?, ?, ?, ?)',
    [nome, email, telefone || '', cidade || ''],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: this.lastID, nome, email, telefone, cidade });
    }
  );
});

app.put('/api/clientes/:id', (req, res) => {
  const { nome, email, telefone, cidade } = req.body;
  db.run(
    'UPDATE clientes SET nome=?, email=?, telefone=?, cidade=? WHERE id=?',
    [nome, email, telefone || '', cidade || '', req.params.id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: 'Cliente não encontrado' });
      res.json({ mensagem: 'Cliente atualizado' });
    }
  );
});

app.delete('/api/clientes/:id', (req, res) => {
  db.run('DELETE FROM clientes WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente excluído' });
  });
});

app.get('/api/vendas', (req, res) => {
  const sql = `
    SELECT v.*, c.nome as cliente_nome
    FROM vendas v
    LEFT JOIN clientes c ON c.id = v.cliente_id
    ORDER BY v.id DESC
  `;
  db.all(sql, (err, vendas) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (vendas.length === 0) return res.json([]);

    let pending = vendas.length;
    vendas.forEach((v, i) => {
      db.all('SELECT * FROM venda_itens WHERE venda_id = ?', [v.id], (err2, itens) => {
        vendas[i].itens = itens || [];
        pending--;
        if (pending === 0) res.json(vendas);
      });
    });
  });
});

app.post('/api/vendas', (req, res) => {
  const { cliente_id, itens } = req.body;

  if (!cliente_id || !itens || itens.length === 0) {
    return res.status(400).json({ erro: 'Cliente e itens são obrigatórios' });
  }

  let total = 0;
  let checks = 0;
  const erros = [];

  itens.forEach(item => {
    db.get('SELECT * FROM produtos WHERE id = ?', [item.produto_id], (err, prod) => {
      checks++;
      if (!prod) {
        erros.push(`Produto ID ${item.produto_id} não encontrado`);
      } else if (prod.estoque < item.quantidade) {
        erros.push(`Estoque insuficiente: ${prod.nome}`);
      } else {
        total += prod.preco * item.quantidade;
        item.nome = prod.nome;
        item.preco = prod.preco;
      }

      if (checks === itens.length) {
        if (erros.length > 0) {
          return res.status(400).json({ erro: erros.join('; ') });
        }

        const frete = total >= 299 ? 0 : 19.90;
        total += frete;
        const data = new Date().toISOString();

        db.run(
          'INSERT INTO vendas (cliente_id, data, total) VALUES (?, ?, ?)',
          [cliente_id, data, total],
          function (err) {
            if (err) return res.status(500).json({ erro: err.message });

            const vendaId = this.lastID;
            const stmt = db.prepare(
              'INSERT INTO venda_itens (venda_id, produto_id, nome, preco, quantidade) VALUES (?, ?, ?, ?, ?)'
            );

            itens.forEach(item => {
              stmt.run(vendaId, item.produto_id, item.nome, item.preco, item.quantidade);
              db.run('UPDATE produtos SET estoque = estoque - ? WHERE id = ?', [item.quantidade, item.produto_id]);
            });
            stmt.finalize();

            res.status(201).json({
              id: vendaId,
              cliente_id,
              data,
              total,
              itens,
              mensagem: 'Venda realizada com sucesso!'
            });
          }
        );
      }
    });
  });
});

app.get('/api/relatorios', (req, res) => {
  const resultado = {};

  db.get('SELECT COUNT(*) as total, COALESCE(SUM(total),0) as faturamento FROM vendas', (err, row) => {
    resultado.totalVendas = row ? row.total : 0;
    resultado.faturamento = row ? row.faturamento : 0;
    resultado.ticketMedio = resultado.totalVendas > 0 ? resultado.faturamento / resultado.totalVendas : 0;

    db.get('SELECT COALESCE(SUM(quantidade),0) as itens FROM venda_itens', (err2, row2) => {
      resultado.itensVendidos = row2 ? row2.itens : 0;

      db.all(`
        SELECT p.categoria, COALESCE(SUM(vi.preco * vi.quantidade),0) as total
        FROM venda_itens vi
        JOIN produtos p ON p.id = vi.produto_id
        GROUP BY p.categoria
      `, (err3, cats) => {
        resultado.porCategoria = cats || [];

        db.all(`
          SELECT nome, SUM(quantidade) as qtd
          FROM venda_itens
          GROUP BY nome
          ORDER BY qtd DESC
          LIMIT 5
        `, (err4, top) => {
          resultado.topProdutos = top || [];

          db.all('SELECT id, nome, categoria, estoque FROM produtos ORDER BY estoque ASC', (err5, estoque) => {
            resultado.estoque = estoque || [];
            res.json(resultado);
          });
        });
      });
    });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// IMPORTANTE: 0.0.0.0 faz a porta funcionar no Codespaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 SportMax rodando na porta ${PORT}`);
  console.log(`📦 Abra a porta ${PORT} no painel PORTS do Codespaces`);
  console.log(`🌐 API: /api/produtos | /api/clientes | /api/vendas\n`);
});
