"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionarProduto = adicionarProduto;
exports.removerProduto = removerProduto;
exports.encontrarProduto = encontrarProduto;
exports.listarProdutos = listarProdutos;
exports.baixarProduto = baixarProduto;
function adicionarProduto(estoque, produto) {
    return __spreadArray(__spreadArray([], estoque, true), [produto], false);
}
function removerProduto(estoque, id) {
    return estoque.filter(function (produto) { return produto.id !== id; });
}
function encontrarProduto(estoque, id) {
    return estoque.find(function (produto) { return produto.id === id; });
}
function listarProdutos(estoque) {
    estoque.forEach(function (produto) {
        console.log("ID: ".concat(produto.id, ", Nome: ").concat(produto.nome, ", Qtd: ").concat(produto.quantidade, ", Pre\u00E7o: R$ ").concat(produto.preco.toFixed(2)));
    });
}
function baixarProduto(estoque, id, quantidade) {
    return estoque.map(function (produto) {
        if (produto.id === id) {
            var novaQuantidade = produto.quantidade - quantidade;
            if (novaQuantidade < 0) {
                console.warn("Estoque insuficiente para o produto \"".concat(produto.nome, "\""));
                return produto;
            }
            return __assign(__assign({}, produto), { quantidade: novaQuantidade });
        }
        return produto;
    });
}
