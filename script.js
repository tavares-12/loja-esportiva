// Script principal da Loja Esportiva

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

// Funções comuns
function salvarDados() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
    localStorage.setItem('clientes', JSON.stringify(clientes));
    localStorage.setItem('vendas', JSON.stringify(vendas));
}

function formatarPreco(preco) {
    return 'R$ ' + preco.toFixed(2);
}

// Produtos
function carregarProdutos() {
    const tbody = document.querySelector('#tabelaProdutos tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    produtos.forEach((p, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>${formatarPreco(p.preco)}</td>
            <td>${p.estoque}</td>
            <td>
                <button onclick="editarProduto(${i})">Editar</button>
                <button onclick="excluirProduto(${i})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function abrirModalProduto(id = null) {
    document.getElementById('modalProduto').style.display = 'block';
    if (id !== null) {
        const p = produtos[id];
        document.getElementById('produtoId').value = id;
        document.getElementById('nomeProduto').value = p.nome;
        document.getElementById('precoProduto').value = p.preco;
        document.getElementById('estoqueProduto').value = p.estoque;
        document.getElementById('modalTitle').textContent = 'Editar Produto';
    } else {
        document.getElementById('produtoId').value = '';
        document.getElementById('nomeProduto').value = '';
        document.getElementById('precoProduto').value = '';
        document.getElementById('estoqueProduto').value = '';
        document.getElementById('modalTitle').textContent = 'Novo Produto';
    }
}

function salvarProduto() {
    const id = document.getElementById('produtoId').value;
    const produto = {
        id: Date.now(),
        nome: document.getElementById('nomeProduto').value,
        preco: parseFloat(document.getElementById('precoProduto').value),
        estoque: parseInt(document.getElementById('estoqueProduto').value)
    };
    if (id) {
        produtos[id] = produto;
    } else {
        produtos.push(produto);
    }
    salvarDados();
    fecharModal();
    carregarProdutos();
}

function fecharModal() {
    document.getElementById('modalProduto').style.display = 'none';
}

function editarProduto(i) { abrirModalProduto(i); }
function excluirProduto(i) {
    if (confirm('Excluir produto?')) {
        produtos.splice(i, 1);
        salvarDados();
        carregarProdutos();
    }
}

// Inicialização
window.onload = function() {
    if (document.getElementById('tabelaProdutos')) carregarProdutos();
    // mais páginas
};