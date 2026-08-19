// ========================================
// SportMax Loja Esportiva - Script Principal
// Banco de dados: localStorage
// ========================================

let produtos = JSON.parse(localStorage.getItem('sportmax_produtos')) || [];
let clientes = JSON.parse(localStorage.getItem('sportmax_clientes')) || [];
let vendas = JSON.parse(localStorage.getItem('sportmax_vendas')) || [];
let itensVendaAtual = [];

// ---------- Dados Iniciais ----------
function carregarDadosIniciais() {
    if (produtos.length === 0) {
        produtos = [
            { id: 1, nome: 'Bola de Futebol Oficial', categoria: 'Futebol', preco: 129.90, estoque: 45 },
            { id: 2, nome: 'Camisa Flamengo 2025', categoria: 'Futebol', preco: 249.90, estoque: 28 },
            { id: 3, nome: 'Tênis Nike Air Zoom', categoria: 'Corrida', preco: 499.90, estoque: 15 },
            { id: 4, nome: 'Shorts Adidas Training', categoria: 'Fitness', preco: 89.90, estoque: 60 },
            { id: 5, nome: 'Raquete de Tênis Wilson', categoria: 'Tênis', preco: 349.90, estoque: 12 },
            { id: 6, nome: 'Óculos de Natação Speedo', categoria: 'Natação', preco: 79.90, estoque: 35 },
            { id: 7, nome: 'Bola de Basquete Spalding', categoria: 'Basquete', preco: 159.90, estoque: 22 },
            { id: 8, nome: 'Halter 10kg (par)', categoria: 'Fitness', preco: 119.90, estoque: 18 }
        ];
        salvarDados();
    }
    if (clientes.length === 0) {
        clientes = [
            { id: 1, nome: 'João Silva', email: 'joao.silva@email.com', telefone: '(11) 99999-1111', cidade: 'São Paulo' },
            { id: 2, nome: 'Maria Santos', email: 'maria.santos@email.com', telefone: '(21) 98888-2222', cidade: 'Rio de Janeiro' },
            { id: 3, nome: 'Pedro Oliveira', email: 'pedro.oli@email.com', telefone: '(31) 97777-3333', cidade: 'Belo Horizonte' }
        ];
        salvarDados();
    }
}

function salvarDados() {
    localStorage.setItem('sportmax_produtos', JSON.stringify(produtos));
    localStorage.setItem('sportmax_clientes', JSON.stringify(clientes));
    localStorage.setItem('sportmax_vendas', JSON.stringify(vendas));
}

