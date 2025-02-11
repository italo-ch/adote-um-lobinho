async function inicializarLocalStorage() {
    try {
        const response = await fetch('lobinhos.json');
        if (!response.ok) {
            throw new Error(`Erro ao buscar lobinho.json: ${response.statusText}`);
        }
        const lobos = await response.json();
        localStorage.setItem('lobos', JSON.stringify(lobos));
        console.log('Lobos inicializados no localStorage');
    } catch (error) {
        console.error('Erro ao inicializar o localStorage:', error);
    } finally {
        console.log('Tentativa de inicialização do localStorage concluída');
    }
}

if (!localStorage.getItem('lobos')) {
    inicializarLocalStorage().then(() => {
        console.log('Inicialização do localStorage concluída');
    }).catch(error => {
        console.error('Erro durante a inicialização do localStorage:', error);
    });
}

// Definição de classes para alteração do status do programa

class Lobinho {
    constructor(nome, idade, descricao, imagem) {
        this.id = null; // Agora o ID é passado no construtor
        this.nome = nome;
        this.idade = idade;
        this.descricao = descricao;
        this.imagem = imagem;
        this.adotado = false;
        this.nomeDono = null;
        this.idadeDono = null;
        this.emailDono = null;
    }

    adotarLobinho(nomeDono, idadeDono, emailDono) {
        this.adotado = true;
        this.nomeDono = nomeDono;
        this.idadeDono = idadeDono;
        this.emailDono = emailDono;
    }
}

class Lobinhos {
    constructor(currentState = []) {
        this.state = currentState;
    }

    getNextId() {
        if (this.state.length === 0) return 1;
        return Math.max(...this.state.map(l => l.id)) + 1; // Garante que o ID seja sempre único
    }

    adicionarLobinho(lobinho) {
        lobinho.id = this.getNextId(); // Define um ID único para o novo lobinho
        this.state.push(lobinho);
    }

    lerLobinhos(numeroPagina) {
        const base = 4 * (numeroPagina - 1);
        return this.state.slice(base, base + 4);
    }

    filtrarLobinhos(nome, filtrarPorStatusAdocao = false) {
        return this.state.filter(lobinho =>
            lobinho.nome.toLowerCase().trim() === nome.toLowerCase().trim() &&
            (!filtrarPorStatusAdocao || lobinho.adotado)
        );
    }

    atualizarStatusAdocaoLobinho(id, nome, idade, email) {
        const lobinho = this.state.find(l => l.id === id);
        if (lobinho) {
            lobinho.adotarLobinho(nome, idade, email);
        } else {
            console.error(`Lobinho com ID ${id} não encontrado.`);
        }
    }

    deletarLobinho(id) {
        this.state = this.state.filter(lobinho => lobinho.id !== id);
    }
}

const lobinhos = new Lobinhos(JSON.parse(localStorage.getItem("lobos")));

// Funções para renderizar lobos em cards

function renderizarLobo(nome, idade, descricao, imagem, statusAdocao) {
    const container = document.querySelector('.playground-container');
    const cardExample = document.createElement('div');
    cardExample.classList.add('card-example');

    // Criando a estrutura do card
    cardExample.innerHTML = `
        <div class="image-container">
            <img src="${imagem}">
        </div>
        <div class="content-container">
            <div class="title">
                <div>
                    <h3>${nome}</h3>
                    <span>Idade: ${idade} anos</span>
                </div>
            </div>
            <p class="description">${descricao}</p>
        </div>
    `;

    // Criando o botão de adoção
    const btnAdocao = document.createElement('a');
    btnAdocao.classList.add('button', 'btn-card');
    
    if (statusAdocao) {
        btnAdocao.classList.add('adotado');
        btnAdocao.textContent = 'Adotado';
    } else {
        btnAdocao.textContent = 'Adotar';
        btnAdocao.href = '#';
    }

    // Inserindo o botão dentro da div .title
    const titleDiv = cardExample.querySelector('.title');
    titleDiv.appendChild(btnAdocao);

    // Adicionando o card ao container
    container.appendChild(cardExample);
}

// Funções para lidar com eventos

function adicionaNovoLobo(event) {
    event.preventDefault();

    const nameInput = document.querySelector('#name');
    const ageInput = document.querySelector('#age');
    const linkInput = document.querySelector('#link');
    const descriptionInput = document.querySelector("#description");

    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim(), 10);
    const link = linkInput.value.trim();
    const description = descriptionInput.value.trim();

    // Validações
    if (!name) {
        alert("O nome não pode estar vazio.");
        return;
    }

    if (isNaN(age) || age <= 0) {
        alert("A idade deve ser um número válido e maior que zero.");
        return;
    }

    if (!link) {
        alert("O link da foto não deve estar vazio.");
        return;
    }

    if (!description) {
        alert("A descrição não pode estar vazia.");
        return;
    }

    // Criando o objeto Lobinho caso os dados sejam válidos
    const lobinho = new Lobinho(name, age, description, link);
    console.log(lobinho);

    lobinhos.adicionarLobinho(lobinho);
    
    // Exibe mensagem de sucesso
    alert(`Lobinho "${name}" adicionado com sucesso! 🐺`);
    console.log(lobinhos);

    // Limpa os campos do formulário
    nameInput.value = "";
    ageInput.value = "";
    linkInput.value = "";
    descriptionInput.value = "";
}

function adotarNovoLobo () {
    let _nomeDono = document.querySelector('#nome-dono');
    let _idadeDono = document.querySelector('#idade-dono');
    let _emailDono = document.querySelector('#email-dono');

    let nomeDono = _nomeDono.value.trim();
    let idadeDono = parseInt(_idadeDono.value.trim(), 10);
    let emailDono = _emailDono.value.trim();

    let index = lobinhos.findIndex(x => x.id == loboSelecionado.id);

    lobinhos[index].nomeDono = nomeDono
    lobinhos[index].idadeDono = idadeDono
    lobinhos[index].emailDono = emailDono
    lobinhos[index].adotado = True

    localStorage.setItem("lobos", JSON.stringify)
}

function mostarLobo (loboSelecionado) {
    let loboSelect = JSON.parse(loboSelecionado)

    let loboId = loboSelect.id
    let loboNome = loboSelect.nome
    let loboFoto = loboSelect.imagem
    
    let divFoto = document.querySelector(".foto")

    const foto = document.createElement("img")
    img.src = loboFoto
    img.alt = fotoLobo
    divFoto.appendChild(img);

    let nomeH2 = document.querySelector(".adotar-lobinho-nome")
    let idP = document.querySelector(".adotar-lobinho-id")

    nomeH2.innerText = `Adote o(a) ${loboNome}`
    idP.innerText = `ID: ${loboId}`
}


const saveBtn = document.querySelector('.save-btn');

saveBtn.addEventListener('click', adicionaNovoLobo);


let loboSelecionado = JSON.parse(localStorage.getItem("loboSelecionado"))
document.addEventListener('DOMContentLoaded', (e) =>{
    mostrarLobo(loboSelecionado)
})

const adotarBtn = document.querySelector('.adotar-btn')

adotarBtn.addEventListener('click', ()=>{adotarNovoLobo(loboSelecionado)})



