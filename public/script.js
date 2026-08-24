// SportMax - Frontend com API + autenticação
const API = '/api';
let produtos = [];
let clientes = [];
let vendas = [];
let carrinho = JSON.parse(localStorage.getItem('sportmax_carrinho') || '[]');

// ---------- AUTENTICAÇÃO ----------
function getSessao() {
  return JSON.parse(localStorage.getItem('sportmax_sessao') || 'null');
}

function isAdmin() {
  const s = getSessao();
  return s && s.tipo === 'admin';
}

function isLogado() {
  const s = getSessao();
  return s && s.tipo;
}

function exigirLogin() {
  // Páginas públicas de auth
  const path = window.location.pathname;
  if (path.endsWith('login.html') || path.endsWith('cadastro.html')) return;

  if (!isLogado()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function exigirAdmin() {
  if (!exigirLogin()) return false;
  if (!isAdmin()) {
    alert('Acesso restrito ao administrador.');
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

function sair() {
  localStorage.removeItem('sportmax_sessao');
  window.location.href = 'login.html';
}

function atualizarHeaderAuth() {
  const s = getSessao();
  const el = document.getElementById('userInfo');
  if (el && s) {
    el.innerHTML = `<i class="fas fa-user"></i> ${s.nome} (${s.tipo === 'admin' ? 'Admin' : 'Comprador'})`;
  }
  // Esconde links admin para comprador
  document.querySelectorAll('.admin-only').forEach(a => {
    a.style.display = isAdmin() ? '' : 'none';
  });
}

// Roda auth no carregamento de páginas protegidas
(function () {
  const path = window.location.pathname;
  if (!path.endsWith('login.html') && !path.endsWith('cadastro.html')) {
    if (!isLogado()) {
      window.location.href = 'login.html';
    }
  }
})();

async function api(url, options = {}) {
  const res = await fetch(API + url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.erro || 'Erro na requisição');
  }
  return res.json();
}

async function carregarDadosIniciais() {
  try {
    produtos = await api('/produtos');
    clientes = await api('/clientes');
    vendas = await api('/vendas');
  } catch (e) {
    console.warn('API offline:', e.message);
    produtos = []; clientes = []; vendas = [];
  }
}

function salvarCarrinho() {
  localStorage.setItem('sportmax_carrinho', JSON.stringify(carrinho));
}

function formatarMoeda(v) {
  return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function fecharModal(id) {
  document.getElementById(id)?.classList.remove('show');
}
function getIconeCategoria(cat) {
  const map = { Futebol: 'fa-futbol', Corrida: 'fa-running', Fitness: 'fa-dumbbell', Basquete: 'fa-basketball-ball', 'Tênis': 'fa-table-tennis', 'Natação': 'fa-swimmer', Ciclismo: 'fa-bicycle' };
  return map[cat] || 'fa-box';
}

function atualizarCarrinhoUI() {
  const count = carrinho.reduce((s, i) => s + i.quantidade, 0);
  document.querySelectorAll('#cartCount, .cart-count').forEach(el => { if (el) el.textContent = count; });
}

function adicionarAoCarrinho(produtoId) {
  const produto = produtos.find(p => p.id == produtoId);
  if (!produto) return;
  if (produto.estoque <= 0) return alert('Produto esgotado!');
  const item = carrinho.find(i => i.produtoId == produtoId);
  if (item) {
    if (item.quantidade >= produto.estoque) return alert('Estoque máximo atingido!');
    item.quantidade++;
  } else {
    carrinho.push({ produtoId: produto.id, nome: produto.nome, preco: produto.preco, categoria: produto.categoria, quantidade: 1 });
  }
  salvarCarrinho();
  atualizarCarrinhoUI();
  const btn = event?.target?.closest('button');
  if (btn) {
    const o = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Adicionado';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = o; btn.disabled = false; }, 1000);
  }
}

function alterarQtdCarrinho(index, delta) {
  const item = carrinho[index];
  const produto = produtos.find(p => p.id == item.produtoId);
  const nova = item.quantidade + delta;
  if (nova <= 0) carrinho.splice(index, 1);
  else if (produto && nova > produto.estoque) return alert('Estoque insuficiente!');
  else item.quantidade = nova;
  salvarCarrinho();
  atualizarCarrinhoUI();
  renderCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  atualizarCarrinhoUI();
  renderCarrinho();
}

function renderCarrinho() {
  const itemsEl = document.getElementById('cartItems');
  const emptyEl = document.getElementById('emptyCart');
  const layoutEl = document.getElementById('cartLayout');
  if (!itemsEl) return;
  if (carrinho.length === 0) {
    if (layoutEl) layoutEl.style.display = 'none';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }
  if (layoutEl) layoutEl.style.display = 'grid';
  if (emptyEl) emptyEl.style.display = 'none';
  let subtotal = 0;
  itemsEl.innerHTML = '';
  carrinho.forEach((item, i) => {
    const sub = item.preco * item.quantidade;
    subtotal += sub;
    itemsEl.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-img"><i class="fas ${getIconeCategoria(item.categoria)}"></i></div>
        <div class="cart-item-info"><h4>${item.nome}</h4><div class="price">${formatarMoeda(item.preco)}</div></div>
        <div class="cart-item-qty">
          <button onclick="alterarQtdCarrinho(${i},-1)">−</button>
          <span>${item.quantidade}</span>
          <button onclick="alterarQtdCarrinho(${i},1)">+</button>
        </div>
        <div style="font-weight:700;min-width:90px;text-align:right">${formatarMoeda(sub)}</div>
        <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${i})"><i class="fas fa-trash"></i></button>
      </div>`;
  });
  const frete = subtotal >= 299 ? 0 : 19.90;
  document.getElementById('subtotal').textContent = formatarMoeda(subtotal);
  document.getElementById('frete').textContent = frete === 0 ? 'Grátis' : formatarMoeda(frete);
  document.getElementById('totalCarrinho').textContent = formatarMoeda(subtotal + frete);
}

async function carregarClientesCheckout() {
  const select = document.getElementById('clienteCheckout');
  if (!select) return;
  try { clientes = await api('/clientes'); } catch(e) {}
  select.innerHTML = '<option value="">Selecione o cliente...</option>';
  clientes.forEach(c => {
    select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
  });
}

async function finalizarCompra() {
  if (carrinho.length === 0) return alert('Carrinho vazio!');
  const clienteId = document.getElementById('clienteCheckout')?.value;
  if (!clienteId) return alert('Selecione um cliente!');
  try {
    const result = await api('/vendas', {
      method: 'POST',
      body: JSON.stringify({
        cliente_id: parseInt(clienteId),
        itens: carrinho.map(i => ({ produto_id: i.produtoId, quantidade: i.quantidade }))
      })
    });
    carrinho = [];
    salvarCarrinho();
    atualizarCarrinhoUI();
    alert(`✅ Compra finalizada!\nTotal: ${formatarMoeda(result.total)}`);
    window.location.href = 'index.html';
  } catch (e) {
    alert('Erro: ' + e.message);
  }
}

function criarCardProduto(p, admin = false) {
  const esgotado = p.estoque <= 0;
  const badge = p.destaque ? '<span class="product-badge">Destaque</span>' : '';
  let acoes = esgotado
    ? '<button class="btn btn-secondary btn-sm" disabled>Esgotado</button>'
    : `<button class="btn btn-primary btn-sm" onclick="adicionarAoCarrinho(${p.id})"><i class="fas fa-shopping-bag"></i> Comprar</button>`;
  if (admin && isAdmin()) acoes += ` <button class="btn btn-secondary btn-sm" onclick="editarProdutoById(${p.id})"><i class="fas fa-edit"></i></button>`;
  return `<div class="product-card">
    <div class="product-img">${badge}<i class="fas ${getIconeCategoria(p.categoria)} placeholder-icon"></i></div>
    <div class="product-body">
      <div class="product-cat">${p.categoria}</div>
      <div class="product-name">${p.nome}</div>
      <div class="product-price">${formatarMoeda(p.preco)}</div>
      <div class="product-actions">${acoes}</div>
    </div></div>`;
}

function renderCategorias() {
  const grid = document.getElementById('categoriasGrid');
  if (!grid) return;
  const cats = [
    { nome: 'Futebol', icon: 'fa-futbol' }, { nome: 'Corrida', icon: 'fa-running' },
    { nome: 'Fitness', icon: 'fa-dumbbell' }, { nome: 'Basquete', icon: 'fa-basketball-ball' },
    { nome: 'Tênis', icon: 'fa-table-tennis' }, { nome: 'Natação', icon: 'fa-swimmer' },
    { nome: 'Ciclismo', icon: 'fa-bicycle' }
  ];
  grid.innerHTML = cats.map(c => {
    const qtd = produtos.filter(p => p.categoria === c.nome).length;
    return `<a href="produtos.html?cat=${c.nome}" class="category-card"><i class="fas ${c.icon}"></i><h4>${c.nome}</h4><span>${qtd} produtos</span></a>`;
  }).join('');
}

function renderDestaques() {
  const grid = document.getElementById('destaquesGrid');
  if (!grid) return;
  grid.innerHTML = produtos.filter(p => p.destaque).slice(0, 8).map(p => criarCardProduto(p)).join('');
}

async function filtrarProdutos() {
  const busca = document.getElementById('buscaProdutos')?.value || '';
  const cat = document.getElementById('filtroCategoria')?.value || '';
  const ordem = document.getElementById('ordenarPor')?.value || 'nome';
  const precoMax = document.getElementById('filtroPreco')?.value || 1000;
  const params = new URLSearchParams();
  if (busca) params.set('busca', busca);
  if (cat) params.set('categoria', cat);
  if (ordem) params.set('ordem', ordem);
  if (precoMax) params.set('precoMax', precoMax);
  try {
    produtos = await api('/produtos?' + params.toString());
  } catch(e) {}
  const grid = document.getElementById('produtosGrid');
  const empty = document.getElementById('emptyState');
  if (!grid) return;
  if (produtos.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
  } else {
    if (empty) empty.style.display = 'none';
    grid.innerHTML = produtos.map(p => criarCardProduto(p, true)).join('');
  }
}

function atualizarPrecoLabel() {
  const val = document.getElementById('filtroPreco')?.value || 1000;
  const label = document.getElementById('precoMaxLabel');
  if (label) label.textContent = formatarMoeda(val);
}

function limparFiltros() {
  const busca = document.getElementById('buscaProdutos');
  const cat = document.getElementById('filtroCategoria');
  const ordem = document.getElementById('ordenarPor');
  const preco = document.getElementById('filtroPreco');
  if (busca) busca.value = '';
  if (cat) cat.value = '';
  if (ordem) ordem.value = 'nome';
  if (preco) preco.value = 1000;
  atualizarPrecoLabel();
  filtrarProdutos();
}

function abrirModalProduto() {
  if (!isAdmin()) return alert('Apenas administrador!');
  document.getElementById('modalTitle').textContent = 'Novo Produto';
  document.getElementById('produtoId').value = '';
  document.getElementById('nomeProduto').value = '';
  document.getElementById('categoriaProduto').value = 'Futebol';
  document.getElementById('precoProduto').value = '';
  document.getElementById('estoqueProduto').value = '';
  document.getElementById('imagemProduto').value = '';
  document.getElementById('modalProduto').classList.add('show');
}

function editarProdutoById(id) {
  if (!isAdmin()) return;
  const p = produtos.find(x => x.id == id);
  if (!p) return;
  document.getElementById('modalTitle').textContent = 'Editar Produto';
  document.getElementById('produtoId').value = p.id;
  document.getElementById('nomeProduto').value = p.nome;
  document.getElementById('categoriaProduto').value = p.categoria;
  document.getElementById('precoProduto').value = p.preco;
  document.getElementById('estoqueProduto').value = p.estoque;
  document.getElementById('imagemProduto').value = p.imagem || '';
  document.getElementById('modalProduto').classList.add('show');
}

async function salvarProduto() {
  if (!isAdmin()) return;
  const nome = document.getElementById('nomeProduto').value.trim();
  const preco = parseFloat(document.getElementById('precoProduto').value);
  const estoque = parseInt(document.getElementById('estoqueProduto').value);
  const categoria = document.getElementById('categoriaProduto').value;
  const imagem = document.getElementById('imagemProduto').value.trim();
  if (!nome || isNaN(preco) || isNaN(estoque)) return alert('Preencha os campos!');
  const id = document.getElementById('produtoId').value;
  try {
    if (id) await api('/produtos/' + id, { method: 'PUT', body: JSON.stringify({ nome, categoria, preco, estoque, imagem }) });
    else await api('/produtos', { method: 'POST', body: JSON.stringify({ nome, categoria, preco, estoque, imagem }) });
    fecharModal('modalProduto');
    filtrarProdutos();
  } catch (e) { alert(e.message); }
}

async function carregarClientes() {
  const tbody = document.querySelector('#tabelaClientes tbody');
  if (!tbody) return;
  try { clientes = await api('/clientes'); } catch(e) {}
  tbody.innerHTML = '';
  if (!clientes.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:2rem">Nenhum cliente</td></tr>';
    return;
  }
  clientes.forEach((c, i) => {
    tbody.innerHTML += `<tr>
      <td>${c.id}</td><td><strong>${c.nome}</strong></td><td>${c.email}</td>
      <td>${c.telefone||'-'}</td><td>${c.cidade||'-'}</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="editarCliente(${i})"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger btn-sm" onclick="excluirCliente(${c.id})"><i class="fas fa-trash"></i></button>
      </td></tr>`;
  });
}

function abrirModalCliente() {
  document.getElementById('modalClienteTitle').textContent = 'Novo Cliente';
  document.getElementById('clienteId').value = '';
  document.getElementById('nomeCliente').value = '';
  document.getElementById('emailCliente').value = '';
  document.getElementById('telefoneCliente').value = '';
  document.getElementById('cidadeCliente').value = '';
  document.getElementById('modalCliente').classList.add('show');
}

function editarCliente(index) {
  const c = clientes[index];
  document.getElementById('modalClienteTitle').textContent = 'Editar Cliente';
  document.getElementById('clienteId').value = c.id;
  document.getElementById('nomeCliente').value = c.nome;
  document.getElementById('emailCliente').value = c.email;
  document.getElementById('telefoneCliente').value = c.telefone || '';
  document.getElementById('cidadeCliente').value = c.cidade || '';
  document.getElementById('modalCliente').classList.add('show');
}

async function salvarCliente() {
  const nome = document.getElementById('nomeCliente').value.trim();
  const email = document.getElementById('emailCliente').value.trim();
  const telefone = document.getElementById('telefoneCliente').value.trim();
  const cidade = document.getElementById('cidadeCliente').value.trim();
  if (!nome || !email) return alert('Nome e email obrigatórios!');
  const id = document.getElementById('clienteId').value;
  try {
    if (id) await api('/clientes/' + id, { method: 'PUT', body: JSON.stringify({ nome, email, telefone, cidade }) });
    else await api('/clientes', { method: 'POST', body: JSON.stringify({ nome, email, telefone, cidade }) });
    fecharModal('modalCliente');
    carregarClientes();
  } catch (e) { alert(e.message); }
}

async function excluirCliente(id) {
  if (!confirm('Excluir cliente?')) return;
  try {
    await api('/clientes/' + id, { method: 'DELETE' });
    carregarClientes();
  } catch (e) { alert(e.message); }
}

async function carregarHistoricoVendas() {
  const tbody = document.querySelector('#tabelaVendas tbody');
  if (!tbody) return;
  try { vendas = await api('/vendas'); } catch(e) {}
  tbody.innerHTML = '';
  if (!vendas.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#94a3b8;padding:2rem">Nenhuma venda</td></tr>';
    return;
  }
  vendas.forEach(v => {
    const itensTxt = (v.itens || []).map(i => `${i.nome} (x${i.quantidade})`).join(', ');
    tbody.innerHTML += `<tr>
      <td>${v.id}</td><td>${formatarData(v.data)}</td>
      <td>${v.cliente_nome || 'Cliente'}</td>
      <td style="max-width:280px;font-size:0.88rem">${itensTxt}</td>
      <td><strong>${formatarMoeda(v.total)}</strong></td></tr>`;
  });
}

async function gerarRelatorios() {
  try {
    const r = await api('/relatorios');
    const resumo = document.getElementById('resumoRelatorio');
    if (resumo) {
      resumo.innerHTML = `
        <div class="stat-card"><div class="icon">💰</div><div class="value">${formatarMoeda(r.faturamento)}</div><div class="label">Faturamento</div></div>
        <div class="stat-card"><div class="icon">🛒</div><div class="value">${r.totalVendas}</div><div class="label">Vendas</div></div>
        <div class="stat-card"><div class="icon">📦</div><div class="value">${r.itensVendidos}</div><div class="label">Itens</div></div>
        <div class="stat-card"><div class="icon">📊</div><div class="value">${formatarMoeda(r.ticketMedio)}</div><div class="label">Ticket Médio</div></div>`;
    }
    const tbody = document.querySelector('#tabelaEstoque tbody');
    if (tbody) {
      tbody.innerHTML = '';
      (r.estoque || []).forEach(p => {
        let status = p.estoque === 0 ? 'Esgotado' : p.estoque < 10 ? 'Baixo' : 'OK';
        let badge = p.estoque === 0 ? 'badge-danger' : p.estoque < 10 ? 'badge-warning' : 'badge-success';
        tbody.innerHTML += `<tr><td>${p.nome}</td><td>${p.categoria}</td><td>${p.estoque}</td><td><span class="badge ${badge}">${status}</span></td></tr>`;
      });
    }
    if (typeof Chart !== 'undefined') {
      const ctxCat = document.getElementById('chartCategorias');
      if (ctxCat) {
        const cats = r.porCategoria || [];
        new Chart(ctxCat, {
          type: 'doughnut',
          data: {
            labels: cats.length ? cats.map(c => c.categoria) : ['Sem dados'],
            datasets: [{ data: cats.length ? cats.map(c => c.total) : [1], backgroundColor: ['#0ea5e9','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'] }]
          },
          options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
      }
      const ctxProd = document.getElementById('chartProdutos');
      if (ctxProd) {
        const top = r.topProdutos || [];
        new Chart(ctxProd, {
          type: 'bar',
          data: {
            labels: top.length ? top.map(t => t.nome.length > 18 ? t.nome.slice(0,16)+'…' : t.nome) : ['Sem dados'],
            datasets: [{ label: 'Qtd', data: top.length ? top.map(t => t.qtd) : [0], backgroundColor: '#0ea5e9', borderRadius: 6 }]
          },
          options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
        });
      }
    }
  } catch (e) { console.error(e); }
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) e.target.classList.remove('show');
});

document.addEventListener('DOMContentLoaded', () => {
  atualizarHeaderAuth();
  atualizarCarrinhoUI();
});
