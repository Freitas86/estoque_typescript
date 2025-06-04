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
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarProduto = criarProduto;
exports.atualizarQuantidade = atualizarQuantidade;
exports.atualizarPreco = atualizarPreco;
function criarProduto(id, nome, quantidade, preco) {
    return { id: id, nome: nome, quantidade: quantidade, preco: preco };
}
function atualizarQuantidade(produto, novaQuantidade) {
    return __assign(__assign({}, produto), { quantidade: novaQuantidade });
}
function atualizarPreco(produto, novoPreco) {
    return __assign(__assign({}, produto), { preco: novoPreco });
}
