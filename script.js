const form = document.getElementById('produto-form');
const tabela = document.getElementById('tabela-produtos');

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

function salvar() {
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

function renderizar() {
  tabela.innerHTML = '';
  produtos.forEach((produto, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
      <td>
        <button onclick="editar(${index})">Editar</button>
        <button onclick="remover(${index})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const quantidade = document.getElementById('quantidade').value;
  const preco = document.getElementById('preco').value;

  produtos.push({ nome, quantidade, preco });
  salvar();
  renderizar();
  form.reset();
});

function remover(index) {
  if (confirm('Tem certeza que deseja excluir?')) {
    produtos.splice(index, 1);
    salvar();
    renderizar();
  }
}

function editar(index) {
  const produto = produtos[index];
  const novoNome = prompt('Novo nome:', produto.nome);
  const novaQuantidade = prompt('Nova quantidade:', produto.quantidade);
  const novoPreco = prompt('Novo preço:', produto.preco);

  if (novoNome && novaQuantidade && novoPreco) {
    produtos[index] = {
      nome: novoNome,
      quantidade: novaQuantidade,
      preco: novoPreco
    };
    salvar();
    renderizar();
  }
}

renderizar();