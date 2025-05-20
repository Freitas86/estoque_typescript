import { Produto } from "./types";

export interface Observer {
  atualizar(produto: Produto): void;
}

export class AlertaEstoqueBaixo implements Observer {
  atualizar(produto: Produto) {
    if (produto.quantidade < 5) {
      console.log(
        `⚠️ Estoque baixo para o produto "${produto.nome}" (Qtd: ${produto.quantidade})`
      );
    }
  }
}