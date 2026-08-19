// ========================================
// SportMax - Loja Esportiva Profissional
// localStorage como banco de dados
// ========================================

let produtos = JSON.parse(localStorage.getItem('sportmax_produtos')) || [];
let clientes = JSON.parse(localStorage.getItem('sportmax_clientes')) || [];
let vendas = JSON.parse(localStorage.getItem('sportmax_vendas')) || [];
let carrinho = JSON.parse(localStorage.getItem('sportmax_carrinho')) || [];

// ---------- Dados Iniciais (mais produtos) ----------
function carregarDadosIniciais() {
    if (produtos.length === 0) {
        produtos = [
            { id: 1,  nome: 'Bola de Futebol Nike Flight', categoria: 'Futebol', preco: 349.90, estoque: 40, imagem: '', destaque: true },
            { id: 2,  nome: 'Camisa Brasil 2026 Oficial', categoria: 'Futebol', preco: 349.90, estoque: 55, imagem: '', destaque: true },
            { id: 3,  nome: 'Camisa Flamengo 2025/26', categoria: 'Futebol', preco: 299.90, estoque: 38, imagem: '', destaque: false },
            { id: 4,  nome: 'Chuteira Nike Mercurial', categoria: 'Futebol', preco: 599.90, estoque: 22, imagem: '', destaque: true },
            { id: 5,  nome: 'Tênis Nike Air Zoom Pegasus', categoria: 'Corrida', preco: 699.90, estoque: 30, imagem: '', destaque: true },
            { id: 6,  nome: 'Tênis Adidas Ultraboost 23', categoria: 'Corrida', preco: 899.90, estoque: 18, imagem: '', destaque: true },
            { id: 7,  nome: 'Tênis Asics Gel-Nimbus 25', categoria: 'Corrida', preco: 799.90, estoque: 25, imagem: '', destaque: false },
            { id: 8,  nome: 'Shorts Nike Dri-FIT', categoria: 'Corrida', preco: 129.90, estoque: 60, imagem: '', destaque: false },
            { id: 9,  nome: 'Halteres Ajustáveis 20kg', categoria: 'Fitness', preco: 449.90, estoque: 15, imagem: '', destaque: true },
            { id: 10, nome: 'Colchonete Yoga Premium', categoria: 'Fitness', preco: 89.90, estoque: 70, imagem: '', destaque: false },
            { id: 11, nome: 'Kit Elásticos de Resistência', categoria: 'Fitness', preco: 79.90, estoque: 45, imagem: '', destaque: false },
            { id: 12, nome: 'Garrafa Térmica 1L Sport', categoria: 'Fitness', preco: 69.90, estoque: 80, imagem: '', destaque: false },
            { id: 13, nome: 'Bola de Basquete Spalding NBA', categoria: 'Basquete', preco: 299.90, estoque: 28, imagem: '', destaque: true },
            { id: 14, nome: 'Tênis Nike LeBron XXI', categoria: 'Basquete', preco: 999.90, estoque: 12, imagem: '', destaque: true },
            { id: 15, nome: 'Regata Nike Dri-FIT Basketball', categoria: 'Basquete', preco: 149.90, estoque: 35, imagem: '', destaque: false },
            { id: 16, nome: 'Raquete Wilson Pro Staff', categoria: 'Tênis', preco: 899.90, estoque: 10, imagem: '', destaque: true },
            { id: 17, nome: 'Bola de Tênis Wilson Championship', categoria: 'Tênis', preco: 49.90, estoque: 100, imagem: '', destaque: false },
            { id: 18, nome: 'Óculos de Natação Speedo', categoria: 'Natação', preco: 99.90, estoque: 50, imagem: '', destaque: false },
            { id: 19, nome: 'Touca de Natação Silicone', categoria: 'Natação', preco: 39.90, estoque: 65, imagem: '', destaque: false },
            { id: 20, nome: 'Maiô Speedo Competição', categoria: 'Natação', preco: 249.90, estoque: 20, imagem: '', destaque: false },
            { id: 21, nome: 'Capacete Ciclismo Giro', categoria: 'Ciclismo', preco: 399.90, estoque: 18, imagem: '', destaque: false },
            { id: 22, nome: 'Luvas de Ciclismo Pearl Izumi', categoria: 'Ciclismo', preco: 119.90, estoque: 32, imagem: '', destaque: false },
            { id: 23, nome: 'Camisa Ciclismo Manga Longa', categoria: 'Ciclismo', preco: 189.90, estoque: 24, imagem: '', destaque: false },
            { id: 24, nome: 'Meião Futebol Nike Squad', categoria: 'Futebol', preco: 59.90, estoque: 90, imagem: '', destaque: false }
        ];
        salvarDados();
    }

    if (clientes.length === 0) {
        clientes = [
            { id: 1, nome: 'João Silva', email: 'joao.silva@email.com', telefone: '(11) 99999-1111', cidade: 'São Paulo' },
            { id: 2, nome: 'Maria Santos', email: 'maria.santos@email.com', telefone: '(21) 98888-2222', cidade: 'Rio de Janeiro' },
            { id: 3, nome: 'Pedro Oliveira', email: 'pedro.oli@email.com', telefone: '(31) 97777-3333', cidade: 'Belo Horizonte' },
            { id: 4, nome: 'Ana Costa', email: 'ana.costa@email.com', telefone: '(41) 96666-4444', cidade: 'Curitiba' },
            { id: 5, nome: 'Lucas Ferreira', email: 'lucas.f@email.com', telefone: '(51) 95555-5555', cidade: 'Porto Alegre' }
        ];
        salvarDados();
    }
}

