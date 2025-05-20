import { Produto } from "./types";
import {
  adicionarProduto,
  removerProduto,
  encontrarProduto,
  listarProdutos,
  baixarProduto,
} from "./estoque";
import { Observer } from "./observer";

export class EstoqueFacade {
  private estoque: Produto[] = [];
  private observers: Observer[] = [];

  adicionarObserver(observer: Observer) {
    this.observers.push(observer);
  }

  private notificarObservers(produto: Produto) {
    this.observers.forEach(o => o.atualizar(produto));
  }

  adicionar(produto: Produto) {
    this.estoque = adicionarProduto(this.estoque, produto);
  }

  remover(id: string) {
    this.estoque = removerProduto(this.estoque, id);
  }

  baixar(id: string, quantidade: number) {
    this.estoque = baixarProduto(this.estoque, id, quantidade);
    const produtoAtualizado = this.encontrar(id);
    if (produtoAtualizado) {
      this.notificarObservers(produtoAtualizado);
    }
  }

  encontrar(id: string): Produto | undefined {
    return encontrarProduto(this.estoque, id);
  }

  listar() {
    listarProdutos(this.estoque);
  }

  getEstoque(): Produto[] {
    return this.estoque;
  }
}