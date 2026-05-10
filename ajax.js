function listarContatos() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const contatos = JSON.parse(this.responseText);
        let linhas = "";
        contatos.forEach(function(c) {
            linhas += "<tr>";
            linhas += "<td>" + c.id + "</td>";
            linhas += "<td>" + c.nome + "</td>";
            linhas += "<td>" + c.telefone + "</td>";
            linhas += "<td>" + c.email + "</td>";
            linhas += "<td><button type='button' onclick='preencherFormulario(" + c.id + ", \"" + c.nome + "\", \"" + c.telefone + "\", \"" + c.email + "\")' class='btn btn-primary btn-sm'>Editar</button></td>";
            linhas += "<td><button type='button' onclick='excluirContato(" + c.id + ")' class='btn btn-danger btn-sm'>Excluir</button></td>";
            linhas += "</tr>";
        });
        document.getElementById("tabela-contatos").innerHTML = linhas;
    }
    xmlhttp.open("GET", "api.php?acao=listar");
    xmlhttp.send();
}

function preencherFormulario(id, nome, telefone, email) {
    document.getElementById("id").value       = id;
    document.getElementById("nome").value     = nome;
    document.getElementById("telefone").value = telefone;
    document.getElementById("email").value    = email;
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

listarContatos();