function salvarDados() {
    localStorage.setItem('sportmax_produtos', JSON.stringify(produtos));
    localStorage.setItem('sportmax_clientes', JSON.stringify(clientes));
    localStorage.setItem('sportmax_vendas', JSON.stringify(vendas));
    localStorage.setItem('sportmax_carrinho', JSON.stringify(carrinho));
}

// ---------- Helpers ----------
function formatarMoeda(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
}

function getIconeCategoria(cat) {
    const map = {
        'Futebol': 'fa-futbol',
        'Corrida': 'fa-running',
        'Fitness': 'fa-dumbbell',
        'Basquete': 'fa-basketball-ball',
        'Tênis': 'fa-table-tennis',
        'Natação': 'fa-swimmer',
        'Ciclismo': 'fa-bicycle',
        'Outros': 'fa-box'
    };
    return map[cat] || 'fa-box';
}

// ---------- CARRINHO ----------
function atualizarCarrinhoUI() {
    const count = carrinho.reduce((s, i) => s + i.quantidade, 0);
    document.querySelectorAll('#cartCount, .cart-count').forEach(el => {
        if (el) el.textContent = count;
    });
}

function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id == produtoId);
    if (!produto) return;

    if (produto.estoque <= 0) {
        alert('Produto esgotado!');
        return;
    }

    const item = carrinho.find(i => i.produtoId == produtoId);
    if (item) {
        if (item.quantidade >= produto.estoque) {
            alert('Quantidade máxima em estoque atingida!');
            return;
        }
        item.quantidade++;
    } else {
        carrinho.push({
            produtoId: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            categoria: produto.categoria,
            quantidade: 1
        });
    }

    salvarDados();
    atualizarCarrinhoUI();

    // Feedback visual
    const btn = event?.target?.closest('button');
    if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Adicionado';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
        }, 1200);
    }
}

function alterarQtdCarrinho(index, delta) {
    const item = carrinho[index];
    const produto = produtos.find(p => p.id == item.produtoId);
    const novaQtd = item.quantidade + delta;

    if (novaQtd <= 0) {
        carrinho.splice(index, 1);
    } else if (produto && novaQtd > produto.estoque) {
        alert('Estoque insuficiente!');
        return;
    } else {
        item.quantidade = novaQtd;
    }

    salvarDados();
    atualizarCarrinhoUI();
    renderCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarDados();
    atualizarCarrinhoUI();
    renderCarrinho();
}