// ---------- Helpers ----------
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarData(iso) {
    return new Date(iso).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

function gerarId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

function fecharModal(id) {
    document.getElementById(id).classList.remove('show');
}

// ---------- DASHBOARD (index) ----------
function atualizarDashboard() {
    const totalProdutos = produtos.length;
    const totalClientes = clientes.length;
    const totalVendas = vendas.length;
    const faturamento = vendas.reduce((s, v) => s + v.total, 0);
    const estoqueBaixo = produtos.filter(p => p.estoque < 10).length;

    const grid = document.getElementById('dashboard');
    if (!grid) return;

    grid.innerHTML = `
        <div class="stat-card">
            <div class="icon">📦</div>
            <div class="value">${totalProdutos}</div>
            <div class="label">Produtos</div>
        </div>
        <div class="stat-card green">
            <div class="icon">👥</div>
            <div class="value">${totalClientes}</div>
            <div class="label">Clientes</div>
        </div>
        <div class="stat-card purple">
            <div class="icon">💰</div>
            <div class="value">${totalVendas}</div>
            <div class="label">Vendas</div>
        </div>
        <div class="stat-card orange">
            <div class="icon">📈</div>
            <div class="value">${formatarMoeda(faturamento)}</div>
            <div class="label">Faturamento</div>
        </div>
        <div class="stat-card red">
            <div class="icon">⚠️</div>
            <div class="value">${estoqueBaixo}</div>
            <div class="label">Estoque Baixo</div>
        </div>
    `;
}

function carregarUltimasVendas() {
    const el = document.getElementById('ultimasVendas');
    if (!el) return;

    if (vendas.length === 0) {
        el.innerHTML = '<p class="empty">Nenhuma venda registrada ainda.</p>';
        return;
    }

    const recentes = [...vendas].reverse().slice(0, 5);
    let html = `<table>
        <thead><tr><th>Data</th><th>Cliente</th><th>Total</th></tr></thead><tbody>`;

    recentes.forEach(v => {
        const cli = clientes.find(c => c.id == v.clienteId);
        html += `<tr>
            <td>${formatarData(v.data)}</td>
            <td>${cli ? cli.nome : 'Cliente removido'}</td>
            <td><strong>${formatarMoeda(v.total)}</strong></td>
        </tr>`;
    });
    html += '</tbody></table>';
    el.innerHTML = html;
}

// ---------- PRODUTOS ----------
function carregarProdutos() {
    const tbody = document.querySelector('#tabelaProdutos tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (produtos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty">Nenhum produto cadastrado.</td></tr>';
        return;
    }

    produtos.forEach((p, i) => {
        const statusEstoque = p.estoque < 5 ? 'badge-danger' : p.estoque < 15 ? 'badge-warning' : 'badge-success';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td><strong>${p.nome}</strong></td>
            <td>${p.categoria || '-'}</td>
            <td>${formatarMoeda(p.preco)}</td>
            <td><span class="badge ${statusEstoque}">${p.estoque}</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editarProduto(${i})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="excluirProduto(${i})"><i class="fas fa-trash"></i></button>
            </td>`;
        tbody.appendChild(tr);
    });
}

function abrirModalProduto() {
    document.getElementById('modalTitle').textContent = 'Novo Produto';
    document.getElementById('produtoId').value = '';
    document.getElementById('nomeProduto').value = '';
    document.getElementById('categoriaProduto').value = 'Futebol';
    document.getElementById('precoProduto').value = '';
    document.getElementById('estoqueProduto').value = '';
    document.getElementById('modalProduto').classList.add('show');
}

function editarProduto(index) {
    const p = produtos[index];
    document.getElementById('modalTitle').textContent = 'Editar Produto';
    document.getElementById('produtoId').value = p.id;
    document.getElementById('nomeProduto').value = p.nome;
    document.getElementById('categoriaProduto').value = p.categoria || 'Outros';
    document.getElementById('precoProduto').value = p.preco;
    document.getElementById('estoqueProduto').value = p.estoque;
    document.getElementById('modalProduto').classList.add('show');
}

function salvarProduto() {
    const nome = document.getElementById('nomeProduto').value.trim();
    const preco = parseFloat(document.getElementById('precoProduto').value);
    const estoque = parseInt(document.getElementById('estoqueProduto').value);
    const categoria = document.getElementById('categoriaProduto').value;

    if (!nome || isNaN(preco) || isNaN(estoque)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const id = document.getElementById('produtoId').value;
    if (id) {
        const idx = produtos.findIndex(p => p.id == id);
        produtos[idx] = { id: parseInt(id), nome, categoria, preco, estoque };
    } else {
        produtos.push({ id: gerarId(), nome, categoria, preco, estoque });
    }

    salvarDados();
    fecharModal('modalProduto');
    carregarProdutos();
}

function excluirProduto(index) {
    if (confirm(`Excluir o produto "${produtos[index].nome}"?`)) {
        produtos.splice(index, 1);
        salvarDados();
        carregarProdutos();
    }
}

// ---------- CLIENTES ----------
function carregarClientes() {
    const tbody = document.querySelector('#tabelaClientes tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (clientes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty">Nenhum cliente cadastrado.</td></tr>';
        return;
    }

    clientes.forEach((c, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.id}</td>
            <td><strong>${c.nome}</strong></td>
            <td>${c.email}</td>
            <td>${c.telefone || '-'}</td>
            <td>${c.cidade || '-'}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editarCliente(${i})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="excluirCliente(${i})"><i class="fas fa-trash"></i></button>
            </td>`;
        tbody.appendChild(tr);
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

function salvarCliente() {
    const nome = document.getElementById('nomeCliente').value.trim();
    const email = document.getElementById('emailCliente').value.trim();
    const telefone = document.getElementById('telefoneCliente').value.trim();
    const cidade = document.getElementById('cidadeCliente').value.trim();

    if (!nome || !email) {
        alert('Nome e email são obrigatórios!');
        return;
    }

    const id = document.getElementById('clienteId').value;
    if (id) {
        const idx = clientes.findIndex(c => c.id == id);
        clientes[idx] = { id: parseInt(id), nome, email, telefone, cidade };
    } else {
        clientes.push({ id: gerarId(), nome, email, telefone, cidade });
    }

    salvarDados();
    fecharModal('modalCliente');
    carregarClientes();
}

function excluirCliente(index) {
    if (confirm(`Excluir o cliente "${clientes[index].nome}"?`)) {
        clientes.splice(index, 1);
        salvarDados();
        carregarClientes();
    }
}

// ---------- VENDAS ----------
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

function carregarProdutosSelect() {
    const select = document.getElementById('produtoVenda');
    if (!select) return;
    select.innerHTML = '<option value="">Selecione um produto</option>';
    produtos.filter(p => p.estoque > 0).forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.nome} - ${formatarMoeda(p.preco)} (Est: ${p.estoque})`;
        select.appendChild(opt);
    });
}

function adicionarItemVenda() {
    const prodId = document.getElementById('produtoVenda').value;
    const qtd = parseInt(document.getElementById('qtdVenda').value) || 1;

    if (!prodId) {
        alert('Selecione um produto!');
        return;
    }

    const produto = produtos.find(p => p.id == prodId);
    if (!produto) return;

    if (qtd > produto.estoque) {
        alert(`Estoque insuficiente! Disponível: ${produto.estoque}`);
        return;
    }

    // Verifica se já existe no carrinho
    const existente = itensVendaAtual.find(i => i.produtoId == prodId);
    if (existente) {
        if (existente.quantidade + qtd > produto.estoque) {
            alert(`Estoque insuficiente! Disponível: ${produto.estoque}`);
            return;
        }
        existente.quantidade += qtd;
    } else {
        itensVendaAtual.push({
            produtoId: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: qtd
        });
    }

    document.getElementById('qtdVenda').value = 1;
    atualizarTabelaItens();
}

function removerItemVenda(index) {
    itensVendaAtual.splice(index, 1);
    atualizarTabelaItens();
}

function atualizarTabelaItens() {
    const tbody = document.querySelector('#tabelaItensVenda tbody');
    const totalEl = document.getElementById('totalVenda');
    if (!tbody) return;

    tbody.innerHTML = '';
    let total = 0;

    if (itensVendaAtual.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty">Nenhum item adicionado</td></tr>';
    } else {
        itensVendaAtual.forEach((item, i) => {
            const sub = item.preco * item.quantidade;
            total += sub;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${formatarMoeda(item.preco)}</td>
                <td>${item.quantidade}</td>
                <td><strong>${formatarMoeda(sub)}</strong></td>
                <td><button class="btn btn-danger btn-sm" onclick="removerItemVenda(${i})"><i class="fas fa-times"></i></button></td>`;
            tbody.appendChild(tr);
        });
    }

    if (totalEl) totalEl.textContent = formatarMoeda(total);
}

