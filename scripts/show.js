const loboSelecionado = JSON.parse(localStorage.getItem('loboSelecionado'))
const showSection = document.querySelector('.visualiza-lobo')
const listaLobo = JSON.parse(localStorage.getItem('lobos'))

console.log(listaLobo)

try{
    if(loboSelecionado == null){
        throw new Error(`Erro ao buscar loboSelecionado`);
    }

    if(listaLobo == null){
        throw new Error(`Erro ao buscar a lista de Lobos`);
    }
    carregarLobo(loboSelecionado)

}catch(error){
    console.error('Erro ao acessar dado no localStorage:', error);
}

function carregarLobo(lobo){
    showSection.innerHTML = ''
    showSection.innerHTML = `
            <h3 class="title-show">${lobo.nome}</h3>
            <div class="examples-container" id="lobos-container">
                <div class="card-example">
                    <div class="image-container">
                        <img src="${lobo.imagem}">
                        <div class="button-container">
                            <a href="adotar-lobinho.html" class="button button--adocao">
                                Adotar
                            </a>
                            <a href="#" class="button button--exclusao">
                                Excluir
                            </a>
                        </div>
                    </div>
                    <div class="content-container">

                        <p class="description">
                            ${lobo.descricao}
                        </p>
                    </div>
                </div>
            </div>`
    const btnTrash = document.querySelector('.button--exclusao')
    btnTrash.addEventListener('click', (e)=>{
        e.preventDefault()
        let novaLista = excluirLobo(lobo)
        console.log(novaLista)
        localStorage.setItem('lobos', JSON.stringify(novaLista))
        alert('Lobo excluído');
        window.location.replace("lista-de-lobinhos.html");
    })

}

function excluirLobo(loboAExcluir){
    if (!Array.isArray(listaLobo)) {
        console.error("Erro: listaLobo não é um array válido.");
        return [];
    }

    let index = listaLobo.findIndex(x => x.id == loboAExcluir.id);
    
    if (index === -1) {
        console.error("Erro: Lobo não encontrado na lista.");
        return listaLobo;
    }

    listaLobo.splice(index, 1);
    return listaLobo;
}
