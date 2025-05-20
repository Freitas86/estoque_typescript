"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionarProduto = adicionarProduto;
exports.removerProduto = removerProduto;
exports.encontrarProduto = encontrarProduto;
exports.listarProdutos = listarProdutos;
exports.baixarProduto = baixarProduto;
function adicionarProduto(estoque, produto) {
    return [...estoque, produto];
}
function removerProduto(estoque, id) {
    return estoque.filter(produto => produto.id !== id);
}
function encontrarProduto(estoque, id) {
    return estoque.find(produto => produto.id === id);
}
function listarProdutos(estoque) {
    estoque.forEach(produto => {
        console.log(`ID: ${produto.id}, Nome: ${produto.nome}, Qtd: ${produto.quantidade}, Preço: R$ ${produto.preco.toFixed(2)}`);
    });
}
function baixarProduto(estoque, id, quantidade) {
    return estoque.map(produto => {
        if (produto.id === id) {
            const novaQuantidade = produto.quantidade - quantidade;
            if (novaQuantidade < 0) {
                console.warn(`Estoque insuficiente para o produto "${produto.nome}"`);
                return produto;
            }
            return Object.assign(Object.assign({}, produto), { quantidade: novaQuantidade });
        }
        return produto;
    });
}