function finalizarVenda() {
    const clienteId = document.getElementById('clienteVenda').value;

    if (!clienteId) {
        alert('Selecione um cliente!');
        return;
    }
    if (itensVendaAtual.length === 0) {
        alert('Adicione pelo menos um item!');
        return;
    }

    // Baixa estoque
    for (const item of itensVendaAtual) {
        const prod = produtos.find(p => p.id == item.produtoId);
        if (prod) {
            if (prod.estoque < item.quantidade) {
                alert(`Estoque insuficiente para ${item.nome}`);
                return;
            }
            prod.estoque -= item.quantidade;
        }
    }

    const total = itensVendaAtual.reduce((s, i) => s + i.preco * i.quantidade, 0);

    const venda = {
        id: gerarId(),
        clienteId: parseInt(clienteId),
        data: new Date().toISOString(),
        itens: [...itensVendaAtual],
        total
    };

    vendas.push(venda);
    salvarDados();

    alert(`✅ Venda finalizada com sucesso!\nTotal: ${formatarMoeda(total)}`);

    // Limpa
    itensVendaAtual = [];
    document.getElementById('clienteVenda').value = '';
    document.getElementById('produtoVenda').value = '';
    document.getElementById('qtdVenda').value = 1;
    atualizarTabelaItens();
    carregarProdutosSelect();
    carregarHistoricoVendas();
}

