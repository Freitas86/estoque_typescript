"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertaEstoqueBaixo = void 0;
var AlertaEstoqueBaixo = /** @class */ (function () {
    function AlertaEstoqueBaixo() {
    }
    AlertaEstoqueBaixo.prototype.atualizar = function (produto) {
        if (produto.quantidade < 5) {
            console.log("\u26A0\uFE0F Estoque baixo para o produto \"".concat(produto.nome, "\" (Qtd: ").concat(produto.quantidade, ")"));
        }
    };
    return AlertaEstoqueBaixo;
}());
exports.AlertaEstoqueBaixo = AlertaEstoqueBaixo;
