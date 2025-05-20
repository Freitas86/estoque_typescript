"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarProduto = criarProduto;
exports.atualizarQuantidade = atualizarQuantidade;
exports.atualizarPreco = atualizarPreco;
function criarProduto(id, nome, quantidade, preco) {
    return { id, nome, quantidade, preco };
}
function atualizarQuantidade(produto, novaQuantidade) {
    return Object.assign(Object.assign({}, produto), { quantidade: novaQuantidade });
}
function atualizarPreco(produto, novoPreco) {
    return Object.assign(Object.assign({}, produto), { preco: novoPreco });
}
