"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueFacade = void 0;
var estoque_1 = require("./estoque");
var EstoqueFacade = /** @class */ (function () {
    function EstoqueFacade() {
        this.estoque = [];
        this.observers = [];
    }
    EstoqueFacade.prototype.adicionarObserver = function (observer) {
        this.observers.push(observer);
    };
    EstoqueFacade.prototype.notificarObservers = function (produto) {
        this.observers.forEach(function (o) { return o.atualizar(produto); });
    };
    EstoqueFacade.prototype.adicionar = function (produto) {
        this.estoque = (0, estoque_1.adicionarProduto)(this.estoque, produto);
    };
    EstoqueFacade.prototype.remover = function (id) {
        this.estoque = (0, estoque_1.removerProduto)(this.estoque, id);
    };
    EstoqueFacade.prototype.baixar = function (id, quantidade) {
        this.estoque = (0, estoque_1.baixarProduto)(this.estoque, id, quantidade);
        var produtoAtualizado = this.encontrar(id);
        if (produtoAtualizado) {
            this.notificarObservers(produtoAtualizado);
        }
    };
    EstoqueFacade.prototype.encontrar = function (id) {
        return (0, estoque_1.encontrarProduto)(this.estoque, id);
    };
    EstoqueFacade.prototype.listar = function () {
        (0, estoque_1.listarProdutos)(this.estoque);
    };
    EstoqueFacade.prototype.getEstoque = function () {
        return this.estoque;
    };
    return EstoqueFacade;
}());
exports.EstoqueFacade = EstoqueFacade;
