//aqui é jquery
function listarContatos(){
    $.get("api.php", { acao: "listar"}, function(contatos) {
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
        $("#tabela-contatos").html(linhas);
        atualizaTabela(Object.keys(contatos).length); 
    }); 

} 

$("form").on("keypress", function(e) { //para poder usar enter para tivar o botao adicionar se id estiver vazio, ou para atualizar se id escondido tiver valor
    if (e.key === "Enter") {
        const id = $("#id").val();
        if (id) {
            atualizarContato(); 
        } else {
            inserirContato();  
        }
    }
});



//daqui para baixo ainda é JS TIRANDO O VERIFICARCAMPOS
const botaoAtualizar = document.getElementById("botao-atualizar"); //para 

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
    $("#botao-limpar").addClass('d-none'); //isso é jquery também, ele esconde o botao após limpar

}

// é JQUERY! ele verifica se você digitou algo e mostra o botao limpar, não se se deveria manter isso...
function verificarCampos() {
    const nome     = $("#nome").val();
    const telefone = $("#telefone").val();
    const email    = $("#email").val();

    if (nome || telefone || email) {
        $("#botao-limpar").removeClass('d-none');
    } else {
        $("#botao-limpar").addClass('d-none');
    }
}

$("#nome").on("input", verificarCampos);
$("#telefone").on("input", verificarCampos);
$("#email").on("input", verificarCampos);

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





//versão JS do function listar contatos ainda aqui, acima está em jquery
/*function listarContatos() {
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
} */


