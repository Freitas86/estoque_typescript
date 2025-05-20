import { Produto } from './types';

export function adicionarProduto(estoque: Produto[], produto: Produto): Produto[] {
  return [...estoque, produto];
}

export function removerProduto(estoque: Produto[], id: string): Produto[] {
  return estoque.filter(produto => produto.id !== id);
}

export function encontrarProduto(estoque: Produto[], id: string): Produto | undefined {
  return estoque.find(produto => produto.id === id);
}

export function listarProdutos(estoque: Produto[]): void {
  estoque.forEach(produto => {
    console.log(`ID: ${produto.id}, Nome: ${produto.nome}, Qtd: ${produto.quantidade}, Preço: R$ ${produto.preco.toFixed(2)}`);
  });
}

export function baixarProduto(estoque: Produto[], id: string, quantidade: number): Produto[] {
    return estoque.map(produto => {
      if (produto.id === id) {
        const novaQuantidade = produto.quantidade - quantidade;
        if (novaQuantidade < 0) {
          console.warn(`Estoque insuficiente para o produto "${produto.nome}"`);
          return produto;
        }
        return { ...produto, quantidade: novaQuantidade };
      }
      return produto;
    });
  }
  