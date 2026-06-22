// Script atualizado com todas as funcionalidades

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

// ... (funções anteriores mantidas)

function salvarDados() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
    localStorage.setItem('clientes', JSON.stringify(clientes));
    localStorage.setItem('vendas', JSON.stringify(vendas));
}

// Clientes
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
    const cliente = {
        id: Date.now(),
        nome: document.getElementById('nomeCliente').value,
        email: document.getElementById('emailCliente').value,
        telefone: document.getElementById('telefoneCliente').value
    };
    clientes.push(cliente);
    salvarDados();
    fecharModalCliente();
    carregarClientes();
}

function fecharModalCliente() {
    document.getElementById('modalCliente').style.display = 'none';
}

// Vendas (simplificado)
let itensVendaAtual = [];

function carregarVendas() {
    // implementar
}

window.onload = () => {
    if (document.getElementById('tabelaProdutos')) carregarProdutos();
    if (document.getElementById('tabelaClientes')) carregarClientes();
    // mais inicializações
};