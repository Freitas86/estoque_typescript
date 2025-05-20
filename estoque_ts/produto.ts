import { Produto } from './types';

export function criarProduto(id: string, nome: string, quantidade: number, preco: number): Produto {
  return { id, nome, quantidade, preco };
}

export function atualizarQuantidade(produto: Produto, novaQuantidade: number): Produto {
  return { ...produto, quantidade: novaQuantidade };
}

export function atualizarPreco(produto: Produto, novoPreco: number): Produto {
  return { ...produto, preco: novoPreco };
}
