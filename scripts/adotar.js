const adotarBtn = document.querySelector('.adotar-btn');
const loboSelecionado = JSON.parse(localStorage.getItem('loboSelecionado'))
let lobinhos = JSON.parse(localStorage.getItem('lobos'))

adotarBtn.addEventListener('click', ()=>{
    let index = lobinhos.findIndex(x => x.id == loboSelecionado.id);
    console.log(index)
    lobinhos[index] = adotarNovoLobo(lobinhos[index])
    localStorage.setItem("lobos", JSON.stringify(lobinhos))
})


function adotarNovoLobo(lobo) {

    let novoLobo = lobo
    let _nomeDono = document.querySelector('#nome-dono');
    let _idadeDono = document.querySelector('#idade-dono');
    let _emailDono = document.querySelector('#email-dono');
    let nomeDono = _nomeDono.value.trim();
    let idadeDono = parseInt(_idadeDono.value.trim(), 10);
    let emailDono = _emailDono.value.trim();

    novoLobo.nomeDono = nomeDono
    novoLobo.idadeDono = idadeDono
    novoLobo.emailDono = emailDono
    novoLobo.adotado = true
    
    return novoLobo
}