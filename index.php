<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
    <title>Inicial</title>
</head>

<body>

    <div class="container">
        <h1>Agenda do AJAX</h1>
        <!--form para inserir e atualizar a tabela-->
        <form>
           <p> 
            <!--id fica escondido mas é necessario aqui na hora de editar-->
            <input type="hidden" id="id">
            Contato:
            <input type="text" id="nome" required autofocus>
            Telefone:
            <input type="text" id="telefone" required>
            Email:
            <input type="text" id="email" required>
            <button type="button" onclick="inserirContato()" class="btn btn-primary">Adicionar</button>
            <button type="button" onclick="atualizarContato()" class="btn btn-primary">Atualizar</button>
           </p>
        </form>
        

        <table class="table"> <!--o cabecalho da tabela ficou no index-->
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                </tr>
            </thead>
            <tbody id="tabela-contatos">           <!--pega os valores do ajax que vem do arquivo json-->
            </tbody>
        </table>
        </div>

      <script src="ajax.js"></script>   
</body>
</html>