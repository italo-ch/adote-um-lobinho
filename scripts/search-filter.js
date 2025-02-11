const navList = document.querySelector('.bottom-nav__list')
const searchBar = document.querySelector('#searchName')


document.addEventListener('DOMContentLoaded', (e) =>{
    
    
    let paginaAtual = 1;

    
    
    
    carregarDados().then((lobos) => {
        construirPagina(paginaAtual, lobos)

    });

    searchBar.addEventListener("keyup", (e) => {
        carregarDados().then((lobos) => {
            let filtrado = lobos.filter((elem) =>
                elem.nome.toLowerCase().includes(searchBar.value.toLowerCase())
            );
    
            paginaAtual = 1;
            construirPagina(paginaAtual, filtrado);
            // construirNavButtons(paginaAtual, filtrado);
        });
    });

})

async function carregarDados() {
    try {
        const response = await fetch("../lobinhos.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}

function construirPagina(idPagina, dados){
    const containerLobos = document.querySelector("#lobos-container");
    containerLobos.innerHTML = ''
    let reverse = ''
    for (let i = idPagina * 4 - 4; i < 4 * idPagina; i++) {

        if ((i+1) % 2 == 0){
            reverse = 'reverse'
        }else{
            reverse = ''
        }

        if (i >= dados.length) break;
        containerLobos.innerHTML += `
        <div class="card-example ${reverse}" id='${dados[i].id}'>
                    <div class="image-container">
                        <img src="${dados[i].imagem}">
                    </div>
                    <div class="content-container">
                        <div class="title">
                            <div>
                                <h3>
                                    ${dados[i].nome}
                                </h3>
                                <span>
                                    ${dados[i].idade}
                                </span>
                            </div>
                            <a href="adotar-lobinho.html" class="button" id='btnLobo${dados[i].id}'>
                                Adotar
                            </a>
                        </div>

                        <p class="description">
                            ${dados[i].descricao}
                        </p>
                    </div>
                </div>`
    }

    construirNavButtons(idPagina, dados)
}

function construirNavButtons(idPagina, dados){
    navList.innerHTML = ''
    let rangeMin = 1

    console.log(`dados filtrados: ${dados.length}`)

    if(dados.length <= 4){
        let i = 1
        navList.innerHTML += `<li class="bottom-nav__item"><a class="bottom-nav__link" href="#" id='link${i}'>${i}</a></li>`
        if (i == idPagina){
            const linkAtual = document.querySelector(`#link${i}`)
            linkAtual.style = 'color: var(--red); text-decoration: underline'
        }
    } else{
        if (idPagina != 1){
            navList.innerHTML += `<li class="bottom-nav__item"><a class="bottom-nav__link" href="#" id='i'>&lt;&lt;</a></li>`
        }
    
    
        if (idPagina >3){
            rangeMin = idPagina - 2
            navList.innerHTML += `<li class="bottom-nav__item"><a class="bottom-nav__link" href="#" id='-'>...</a></li>`
        }
    
        let rangeMax = Math.min(rangeMin + 4,Math.ceil(dados.length/4))
    
    
        
        for (let i = rangeMin; i <= rangeMax; i++) {
            navList.innerHTML += `<li class="bottom-nav__item"><a class="bottom-nav__link" href="#" id='link${i}'>${i}</a></li>`
            if (i == idPagina){
                const linkAtual = document.querySelector(`#link${i}`)
                linkAtual.style = 'color: var(--red); text-decoration: underline'
            }
        }
    
        if (rangeMax < Math.ceil(dados.length/4)){
            navList.innerHTML += `<li class="bottom-nav__item"><a class="bottom-nav__link" href="#" id='+'>...</a></li>`
        }
    
        if (idPagina < Math.ceil(dados.length/4)){
            navList.innerHTML += `<li class="bottom-nav__item"><a class="bottom-nav__link" href="#" id='f'>&gt;&gt;</a></li>`
        }
    
    
        const navItems = navList.children
        
        // for (let i = 0; i < navItems.length; i++) {
        //     console.log(navItems[i].firstChild)
        // }

        const navLinks = document.querySelectorAll('.bottom-nav__link')


        for (let i = 0; i < navItems.length; i++) {
            navLinks[i].addEventListener('click', (e)=>{
                e.preventDefault()

                console.log(`clicou no ${e.target.text}`)
                
                if (e.target.id != '+' && e.target.id != '-' && e.target.id != 'i' && e.target.id != 'f'){
                    paginaAtual = parseInt(e.target.text)
                }
    
                if(e.target.id == '+'){
                    paginaAtual = rangeMax + 1
                }
                if(e.target.id == '-'){
                    paginaAtual = rangeMin - 1
                }
                if(e.target.id == 'i'){
                    paginaAtual = 1
                }
                if(e.target.id == 'f'){
                    paginaAtual = Math.ceil(dados.length/4)
                }
    
                carregarDados().then((lobos) => {
                    if (dados.length == lobos.length){
                        construirPagina(paginaAtual, lobos)
                    }else{
                        console.log(dados.length)
                        construirPagina(paginaAtual, dados)
                    }
            
                });
            })
            
        }
    
    



    
    }
}

        // let loboSelecionado = JSON.stringify(lobos[0])
        // localStorage.setItem('loboSelecionado', loboSelecionado)
        // console.log(localStorage.getItem('loboSelecionado'))
        // loboRetornado = JSON.parse(localStorage.getItem('loboSelecionado'))
        // console.log(loboRetornado)