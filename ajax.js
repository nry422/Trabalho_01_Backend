const botaoAtualizar = $("#botao-atualizar");

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
            linhas += "<td>";
            linhas += "<button type='button' onclick='preencherFormulario(" + chave + ", \"" + c.nome + "\", \"" + c.telefone + "\", \"" + c.email + "\")' class='btn btn-primary btn-sm me-1'>Editar</button> ";
            linhas += "<button type='button' onclick='excluirContato(" + chave + ")' class='btn btn-danger btn-sm'>Excluir</button>";
            linhas += "</td>";
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

function inserirContato(){
    const nome = $("#nome").val();
    const telefone = $("#telefone").val();
    const email = $("#email").val();

    $.post("api.php", {
        acao: "inserir",
        nome: nome,
        telefone: telefone,
        email: email
    }, function(resposta) {
        if (resposta.status == "ok"){
            alert("Contato salvo!");
            limparFormulario();
            listarContatos();
        }
    }
);
}

function atualizarContato() {
    const id = $("#id").val();
    const nome = $("#nome").val();
    const telefone = $("#telefone").val();
    const email = $("#email").val();

    $.post("api.php", {
        acao: "atualizar",
        id: id,
        nome: nome,
        telefone: telefone,
        email: email
    }, function(resposta){
        if (resposta.status == "ok") {
            alert("Contato atualizado!");
            limparFormulario();
            listarContatos();
        }
    }
);
}

function excluirContato(id) {
    $.post("api.php", {
        acao: "excluir",
        id: id
    }, function(resposta) {
        if (resposta.status == "ok") {
            alert("Contato excluído!");
            listarContatos();
        }
    }
);
}

function preencherFormulario(id, nome, telefone, email){
    $("#id").val(id);
    $("#nome").val(nome);
    $("#telefone").val(telefone);
    $("#email").val(email);

    //para o botao aparecer e sumir com ele
    botaoAtualizar.removeClass('d-none');
}

function limparFormulario(){
    $("#id").val("");
    $("#nome").val("");
    $("#telefone").val("");
    $("#email").val("");
    $("#nome").focus();

    botaoAtualizar.addClass('d-none');
    $("#botao-limpar").addClass('d-none');

}

//verifica se você digitou algo e mostra o botao limpar, não se se deveria manter isso...
function verificarCampos() {
    if ($("#nome").val() || $("#telefone").val() || $("#email").val()) {
        $("#botao-limpar").removeClass('d-none');
    } else {
        $("#botao-limpar").addClass('d-none');
    }
}

$("#nome, #telefone, #email").on("input", verificarCampos);

function atualizaTabela(quantidade) {
    if(quantidade > 0) { //checa se tem mais que nada na tabela
        $("#tabela-toda").removeClass('d-none');
        $("#mensagem-vazia").addClass('d-none');
    } else { //se não tiver nada na tabela mostra a mensagem
        $("#tabela-toda").addClass('d-none'); //esconde a tabela
        $("#mensagem-vazia").removeClass('d-none');
    }
}

listarContatos();