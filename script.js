// Script completo para Loja Esportiva

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

// Dados iniciais
function carregarDadosIniciais() {
  if (produtos.length === 0) {
    produtos = [
      {id: 1, nome: 'Bola de Futebol', preco: 89.90, estoque: 50},
      {id: 2, nome: 'Camisa Flamengo', preco: 149.90, estoque: 30},
      {id: 3, nome: 'Tênis Nike Running', preco: 299.90, estoque: 20},
      {id: 4, nome: 'Shorts Adidas', preco: 79.90, estoque: 40},
      {id: 5, nome: 'Raquete de Tênis', preco: 189.90, estoque: 15}
    ];
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }
  if (clientes.length === 0) {
    clientes = [
      {id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-1111'},
      {id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '(21) 98888-2222'}
    ];
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }
  if (vendas.length === 0) {
    vendas = [];
    localStorage.setItem('vendas', JSON.stringify(vendas));
  }
}

function salvarDados() {
  localStorage.setItem('produtos', JSON.stringify(produtos));
  localStorage.setItem('clientes', JSON.stringify(clientes));
  localStorage.setItem('vendas', JSON.stringify(vendas));
}

// Produtos
function carregarProdutos() {
  const tbody = document.querySelector('#tabelaProdutos tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  produtos.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${p.id}</td><td>${p.nome}</td><td>R$ ${p.preco.toFixed(2)}</td><td>${p.estoque}</td><td><button onclick="editarProduto(${i})">Editar</button><button onclick="excluirProduto(${i})">Excluir</button></td>`;
    tbody.appendChild(tr);
  });
}

function abrirModalProduto() {
  document.getElementById('modalProduto').style.display = 'block';
  document.getElementById('modalTitle').textContent = 'Novo Produto';
  document.getElementById('produtoId').value = '';
  document.getElementById('nomeProduto').value = '';
  document.getElementById('precoProduto').value = '';
  document.getElementById('estoqueProduto').value = '';
}

function salvarProduto() {
  const id = document.getElementById('produtoId').value;
  const produto = {
    id: id ? parseInt(id) : Date.now(),
    nome: document.getElementById('nomeProduto').value,
    preco: parseFloat(document.getElementById('precoProduto').value),
    estoque: parseInt(document.getElementById('estoqueProduto').value)
  };
  if (id) {
    const index = produtos.findIndex(p => p.id == id);
    produtos[index] = produto;
  } else {
    produtos.push(produto);
  }
  salvarDados();
  fecharModal();
  carregarProdutos();
}

function editarProduto(index) {
  const p = produtos[index];
  document.getElementById('modalProduto').style.display = 'block';
  document.getElementById('modalTitle').textContent = 'Editar Produto';
  document.getElementById('produtoId').value = p.id;
  document.getElementById('nomeProduto').value = p.nome;
  document.getElementById('precoProduto').value = p.preco;
  document.getElementById('estoqueProduto').value = p.estoque;
}

function excluirProduto(index) {
  if (confirm('Excluir produto?')) {
    produtos.splice(index, 1);
    salvarDados();
    carregarProdutos();
  }
}

function fecharModal() {
  document.getElementById('modalProduto').style.display = 'none';
}

// Clientes (já existe no anterior, mantendo)
function carregarClientes() {
  const tbody = document.querySelector('#tabelaClientes tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  clientes.forEach((c, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${c.id}</td><td>${c.nome}</td><td>${c.email}</td><td>${c.telefone}</td><td><button onclick="editarCliente(${i})">Editar</button><button onclick="excluirCliente(${i})">Excluir</button></td>`;
    tbody.appendChild(tr);
  });
}

function abrirModalCliente() {
  document.getElementById('modalCliente').style.display = 'block';
}

function salvarCliente() {
  const id = document.getElementById('clienteId').value;
  const cliente = {
    id: id ? parseInt(id) : Date.now(),
    nome: document.getElementById('nomeCliente').value,
    email: document.getElementById('emailCliente').value,
    telefone: document.getElementById('telefoneCliente').value
  };
  if (id) {
    const index = clientes.findIndex(c => c.id == id);
    clientes[index] = cliente;
  } else {
    clientes.push(cliente);
  }
  salvarDados();
  fecharModalCliente();
  carregarClientes();
}

function editarCliente(index) {
  const c = clientes[index];
  document.getElementById('modalCliente').style.display = 'block';
  document.getElementById('clienteId').value = c.id;
  document.getElementById('nomeCliente').value = c.nome;
  document.getElementById('emailCliente').value = c.email;
  document.getElementById('telefoneCliente').value = c.telefone;
}

function excluirCliente(index) {
  if (confirm('Excluir cliente?')) {
    clientes.splice(index, 1);
    salvarDados();
    carregarClientes();
  }
}

function fecharModalCliente() {
  document.getElementById('modalCliente').style.display = 'none';
}

// Vendas
let itensVendaAtual = [];

function carregarClientesSelect() {
  const select = document.getElementById('clienteVenda');
  if (!select) return;
  select.innerHTML = '<option value="">Selecione um cliente</option>';
  clientes.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.nome;
    select.appendChild(opt);
  });
}

function adicionarItemVenda() {
  // Simplificado - em produção teria modal de seleção
  const produto = produtos[0]; // exemplo
  if (produto && produto.estoque > 0) {
    itensVendaAtual.push({produto: produto, quantidade: 1});
    atualizarTabelaItens();
  }
}

function atualizarTabelaItens() {
  // implementar tabela itens
  console.log('Itens adicionados', itensVendaAtual);
}

function finalizarVenda() {
  if (itensVendaAtual.length === 0) return alert('Adicione itens!');
  const venda = {
    id: Date.now(),
    clienteId: document.getElementById('clienteVenda').value,
    data: new Date().toISOString(),
    itens: itensVendaAtual,
    total: itensVendaAtual.reduce((sum, item) => sum + item.produto.preco * item.quantidade, 0)
  };
  vendas.push(venda);
  salvarDados();
  alert('Venda finalizada com sucesso! Total: R$ ' + venda.total.toFixed(2));
  itensVendaAtual = [];
}

function carregarVendas() {
  const tbody = document.getElementById('tabelaVendas');
  if (!tbody) return;
  // implementar
}

// Inicialização
de window.onload = function() {
  carregarDadosIniciais();
  if (document.getElementById('tabelaProdutos')) carregarProdutos();
  if (document.getElementById('tabelaClientes')) carregarClientes();
  if (document.getElementById('clienteVenda')) carregarClientesSelect();
  console.log('✅ Loja Esportiva carregada com sucesso!');
};
