import { Produto } from './types';
import { criarProduto } from './produto';
import {
  adicionarProduto,
  listarProdutos,
  baixarProduto
} from './estoque';

// Tipando corretamente o array de produtos
let estoque: Produto[] = [];

// Criando produtos
const prod1 = criarProduto("1", "Teclado", 10, 150.00);
const prod2 = criarProduto("2", "Mouse", 25, 80.00);

// Adicionando ao estoque
estoque = adicionarProduto(estoque, prod1);
estoque = adicionarProduto(estoque, prod2);

// Exibindo estoque inicial
console.log("Estoque Inicial:");
listarProdutos(estoque);

// Baixando unidades do produto com ID "1"
estoque = baixarProduto(estoque, "1", 3);

// Exibindo estoque atualizado
console.log("\nEstoque Após Baixa:");
listarProdutos(estoque);