function renderCarrinho() {
    const itemsEl = document.getElementById('cartItems');
    const summaryEl = document.getElementById('cartSummary');
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
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-img"><i class="fas ${getIconeCategoria(item.categoria)}"></i></div>
            <div class="cart-item-info">
                <h4>${item.nome}</h4>
                <div class="price">${formatarMoeda(item.preco)}</div>
            </div>
            <div class="cart-item-qty">
                <button onclick="alterarQtdCarrinho(${i}, -1)">−</button>
                <span>${item.quantidade}</span>
                <button onclick="alterarQtdCarrinho(${i}, 1)">+</button>
            </div>
            <div style="font-weight:700;min-width:90px;text-align:right;">${formatarMoeda(sub)}</div>
            <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${i})"><i class="fas fa-trash"></i></button>
        `;
        itemsEl.appendChild(div);
    });

    const frete = subtotal >= 299 ? 0 : 19.90;
    const total = subtotal + frete;

    document.getElementById('subtotal').textContent = formatarMoeda(subtotal);
    document.getElementById('frete').textContent = frete === 0 ? 'Grátis' : formatarMoeda(frete);
    document.getElementById('totalCarrinho').textContent = formatarMoeda(total);
}

function carregarClientesCheckout() {
    const select = document.getElementById('clienteCheckout');
    if (!select) return;
    select.innerHTML = '<option value="">Selecione o cliente...</option>';
    clientes.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.nome;
        select.appendChild(opt);
    });
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Carrinho vazio!');
        return;
    }

    const clienteId = document.getElementById('clienteCheckout')?.value;
    if (!clienteId) {
        alert('Selecione um cliente para finalizar a compra.');
        return;
    }

    // Baixa estoque
    for (const item of carrinho) {
        const prod = produtos.find(p => p.id == item.produtoId);
        if (!prod || prod.estoque < item.quantidade) {
            alert(`Estoque insuficiente para: ${item.nome}`);
            return;
        }
        prod.estoque -= item.quantidade;
    }

    const subtotal = carrinho.reduce((s, i) => s + i.preco * i.quantidade, 0);
    const frete = subtotal >= 299 ? 0 : 19.90;

    const venda = {
        id: gerarId(),
        clienteId: parseInt(clienteId),
        data: new Date().toISOString(),
        itens: carrinho.map(i => ({ ...i })),
        total: subtotal + frete
    };

    vendas.push(venda);
    carrinho = [];
    salvarDados();
    atualizarCarrinhoUI();

    alert(`✅ Compra finalizada com sucesso!\n\nTotal: ${formatarMoeda(venda.total)}\nObrigado por comprar na SportMax!`);
    window.location.href = 'index.html';
}

// ---------- HOME ----------
function renderCategorias() {
    const grid = document.getElementById('categoriasGrid');
    if (!grid) return;

    const cats = [
        { nome: 'Futebol', icon: 'fa-futbol' },
        { nome: 'Corrida', icon: 'fa-running' },
        { nome: 'Fitness', icon: 'fa-dumbbell' },
        { nome: 'Basquete', icon: 'fa-basketball-ball' },
        { nome: 'Tênis', icon: 'fa-table-tennis' },
        { nome: 'Natação', icon: 'fa-swimmer' },
        { nome: 'Ciclismo', icon: 'fa-bicycle' }
    ];

    grid.innerHTML = cats.map(c => {
        const qtd = produtos.filter(p => p.categoria === c.nome).length;
        return `
            <a href="produtos.html?cat=${c.nome}" class="category-card">
                <i class="fas ${c.icon}"></i>
                <h4>${c.nome}</h4>
                <span>${qtd} produtos</span>
            </a>`;
    }).join('');
}

function renderDestaques() {
    const grid = document.getElementById('destaquesGrid');
    if (!grid) return;

    const destaques = produtos.filter(p => p.destaque).slice(0, 8);
    grid.innerHTML = destaques.map(p => criarCardProduto(p)).join('');
}

function criarCardProduto(p) {
    const esgotado = p.estoque <= 0;
    const badge = p.destaque ? '<span class="product-badge novo">Destaque</span>' : '';

    return `
        <div class="product-card">
            <div class="product-img">
                ${badge}
                ${p.imagem
                    ? `<img src="${p.imagem}" alt="${p.nome}">`
                    : `<i class="fas ${getIconeCategoria(p.categoria)} placeholder-icon"></i>`}
            </div>
            <div class="product-body">
                <div class="product-cat">${p.categoria}</div>
                <div class="product-name">${p.nome}</div>
                <div class="product-price">${formatarMoeda(p.preco)}</div>
                <div class="product-actions">
                    ${esgotado
                        ? `<button class="btn btn-secondary btn-sm" disabled>Esgotado</button>`
                        : `<button class="btn btn-primary btn-sm" onclick="adicionarAoCarrinho(${p.id})">
                               <i class="fas fa-shopping-bag"></i> Comprar
                           </button>`}
                </div>
            </div>
        </div>`;
}

// ---------- CATÁLOGO / FILTROS ----------
function filtrarProdutos() {
    const busca = (document.getElementById('buscaProdutos')?.value || '').toLowerCase();
    const cat = document.getElementById('filtroCategoria')?.value || '';
    const ordem = document.getElementById('ordenarPor')?.value || 'nome';
    const precoMax = parseFloat(document.getElementById('filtroPreco')?.value || 1000);

    let lista = produtos.filter(p => {
        const matchBusca = !busca || p.nome.toLowerCase().includes(busca);
        const matchCat = !cat || p.categoria === cat;
        const matchPreco = p.preco <= precoMax;
        return matchBusca && matchCat && matchPreco;
    });

    if (ordem === 'nome') lista.sort((a, b) => a.nome.localeCompare(b.nome));
    else if (ordem === 'preco-asc') lista.sort((a, b) => a.preco - b.preco);
    else if (ordem === 'preco-desc') lista.sort((a, b) => b.preco - a.preco);
    else if (ordem === 'estoque') lista.sort((a, b) => b.estoque - a.estoque);

    const grid = document.getElementById('produtosGrid');
    const empty = document.getElementById('emptyState');
    if (!grid) return;

    if (lista.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.style.display = 'block';
    } else {
        if (empty) empty.style.display = 'none';
        grid.innerHTML = lista.map(p => criarCardProduto(p, true)).join('');
    }
}

function criarCardProduto(p, admin = false) {
    const esgotado = p.estoque <= 0;
    const badge = p.destaque ? '<span class="product-badge novo">Destaque</span>' : (esgotado ? '<span class="product-badge">Esgotado</span>' : '');

    let acoes = esgotado
        ? `<button class="btn btn-secondary btn-sm" disabled>Esgotado</button>`
        : `<button class="btn btn-primary btn-sm" onclick="adicionarAoCarrinho(${p.id})">
               <i class="fas fa-shopping-bag"></i> Comprar
           </button>`;

    if (admin) {
        acoes += `
            <button class="btn btn-secondary btn-sm" onclick="editarProdutoById(${p.id})" title="Editar">
                <i class="fas fa-edit"></i>
            </button>`;
    }

    return `
        <div class="product-card">
            <div class="product-img">
                ${badge}
                ${p.imagem
                    ? `<img src="${p.imagem}" alt="${p.nome}">`
                    : `<i class="fas ${getIconeCategoria(p.categoria)} placeholder-icon"></i>`}
            </div>
            <div class="product-body">
                <div class="product-cat">${p.categoria}</div>
                <div class="product-name">${p.nome}</div>
                <div class="product-price">${formatarMoeda(p.preco)}</div>
                <div class="product-actions">${acoes}</div>
            </div>
        </div>`;
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
    document.getElementById('tituloPagina').textContent = 'Todos os Produtos';
    document.getElementById('subtituloPagina').textContent = 'Encontre o equipamento perfeito para o seu esporte';
    filtrarProdutos();
}

function buscarProdutos(termo) {
    // redireciona para produtos com busca
    if (termo.length > 2) {
        // opcional: filtrar na home
    }
}

// ---------- PRODUTOS ADMIN ----------
function abrirModalProduto() {
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
    const p = produtos.find(x => x.id == id);
    if (!p) return;
    document.getElementById('modalTitle').textContent = 'Editar Produto';
    document.getElementById('produtoId').value = p.id;
    document.getElementById('nomeProduto').value = p.nome;
    document.getElementById('categoriaProduto').value = p.categoria || 'Outros';
    document.getElementById('precoProduto').value = p.preco;
    document.getElementById('estoqueProduto').value = p.estoque;
    document.getElementById('imagemProduto').value = p.imagem || '';
    document.getElementById('modalProduto').classList.add('show');
}

function salvarProduto() {
    const nome = document.getElementById('nomeProduto').value.trim();
    const preco = parseFloat(document.getElementById('precoProduto').value);
    const estoque = parseInt(document.getElementById('estoqueProduto').value);
    const categoria = document.getElementById('categoriaProduto').value;
    const imagem = document.getElementById('imagemProduto').value.trim();

    if (!nome || isNaN(preco) || isNaN(estoque)) {
        alert('Preencha nome, preço e estoque corretamente!');
        return;
    }

    const id = document.getElementById('produtoId').value;
    if (id) {
        const idx = produtos.findIndex(p => p.id == id);
        produtos[idx] = { ...produtos[idx], nome, categoria, preco, estoque, imagem };
    } else {
        produtos.push({ id: gerarId(), nome, categoria, preco, estoque, imagem, destaque: false });
    }

    salvarDados();
    fecharModal('modalProduto');
    filtrarProdutos();
}

// ---------- CLIENTES ----------
function carregarClientes() {
    const tbody = document.querySelector('#tabelaClientes tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (clientes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:2rem;">Nenhum cliente cadastrado.</td></tr>';
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

// ---------- VENDAS HISTÓRICO ----------
function carregarHistoricoVendas() {
    const tbody = document.querySelector('#tabelaVendas tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (vendas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#94a3b8;padding:2rem;">Nenhuma venda registrada.</td></tr>';
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
            <td style="max-width:280px;font-size:0.88rem;">${itensTxt}</td>
            <td><strong>${formatarMoeda(v.total)}</strong></td>`;
        tbody.appendChild(tr);
    });
}

