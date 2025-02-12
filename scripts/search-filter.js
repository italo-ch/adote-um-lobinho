const navList = document.querySelector('.bottom-nav__list')
const searchBar = document.querySelector('#searchName')
const checkAdotados = document.querySelector('#adotados')


document.addEventListener('DOMContentLoaded', (e) =>{
    
    
    let paginaAtual = 1;
    let searchAdotados = false;
    
    
    
    
    carregarDados().then((lobos) => {
        construirPagina(paginaAtual, lobos)

    });

    checkAdotados.addEventListener( 'change', function() {
        if(this.checked) {
            searchAdotados = true
        } else {
            searchAdotados = false
        }

        carregarDados().then((lobos) => {
            console.log(searchAdotados)
            let filtrado = lobos.filter((elem) =>{
                if (!searchAdotados){
                    return elem.nome.toLowerCase().includes(searchBar.value.toLowerCase())
                }else{
                    return elem.nome.toLowerCase().includes(searchBar.value.toLowerCase()) && elem.adotado == true
                }
                
            }
                
            );
    
            paginaAtual = 1;
            construirPagina(paginaAtual, filtrado);
            
        });
    });

    searchBar.addEventListener("keyup", (e) => {
        carregarDados().then((lobos) => {
            console.log(searchAdotados)
            let filtrado = lobos.filter((elem) =>{
                if (!searchAdotados){
                    return elem.nome.toLowerCase().includes(searchBar.value.toLowerCase())
                }else{
                    return elem.nome.toLowerCase().includes(searchBar.value.toLowerCase()) && elem.adotado == true
                }
                
            }
                
            );
    
            paginaAtual = 1;
            construirPagina(paginaAtual, filtrado);
            
        });
    });



})

async function carregarDados() {
    try {
        const lobos = localStorage.getItem("lobos");
        if (!lobos) {
            throw new Error("Nenhum dado encontrado no localStorage");
        }
        return JSON.parse(lobos); 
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
                            <a href="show-lobinho.html" class="button btn-lobo" id='btnLobo-${dados[i].id}'>
                                Adotar
                            </a>
                        </div>

                        <p class="description">
                            ${dados[i].descricao}
                        </p>
                    </div>
                </div>`
    }

    let botoes = document.querySelectorAll('.btn-lobo')
    console.log(botoes)
    for (let i = 0; i < botoes.length; i++) {
        let idLobo = botoes[i].id.split('-')[1]

        let index = dados.findIndex(x => x.id == idLobo);
        if (dados[index].adotado == true){
            botoes[i].innerText = 'Adotado'
            botoes[i].classList.add('adotado')
            botoes[i].href = ''
        }else{
            botoes[i].addEventListener('click', (e)=>{
                let loboSelecionado = JSON.stringify(dados[index])
                localStorage.setItem('loboSelecionado', loboSelecionado)
            })
        }

                // let loboSelecionado = JSON.stringify(lobos[0])
        // localStorage.setItem('loboSelecionado', loboSelecionado)
        // console.log(localStorage.getItem('loboSelecionado'))
        // loboRetornado = JSON.parse(localStorage.getItem('loboSelecionado'))
        // console.log(loboRetornado)
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