function carregarHistoricoVendas() {
    const tbody = document.querySelector('#tabelaVendas tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (vendas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty">Nenhuma venda registrada.</td></tr>';
        return;
    }

    [...vendas].reverse().forEach(v => {
        const cli = clientes.find(c => c.id == v.clienteId);
        const itensTxt = v.itens.map(i => `${i.nome} (x${i.quantidade})`).join(', ');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${v.id}</td>
            <td>${formatarData(v.data)}</td>
            <td>${cli ? cli.nome : 'Cliente removido'}</td>
            <td style="max-width:250px;font-size:0.9rem">${itensTxt}</td>
            <td><strong>${formatarMoeda(v.total)}</strong></td>`;
        tbody.appendChild(tr);
    });
}

// ---------- RELATÓRIOS ----------
function gerarRelatorios() {
    const faturamento = vendas.reduce((s, v) => s + v.total, 0);
    const totalItensVendidos = vendas.reduce((s, v) => s + v.itens.reduce((si, i) => si + i.quantidade, 0), 0);
    const ticketMedio = vendas.length > 0 ? faturamento / vendas.length : 0;

    const resumo = document.getElementById('resumoRelatorio');
    if (resumo) {
        resumo.innerHTML = `
            <div class="stat-card green">
                <div class="icon">💰</div>
                <div class="value">${formatarMoeda(faturamento)}</div>
                <div class="label">Faturamento Total</div>
            </div>
            <div class="stat-card">
                <div class="icon">🛒</div>
                <div class="value">${vendas.length}</div>
                <div class="label">Total de Vendas</div>
            </div>
            <div class="stat-card purple">
                <div class="icon">📦</div>
                <div class="value">${totalItensVendidos}</div>
                <div class="label">Itens Vendidos</div>
            </div>
            <div class="stat-card orange">
                <div class="icon">📊</div>
                <div class="value">${formatarMoeda(ticketMedio)}</div>
                <div class="label">Ticket Médio</div>
            </div>
        `;
    }

    // Tabela de estoque
    const tbodyEstoque = document.querySelector('#tabelaEstoque tbody');
    if (tbodyEstoque) {
        tbodyEstoque.innerHTML = '';
        produtos.forEach(p => {
            let status, badge;
            if (p.estoque === 0) { status = 'Esgotado'; badge = 'badge-danger'; }
            else if (p.estoque < 10) { status = 'Baixo'; badge = 'badge-warning'; }
            else { status = 'OK'; badge = 'badge-success'; }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.nome}</td>
                <td>${p.categoria || '-'}</td>
                <td>${p.estoque}</td>
                <td><span class="badge ${badge}">${status}</span></td>`;
            tbodyEstoque.appendChild(tr);
        });
    }

    // Gráficos
    gerarGraficos();
}

function gerarGraficos() {
    // Vendas por categoria
    const catMap = {};
    vendas.forEach(v => {
        v.itens.forEach(item => {
            const prod = produtos.find(p => p.id == item.produtoId);
            const cat = prod ? (prod.categoria || 'Outros') : 'Outros';
            catMap[cat] = (catMap[cat] || 0) + (item.preco * item.quantidade);
        });
    });

    const ctxCat = document.getElementById('chartCategorias');
    if (ctxCat) {
        new Chart(ctxCat, {
            type: 'doughnut',
            data: {
                labels: Object.keys(catMap).length ? Object.keys(catMap) : ['Sem dados'],
                datasets: [{
                    data: Object.keys(catMap).length ? Object.values(catMap) : [1],
                    backgroundColor: ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Top produtos
    const prodMap = {};
    vendas.forEach(v => {
        v.itens.forEach(item => {
            prodMap[item.nome] = (prodMap[item.nome] || 0) + item.quantidade;
        });
    });

    const top = Object.entries(prodMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const ctxProd = document.getElementById('chartProdutos');
    if (ctxProd) {
        new Chart(ctxProd, {
            type: 'bar',
            data: {
                labels: top.length ? top.map(t => t[0]) : ['Sem dados'],
                datasets: [{
                    label: 'Quantidade vendida',
                    data: top.length ? top.map(t => t[1]) : [0],
                    backgroundColor: '#3b82f6',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
            }
        });
    }
}

// Fecha modal ao clicar fora
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});
