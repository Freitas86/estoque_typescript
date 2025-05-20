"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const produto_1 = require("./produto");
const estoque_1 = require("./estoque");
// Tipando corretamente o array de produtos
let estoque = [];
// Criando produtos
const prod1 = (0, produto_1.criarProduto)("1", "Teclado", 10, 150.00);
const prod2 = (0, produto_1.criarProduto)("2", "Mouse", 25, 80.00);
// Adicionando ao estoque
estoque = (0, estoque_1.adicionarProduto)(estoque, prod1);
estoque = (0, estoque_1.adicionarProduto)(estoque, prod2);
// Exibindo estoque inicial
console.log("Estoque Inicial:");
(0, estoque_1.listarProdutos)(estoque);
// Baixando unidades do produto com ID "1"
estoque = (0, estoque_1.baixarProduto)(estoque, "1", 3);
// Exibindo estoque atualizado
console.log("\nEstoque Após Baixa:");
(0, estoque_1.listarProdutos)(estoque);
