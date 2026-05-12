<?php
header('Content-Type: application/json'); //informa que o tipo de conteudo é json, em pura js funcionou sem isso, com jquery requeriu isso! 

$dados = 'contatos.json'; //arquivo json onde os dados ficam
$contatos = json_decode(file_get_contents($dados), true) ?? []; //decodifica para formato que array q o php usa

$acao = $_POST['acao'] ?? $_GET['acao'] ?? ''; //pode usar get ou post para acao, ou vazio

if ($acao == 'listar') {
    echo json_encode($contatos); //se acao for listar mostra os contatos

} else if ($acao == 'inserir') {  //se acao for inserir
    $adicionarId = empty($contatos) ? 1 : max(array_keys($contatos)) + 1; //se for vazio começa de 1, se tiver id adiciona mais 1
     $contatos[$adicionarId] = [ //id é chave do objeto        
        "nome"     => $_POST['nome'],
        "telefone" => $_POST['telefone'],
        "email"    => $_POST['email']
    ];
    file_put_contents($dados, json_encode($contatos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(["status" => "ok"]); //avisa o ajax que esta ok...

} else if ($acao == 'atualizar') { //se acao for atualizar
    $id = $_POST['id'];  //esse retorna e continua o mesmo
    $contatos[$id]['nome']     = $_POST['nome'];
    $contatos[$id]['telefone'] = $_POST['telefone'];
    $contatos[$id]['email']    = $_POST['email'];                
    file_put_contents($dados, json_encode($contatos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(["status" => "ok"]);

} else if ($acao == 'excluir') { 
    $id = $_POST['id']; //recebe o id do contato que vai ser excluido
    unset($contatos[$id]); //remove contato
    file_put_contents($dados, json_encode($contatos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo json_encode(["status" => "ok"]);
}