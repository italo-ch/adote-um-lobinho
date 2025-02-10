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