// ---------- RELATÓRIOS ----------
function gerarRelatorios() {
    const faturamento = vendas.reduce((s, v) => s + v.total, 0);
    const totalItens = vendas.reduce((s, v) => s + v.itens.reduce((si, i) => si + i.quantidade, 0), 0);
    const ticketMedio = vendas.length > 0 ? faturamento / vendas.length : 0;

    const resumo = document.getElementById('resumoRelatorio');
    if (resumo) {
        resumo.innerHTML = `
            <div class="stat-card">
                <div class="icon">💰</div>
                <div class="value">${formatarMoeda(faturamento)}</div>
                <div class="label">Faturamento Total</div>
            </div>
            <div class="stat-card">
                <div class="icon">🛒</div>
                <div class="value">${vendas.length}</div>
                <div class="label">Total de Vendas</div>
            </div>
            <div class="stat-card">
                <div class="icon">📦</div>
                <div class="value">${totalItens}</div>
                <div class="label">Itens Vendidos</div>
            </div>
            <div class="stat-card">
                <div class="icon">📊</div>
                <div class="value">${formatarMoeda(ticketMedio)}</div>
                <div class="label">Ticket Médio</div>
            </div>
        `;
    }

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

    gerarGraficos();
}

function gerarGraficos() {
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
                    backgroundColor: ['#0ea5e9','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    const prodMap = {};
    vendas.forEach(v => {
        v.itens.forEach(item => {
            prodMap[item.nome] = (prodMap[item.nome] || 0) + item.quantidade;
        });
    });

    const top = Object.entries(prodMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const ctxProd = document.getElementById('chartProdutos');
    if (ctxProd) {
        new Chart(ctxProd, {
            type: 'bar',
            data: {
                labels: top.length ? top.map(t => t[0].length > 20 ? t[0].slice(0, 18) + '…' : t[0]) : ['Sem dados'],
                datasets: [{
                    label: 'Qtd vendida',
                    data: top.length ? top.map(t => t[1]) : [0],
                    backgroundColor: '#0ea5e9',
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
