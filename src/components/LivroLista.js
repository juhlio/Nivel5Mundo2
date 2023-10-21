import React, { useState, useEffect, useMemo } from 'react';
import { ControleLivros } from '../controle/ControleLivros';
import { ControleEditora } from '../controle/ControleEditora';

function LinhaLivro({ livro, onExcluir }) {
  const controleEditora = useMemo(() => new ControleEditora(), []);
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  const handleExcluir = () => {
    onExcluir(livro.codigo);
  };

  return (
    <tr>
      <td>
        <button className='btn btn-danger' onClick={handleExcluir}>Excluir</button>
      </td>
      <td>{nomeEditora}</td>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

export default function LivroLista() {
  const [livros, setLivros] = useState([]);
  const controleLivro = useMemo(() => new ControleLivros(), []);

  useEffect(() => {
    const todosLivros = controleLivro.obterLivros();
    setLivros(todosLivros);
  }, [controleLivro]);

  const handleExcluir = (codigo) => {
    controleLivro.excluirLivro(codigo);
    const livrosAtualizados = livros.filter(livro => livro.codigo !== codigo);
    setLivros(livrosAtualizados);
  };

  return (
    <main>
      <h1>Catálogo de Livros</h1>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th></th>
            <th>Editora</th>
            <th>Título</th>
            <th>Resumo</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro key={livro.codigo} livro={livro} onExcluir={handleExcluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
}
