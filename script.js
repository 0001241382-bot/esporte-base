const MAX_VAGAS = 26;
let clubeSelecionadoAtual = null;

const dadosPeneiras = {
    masculino: [
        { nome: "Cruzeiro", data: "12 nov 14:45", inscritos: 26 },
        { nome: "Flamengo", data: "12 nov", inscritos: 24 },
        { nome: "Corinthians", data: "17 nov 16:45", inscritos: 26 },
        { nome: "Palmeiras", data: "12 nov 16:45", inscritos: 16 },
        { nome: "Mirassol", data: "14 nov 16:45", inscritos: 10 },
        { nome: "Santos", data: "14 nov 07:15", inscritos: 8 },
        { nome: "Vasco da Gama", data: "13 nov 17:00", inscritos: 12 }
    ],
    feminino: [
        { nome: "Palmeiras", data: "Sem data", inscritos: 20 },
        { nome: "Corinthians", data: "27 nov 22:30", inscritos: 26 },
        { nome: "Santos", data: "Sem data", inscritos: 15 },
        { nome: "Flamengo", data: "30 nov", inscritos: 14 },
        { nome: "Cruzeiro", data: "Sem data", inscritos: 26 },
        { nome: "Vasco da Gama", data: "Sem data", inscritos: 5 },
        { nome: "Mirassol", data: "01 dez 18:25", inscritos: 2 }
    ]
};

function renderizarTabelas() {
    ['masculino', 'feminino'].forEach(genero => {
        const tbody = document.getElementById(`lista-${genero}`);
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        const listaOrdenada = [...dadosPeneiras[genero]].sort((a, b) => b.inscritos - a.inscritos);

        listaOrdenada.forEach((clube, index) => {
            const estaCheio = clube.inscritos >= MAX_VAGAS;
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td class="col-pos">${index + 1}</td>
                <td class="col-clube"><strong>${clube.nome}</strong></td>
                <td class="col-data">${clube.data}</td>
                <td class="col-vagas ${estaCheio ? 'texto-cheio' : 'texto-vago'}">${clube.inscritos}/${MAX_VAGAS}</td>
                <td>
                    <button class="btn-tabela ${estaCheio ? 'bloqueado' : 'liberado'}" 
                            ${estaCheio ? 'disabled' : ''} 
                            data-genero="${genero}" data-clube="${clube.nome}">
                        ${estaCheio ? 'Esgotado' : 'Inscrever'}
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });

    configurarEventosBotoes();
}

function configurarEventosBotoes() {
    document.querySelectorAll('.btn-tabela.liberado').forEach(botao => {
        botao.addEventListener('click', function() {
            const genero = this.getAttribute('data-genero');
            const nomeClube = this.getAttribute('data-clube');
            abrirInscricao(genero, nomeClube);
        });
    });
}

function abrirInscricao(genero, nomeClube) {
    clubeSelecionadoAtual = { genero, nomeClube };
    document.getElementById('modal-texto-clube').innerText = `Inscrição para a peneira do ${nomeClube} (${genero})`;
    document.getElementById('modalPosicao').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalPosicao').style.display = 'none';
    clubeSelecionadoAtual = null;
}

function confirmarInscricao() {
    if (!clubeSelecionadoAtual) return;
    
    const lista = dadosPeneiras[clubeSelecionadoAtual.genero];
    const clube = lista.find(c => c.nome === clubeSelecionadoAtual.nomeClube);
    
    if (clube && clube.inscritos < MAX_VAGAS) {
        clube.inscritos += 1;
        alert(`Inscrição enviada! Você concluiu seu cadastro na peneira do ${clube.nome}.`);
        fecharModal();
        renderizarTabelas();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarTabelas();
    
    document.getElementById('btn-cancelar-modal').addEventListener('click', fecharModal);
    document.getElementById('btn-confirmar-modal').addEventListener('click', confirmarInscricao);
});
