"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var estoqueFacade_1 = require("./estoqueFacade");
var observer_1 = require("./observer");
// --- Configuração Inicial ---
// 1. Instancia a Facade que gerencia o estoque.
var estoqueFacade = new estoqueFacade_1.EstoqueFacade();
console.log("EstoqueFacade pronta.");
// 2. Instancia o Observer para alertas de estoque baixo.
var alertaDeEstoqueBaixo = new observer_1.AlertaEstoqueBaixo();
console.log("AlertaEstoqueBaixo pronto.");
// 3. Registra o Observer na Facade para receber notificações.
estoqueFacade.adicionarObserver(alertaDeEstoqueBaixo);
console.log("Observer de estoque baixo registrado na Facade.\n");
// --- Demonstração das Operações de Estoque ---
// 4. Adiciona produtos iniciais ao estoque através da Facade.
console.log("--- Adicionando Produtos ---");
var produto1 = { id: "P001", nome: "Notebook Gamer X", quantidade: 8, preco: 7500.00 };
var produto2 = { id: "P002", nome: "Mouse Sem Fio Z", quantidade: 15, preco: 120.50 };
var produto3 = { id: "P003", nome: "Teclado Mecânico Y", quantidade: 6, preco: 350.75 };
estoqueFacade.adicionar(produto1);
estoqueFacade.adicionar(produto2);
estoqueFacade.adicionar(produto3);
console.log("Produtos adicionados ao estoque.\n");
// 5. Lista o conteúdo atual do estoque.
console.log("--- Estoque Inicial ---");
estoqueFacade.listar();
console.log("-----------------------\n");
// 6. Realiza baixas no estoque, demonstrando o Observer em ação.
console.log("--- Operações de Baixa ---");
// Baixa P001: 8 -> 5. Não deve gerar alerta.
estoqueFacade.baixar(produto1.id, 3);
console.log("Baixa realizada em \"".concat(produto1.nome, "\"."));
// Baixa P003: 6 -> 3. Deve gerar alerta (estoque < 5).
estoqueFacade.baixar(produto3.id, 3);
console.log("Baixa realizada em \"".concat(produto3.nome, "\"."));
// Baixa P003: 3 -> 2. Deve gerar alerta novamente.
estoqueFacade.baixar(produto3.id, 1);
console.log("Nova baixa realizada em \"".concat(produto3.nome, "\"."));
// Baixa P002: 15 -> 5. Não deve gerar alerta (estoque não é < 5).
estoqueFacade.baixar(produto2.id, 10);
console.log("Baixa realizada em \"".concat(produto2.nome, "\".\n"));
// 7. Lista o estoque após todas as operações.
console.log("--- Estoque Final ---");
estoqueFacade.listar();
console.log("---------------------\n");
// 8. Demonstra a busca por um produto específico.
console.log("--- Encontrando Produto ---");
var idParaEncontrar = "P002";
var produtoEncontrado = estoqueFacade.encontrar(idParaEncontrar);
if (produtoEncontrado) {
    console.log("Encontrado: ".concat(produtoEncontrado.nome, ", Qtd: ").concat(produtoEncontrado.quantidade));
}
else {
    console.log("Produto ID ".concat(idParaEncontrar, " n\u00E3o localizado."));
}
console.log("-----------------------------\n");
console.log("Fim da demonstração.");
