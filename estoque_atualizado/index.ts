import * as readline from 'readline';
import { EstoqueFacade } from './estoqueFacade';
import { AlertaEstoqueBaixo } from './observer';
import { Produto } from './types';

const estoqueFacade = new EstoqueFacade();
const alertaDeEstoqueBaixo = new AlertaEstoqueBaixo();
estoqueFacade.adicionarObserver(alertaDeEstoqueBaixo);

console.log("Sistema de Gerenciamento de Estoque!");
console.log("---------------------------------------------------------\n");

// Estoque inicial 
const produtoInicial1: Produto = { id: "INIT001", nome: "Cadeira Ergonômica", quantidade: 10, preco: 799.90 };
const produtoInicial2: Produto = { id: "INIT002", nome: "Monitor LED 24\"", quantidade: 6, preco: 650.00 }; 

estoqueFacade.adicionar(produtoInicial1);
estoqueFacade.adicionar(produtoInicial2);

// Interface readline
const rl = readline.createInterface({
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
    rl.question("Escolha uma opção: ", (opcao) => {
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
    rl.question("ID do novo produto: ", (id) => {
        rl.question("Nome do produto: ", (nome) => {
            rl.question("Quantidade inicial: ", (quantidadeStr) => {
                rl.question("Preço (ex: 123.45): ", (precoStr) => {
                    const quantidade = parseInt(quantidadeStr, 10);
                    const preco = parseFloat(precoStr);

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

                    const novoProduto: Produto = { id, nome, quantidade, preco };
                    estoqueFacade.adicionar(novoProduto);
                    console.log(`Produto "${nome}" (ID: ${id}) adicionado com sucesso!`);
                    exibirMenu();
                });
            });
        });
    });
}

function promptRemoverProduto() {
    rl.question("ID do produto a ser removido: ", (id) => {
        if (!id) {
            console.log("ID é obrigatório para remover.");
            exibirMenu();
            return;
        }
        const produtoParaRemover = estoqueFacade.encontrar(id);
        if (produtoParaRemover) {
            estoqueFacade.remover(id);
            console.log(`Produto "${produtoParaRemover.nome}" (ID: ${id}) removido com sucesso.`);
        } else {
            console.log(`Produto com ID "${id}" não encontrado.`);
        }
        exibirMenu();
    });
}

function promptBaixarEstoque() {
    rl.question("ID do produto para dar baixa: ", (id) => {
        rl.question("Quantidade a ser baixada: ", (quantidadeStr) => {
            if (!id) {
                console.log("ID é obrigatório para dar baixa.");
                exibirMenu();
                return;
            }
            const quantidade = parseInt(quantidadeStr, 10);
            if (isNaN(quantidade) || quantidade <= 0) {
                console.log("Quantidade inválida. Deve ser um número positivo maior que zero.");
                exibirMenu();
                return;
            }

            const produtoExistente = estoqueFacade.encontrar(id);
            if (produtoExistente) {
                estoqueFacade.baixar(id, quantidade); // observer é chamado por aqui pelo facade se necessário
                console.log(`Baixa de ${quantidade} unidade(s) para o produto "${produtoExistente.nome}" (ID: ${id}) processada.`);
            } else {
                 console.log(`Produto com ID "${id}" não encontrado para dar baixa.`);
            }
            exibirMenu();
        });
    });
}

function promptEncontrarProduto() {
    rl.question("ID do produto a ser encontrado: ", (id) => {
        if (!id) {
            console.log("ID é obrigatório para encontrar.");
            exibirMenu();
            return;
        }
        const produto = estoqueFacade.encontrar(id);
        console.log("\n--- Resultado da Busca ---");
        if (produto) {
            console.log(`ID: ${produto.id}, Nome: ${produto.nome}, Qtd: ${produto.quantidade}, Preço: R$ ${produto.preco.toFixed(2)}`);
            alertaDeEstoqueBaixo.atualizar(produto);

        } else {
            console.log(`Produto com ID "${id}" não encontrado.`);
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