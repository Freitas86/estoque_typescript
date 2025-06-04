"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var estoqueFacade_1 = require("./estoqueFacade");
var observer_1 = require("./observer");
var estoqueFacade = new estoqueFacade_1.EstoqueFacade();
var alertaDeEstoqueBaixo = new observer_1.AlertaEstoqueBaixo();
estoqueFacade.adicionarObserver(alertaDeEstoqueBaixo);
console.log("Sistema de Gerenciamento de Estoque!");
console.log("---------------------------------------------------------\n");
// Estoque inicial 
var produtoInicial1 = { id: "INIT001", nome: "Cadeira Ergonômica", quantidade: 10, preco: 799.90 };
var produtoInicial2 = { id: "INIT002", nome: "Monitor LED 24\"", quantidade: 6, preco: 650.00 };
estoqueFacade.adicionar(produtoInicial1);
estoqueFacade.adicionar(produtoInicial2);
// Interface readline
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Funções de Interação
function exibirMenu() {
    console.log("\n--- Menu Principal ---");
    console.log("1. Adicionar novo produto");
    console.log("2. Remover produto por ID");
    console.log("3. Baixar estoque de produto por ID");
    console.log("4. Listar todos os produtos");
    console.log("5. Encontrar produto por ID");
    console.log("6. Sair");
    console.log("----------------------");
    perguntarAcao();
}
function perguntarAcao() {
    rl.question("Escolha uma opção: ", function (opcao) {
        switch (opcao.trim()) {
            case '1':
                promptAdicionarProduto();
                break;
            case '2':
                promptRemoverProduto();
                break;
            case '3':
                promptBaixarEstoque();
                break;
            case '4':
                console.log("\n--- Listagem Completa do Estoque ---");
                estoqueFacade.listar();
                console.log("------------------------------------");
                exibirMenu();
                break;
            case '5':
                promptEncontrarProduto();
                break;
            case '6':
                console.log("\nFIM!");
                rl.close();
                break;
            default:
                console.log("Opção inválida. Por favor, escolha um número do menu.");
                exibirMenu();
                break;
        }
    });
}
function promptAdicionarProduto() {
    rl.question("ID do novo produto: ", function (id) {
        rl.question("Nome do produto: ", function (nome) {
            rl.question("Quantidade inicial: ", function (quantidadeStr) {
                rl.question("Preço (ex: 123.45): ", function (precoStr) {
                    var quantidade = parseInt(quantidadeStr, 10);
                    var preco = parseFloat(precoStr);
                    if (!id || !nome) {
                        console.log("ID e Nome são obrigatórios.");
                        exibirMenu();
                        return;
                    }
                    if (isNaN(quantidade) || quantidade < 0) {
                        console.log("Quantidade inválida. Deve ser um número não negativo.");
                        exibirMenu();
                        return;
                    }
                    if (isNaN(preco) || preco < 0) {
                        console.log("Preço inválido. Deve ser um número não negativo.");
                        exibirMenu();
                        return;
                    }
                    var novoProduto = { id: id, nome: nome, quantidade: quantidade, preco: preco };
                    estoqueFacade.adicionar(novoProduto);
                    console.log("Produto \"".concat(nome, "\" (ID: ").concat(id, ") adicionado com sucesso!"));
                    exibirMenu();
                });
            });
        });
    });
}
function promptRemoverProduto() {
    rl.question("ID do produto a ser removido: ", function (id) {
        if (!id) {
            console.log("ID é obrigatório para remover.");
            exibirMenu();
            return;
        }
        var produtoParaRemover = estoqueFacade.encontrar(id);
        if (produtoParaRemover) {
            estoqueFacade.remover(id);
            console.log("Produto \"".concat(produtoParaRemover.nome, "\" (ID: ").concat(id, ") removido com sucesso."));
        }
        else {
            console.log("Produto com ID \"".concat(id, "\" n\u00E3o encontrado."));
        }
        exibirMenu();
    });
}
function promptBaixarEstoque() {
    rl.question("ID do produto para dar baixa: ", function (id) {
        rl.question("Quantidade a ser baixada: ", function (quantidadeStr) {
            if (!id) {
                console.log("ID é obrigatório para dar baixa.");
                exibirMenu();
                return;
            }
            var quantidade = parseInt(quantidadeStr, 10);
            if (isNaN(quantidade) || quantidade <= 0) {
                console.log("Quantidade inválida. Deve ser um número positivo maior que zero.");
                exibirMenu();
                return;
            }
            var produtoExistente = estoqueFacade.encontrar(id);
            if (produtoExistente) {
                estoqueFacade.baixar(id, quantidade); // observer é chamado por aqui pelo facade se necessário
                console.log("Baixa de ".concat(quantidade, " unidade(s) para o produto \"").concat(produtoExistente.nome, "\" (ID: ").concat(id, ") processada."));
            }
            else {
                console.log("Produto com ID \"".concat(id, "\" n\u00E3o encontrado para dar baixa."));
            }
            exibirMenu();
        });
    });
}
function promptEncontrarProduto() {
    rl.question("ID do produto a ser encontrado: ", function (id) {
        if (!id) {
            console.log("ID é obrigatório para encontrar.");
            exibirMenu();
            return;
        }
        var produto = estoqueFacade.encontrar(id);
        console.log("\n--- Resultado da Busca ---");
        if (produto) {
            console.log("ID: ".concat(produto.id, ", Nome: ").concat(produto.nome, ", Qtd: ").concat(produto.quantidade, ", Pre\u00E7o: R$ ").concat(produto.preco.toFixed(2)));
            alertaDeEstoqueBaixo.atualizar(produto);
        }
        else {
            console.log("Produto com ID \"".concat(id, "\" n\u00E3o encontrado."));
        }
        console.log("--------------------------");
        exibirMenu();
    });
}
// inicia interacao
console.log("--- Estoque Inicial ---");
estoqueFacade.listar(); // estoque inicial
console.log("---------------------------------------");
exibirMenu(); // chama o menu
