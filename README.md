# Agenda de Contatos — Ajax + JSON

Atividade prática da disciplina de **Backend** — 2ª fase do curso técnico de **Desenvolvimento de Sistemas** do **IFSC Jaraguá do Sul (RAU)**, 2026.

## Sobre o Trabalho

Simulação de uma agenda de contatos utilizando **Ajax** para comunicação assíncrona entre o frontend e o backend, com persistência de dados em arquivo **JSON** — sem uso de banco de dados.

O sistema permite **cadastrar, listar, editar e excluir** contatos sem recarregar a página.

## Estrutura dos Arquivos

```
/
├── index.php       → interface do usuário (formulário + tabela)
├── api.php         → CRUD: processa as requisições e lê/escreve no JSON
├── ajax.js         → comunicação entre index.php e api.php via XMLHttpRequest
└── contatos.json   → arquivo onde os contatos são persistidos
```

## Funcionamento

```
index.php  →  ajax.js  →  api.php  →  contatos.json
```

1. O usuário preenche o formulário no `index.php`
2. O `ajax.js` envia os dados para o `api.php` sem recarregar a página
3. O `api.php` realiza a operação no `contatos.json` e devolve uma resposta
4. O `ajax.js` atualiza a tabela na tela com os dados atualizados

##  Operações CRUD

| Operação | Método | Descrição |
|---|---|---|
| Listar | GET | Busca todos os contatos do JSON |
| Inserir | POST | Adiciona novo contato com id sequencial |
| Atualizar | POST | Edita contato existente pelo id |
| Excluir | POST | Remove contato pelo id |

## Formato dos Dados (JSON)

Os contatos são armazenados como objeto JSON, onde a chave é o id sequencial:

```json
{
    "1": { "nome": "João", "telefone": "47 99999-0000", "email": "joao@email.com" },
    "2": { "nome": "Maria", "telefone": "47 98888-1111", "email": "maria@email.com" }
}
```
