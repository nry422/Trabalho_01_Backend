const botaoAtualizar = document.getElementById("botao-atualizar"); //para 

function listarContatos() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const contatos = JSON.parse(this.responseText);
        let linhas = "";
        for (let chave in contatos){
            let c = contatos[chave];
            linhas += "<tr>";
            linhas += "<td>" + chave + "</td>";
            linhas += "<td>" + c.nome + "</td>";
            linhas += "<td>" + c.telefone + "</td>";
            linhas += "<td>" + c.email + "</td>";
            linhas += "<td><button type='button' onclick='preencherFormulario(" + chave + ", \"" + c.nome + "\", \"" + c.telefone + "\", \"" + c.email + "\")' class='btn btn-primary btn-sm'>Editar</button></td>";
            linhas += "<td><button type='button' onclick='excluirContato(" + chave + ")' class='btn btn-danger btn-sm'>Excluir</button></td>";
            linhas += "</tr>";
        }
        document.getElementById("tabela-contatos").innerHTML = linhas;

        atualizaTabela(Object.keys(contatos).length); 
    }
    xmlhttp.open("GET", "api.php?acao=listar");
    xmlhttp.send();
}

function inserirContato() {
    const nome     = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email    = document.getElementById("email").value;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const resposta = JSON.parse(this.responseText);
        if (resposta.status == "ok") {
            alert("Contato salvo!");
            limparFormulario()
            listarContatos();
        }
    }
    xmlhttp.open("POST", "api.php");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("acao=inserir&nome=" + nome + "&telefone=" + telefone + "&email=" + email);
}

function atualizarContato() {
    const id       = document.getElementById("id").value;
    const nome     = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email    = document.getElementById("email").value;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const resposta = JSON.parse(this.responseText);
        if (resposta.status == "ok") {
            alert("Contato atualizado!");
            limparFormulario()
            listarContatos();
        }
    }
    xmlhttp.open("POST", "api.php");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("acao=atualizar&id=" + id + "&nome=" + nome + "&telefone=" + telefone + "&email=" + email);
}

function excluirContato(id) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const resposta = JSON.parse(this.responseText);
        if (resposta.status == "ok") {
            alert("Contato excluído!");
            listarContatos();
        }
    }
    xmlhttp.open("POST", "api.php");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("acao=excluir&id=" + id);
}

function preencherFormulario(id, nome, telefone, email) {
    document.getElementById("id").value       = id;
    document.getElementById("nome").value     = nome;
    document.getElementById("telefone").value = telefone;
    document.getElementById("email").value    = email;

    //esse para o botão aparecer e sumir com ele
    botaoAtualizar.classList.remove('d-none');
}

//esse para tirar as coisas que tem no form
function limparFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("nome").focus();
    
    botaoAtualizar.classList.add('d-none');

}

//to fazendo esta que faz a tabela aparecer somente se tiver coisa, se não tiver ela mostra a outra mensagem
function atualizaTabela(quantidade) {
    const tabela = document.getElementById('tabela-toda');
    const lista = document.getElementById('tabela-contatos');
    const mensagem = document.getElementById('mensagem-vazia')

    //verifica, tira e coloca
    if(quantidade > 0){  //ve se tem mais que nada na tabela
        tabela.classList.remove('d-none');
        mensagem.classList.add('d-none');
    } else {  //se não tiver nada na tabela aí mostra a mensagemdenada
        tabela.classList.add('d-none'); //esconde a tabela (em caso se apagar tudo)
        mensagem.classList.remove('d-none');
    }
}

listarContatos();