"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertaEstoqueBaixo = void 0;
class AlertaEstoqueBaixo {
    atualizar(produto) {
        if (produto.quantidade < 5) {
            console.log(`⚠️ Estoque baixo para o produto "${produto.nome}" (Qtd: ${produto.quantidade})`);
        }
    }
}
exports.AlertaEstoqueBaixo = AlertaEstoqueBaixo;
