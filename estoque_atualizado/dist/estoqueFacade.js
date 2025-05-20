"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueFacade = void 0;
const estoque_1 = require("./estoque");
class EstoqueFacade {
    constructor() {
        this.estoque = [];
        this.observers = [];
    }
    adicionarObserver(observer) {
        this.observers.push(observer);
    }
    notificarObservers(produto) {
        this.observers.forEach(o => o.atualizar(produto));
    }
    adicionar(produto) {
        this.estoque = (0, estoque_1.adicionarProduto)(this.estoque, produto);
    }
    remover(id) {
        this.estoque = (0, estoque_1.removerProduto)(this.estoque, id);
    }
    baixar(id, quantidade) {
        this.estoque = (0, estoque_1.baixarProduto)(this.estoque, id, quantidade);
        const produtoAtualizado = this.encontrar(id);
        if (produtoAtualizado) {
            this.notificarObservers(produtoAtualizado);
        }
    }
    encontrar(id) {
        return (0, estoque_1.encontrarProduto)(this.estoque, id);
    }
    listar() {
        (0, estoque_1.listarProdutos)(this.estoque);
    }
    getEstoque() {
        return this.estoque;
    }
}
exports.EstoqueFacade = EstoqueFacade;
