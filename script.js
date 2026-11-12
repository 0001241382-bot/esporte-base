document.addEventListener('DOMContentLoaded', function() {
  // 1. Exibir o primeiro nome do atleta corretamente usando [0]
  const nomeAtleta = localStorage.getItem('atleta');
  const linkCadastro = document.getElementById('link-cadastro');
  if (nomeAtleta && linkCadastro) {
    linkCadastro.textContent = '👤 ' + nomeAtleta.split(' ')[0];
    linkCadastro.style.color = '#8dffad';
  }

  // 2. Lógica do Modal e Inscrição na Peneira
  let botaoPeneira = null;

  document.querySelectorAll('.btn-inscrever').forEach(function(btn) {
    btn.addEventListener('click', function() {
      botaoPeneira = btn;
      const clube = btn.getAttribute('data-clube') || 'Não informado';
      document.getElementById('modal-texto-clube').textContent = 'Clube: ' + clube;
      document.getElementById('modalPosicao').style.display = 'flex';
    });
  });

  document.getElementById('btn-cancelar-modal')?.addEventListener('click', function() {
    document.getElementById('modalPosicao').style.display = 'none';
  });

  document.getElementById('btn-confirmar-modal')?.addEventListener('click', function() {
    if (botaoPeneira) {
      const linha = botaoPeneira.closest('tr');
      const vagasEl = linha ? linha.querySelector('.col-vagas') : null;

      if (vagasEl) {
        const num = vagasEl.textContent.trim().split('/');
        const inscritos = parseInt(num[0], 10);
        const total = parseInt(num[1], 10);

        if (inscritos < total) {
          vagasEl.textContent = (inscritos + 1) + '/' + total;
          botaoPeneira.textContent = 'Inscrito ✓';
          botaoPeneira.disabled = true;
          alert('Inscrição confirmada!');
        } else {
          alert('As vagas para este time já estão esgotadas!');
        }
      }
    }
    document.getElementById('modalPosicao').style.display = 'none';
  });
});
