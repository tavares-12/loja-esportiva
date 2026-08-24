// Auth simples - carregar ANTES de qualquer outra coisa
(function () {
  var path = window.location.pathname || '';
  var page = path.split('/').pop() || '';

  // Páginas livres (sem login)
  if (page === 'login.html' || page === 'cadastro.html' || page === '') {
    // Se estiver na raiz sem estar no login, manda pro login
    if (page === '' && !path.includes('login')) {
      // raiz já serve login no server
    }
    return;
  }

  try {
    var sessao = JSON.parse(localStorage.getItem('sportmax_sessao') || 'null');
    if (!sessao || !sessao.tipo) {
      window.location.replace('login.html');
    }
  } catch (e) {
    window.location.replace('login.html');
  }
})();
