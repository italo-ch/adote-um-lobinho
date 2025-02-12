const examplesContainer = document.querySelector('.examples-container')
const listaLobos = JSON.parse(localStorage.getItem('lobos'))

document.addEventListener('DOMContentLoaded', ()=>{
    examplesContainer.innerHTML = `
                <div class="card-example" id='${listaLobos[0].id}'>
                    <div class="image-container">
                        <img src="${listaLobos[0].imagem}">
                    </div>
                    <div class="content-container">
                        <div class="title">
                            <div>
                                <h3>
                                    ${listaLobos[0].nome}
                                </h3>
                                <span>
                                    ${listaLobos[0].idade}
                                </span>
                            </div>
                        </div>

                        <p class="description">
                            ${listaLobos[0].descricao}
                        </p>
                    </div>
                </div>
                <div class="card-example reverse" id='${listaLobos[1].id}'>
                    <div class="image-container">
                        <img src="${listaLobos[1].imagem}">
                    </div>
                    <div class="content-container">
                        <div class="title">
                            <div>
                                <h3>
                                    ${listaLobos[1].nome}
                                </h3>
                                <span>
                                    ${listaLobos[1].idade}
                                </span>
                            </div>
                        </div>

                        <p class="description">
                            ${listaLobos[1].descricao}
                        </p>
                    </div>
                </div>
    `
})