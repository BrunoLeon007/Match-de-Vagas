const vagaForm = document.getElementById('vagaForm');
const listaVagas = document.getElementById('listaVagas');

// Carregar vagas ao abrir a página
document.addEventListener('DOMContentLoaded', exibirVagas);

// Função para adicionar vaga
vagaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const novaVaga = {
        id: Date.now(), // Gera um ID único baseado no tempo
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value
    };

    const vagas = JSON.parse(localStorage.getItem('vagas') || '[]');
    vagas.push(novaVaga);
    localStorage.setItem('vagas', JSON.stringify(vagas));
    
    vagaForm.reset();
    exibirVagas();
});

// Função para exibir as vagas na tela
function exibirVagas() {
    const vagas = JSON.parse(localStorage.getItem('vagas') || '[]');
    listaVagas.innerHTML = '';

    vagas.forEach(vaga => {
        const div = document.createElement('div');
        div.className = 'vaga-card';
        div.innerHTML = `
            <button class="btn-excluir" onclick="excluirVaga(${vaga.id})">Excluir</button>
            <h3>${vaga.titulo}</h3>
            <p>${vaga.descricao}</p>
        `;
        listaVagas.appendChild(div);
    });
}

// Função para excluir a vaga pelo ID
function excluirVaga(id) {
    if (confirm("Deseja realmente excluir esta vaga?")) {
        let vagas = JSON.parse(localStorage.getItem('vagas') || '[]');
        // Filtra as vagas mantendo apenas as que têm ID diferente do excluído
        vagas = vagas.filter(vaga => vaga.id !== id);
        localStorage.setItem('vagas', JSON.stringify(vagas));
        exibirVagas();
    }
}
