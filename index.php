<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
    <title>Agenda de contatos com AJAX</title>
</head>
<!--teste para ver se é possivel vc ver responda aqui R: EU VEJO!!!!!!!!!!! :D -->
<body>

    <div class="container">
        <h1 class="my-4"> Agenda do AJAX</h1>        
        <!--form para inserir e atualizar a tabela-->
        <form>            
            <!--id fica escondido mas é necessario aqui na hora de editar-->
            <input type="hidden" id="id">
                <div class="row g-2 align-items-end">
                    <div class="col">
                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" class="form-control" required autofocus>
                    </div>    
                    <div class="col">
                        <label for="telefone">Telefone:</label>
                        <input type="text" id="telefone" class="form-control" required>
                    </div>
                    <div class="col">
                        <label for="email">Email:</label>
                        <input type="text" id="email" class="form-control" required>
                    </div>
                    <div class="col-auto">
                        <button type="button" onclick="inserirContato()" class="btn btn-primary">Adicionar</button>
                        <button type="button" onclick="atualizarContato()" class="btn btn-primary d-none" id="botao-atualizar">Atualizar</button>
                        <button type="button" onclick="limparFormulario()" class="btn btn-secondary d-none" id="botao-limpar">Limpar</button>
                    </div>
        </div>
        </form>
        
    <div class="table-responsive">
        <table class="table mt-4 d-none" id="tabela-toda"> <!--Aqui ele está com d-none pois some e aparece conforme dados no json-->
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
         <p id="mensagem-vazia" class="mt-3">Ainda não há nenhum contato na agenda! <br> Adicione para aparecer!</p>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script> 
      <script src="ajax.js"></script>         
</body>
</html>