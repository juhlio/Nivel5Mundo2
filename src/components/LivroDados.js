import React, { useState } from 'react';
import { ControleLivros } from '../controle/ControleLivros';
import { ControleEditora } from '../controle/ControleEditora';
import { useNavigate } from 'react-router-dom';

export default function LivroDados() {
  const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();
  const navigate = useNavigate();

  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  const tratarCombo = (event) => {
    const value = parseInt(event.target.value, 10);
    setCodEditora(value);
  };

  const incluir = (event) => {
    event.preventDefault();

    const autoresArray = autores.split('\n');

    const livro = {
      codigo: 0,
      titulo,
      resumo,
      autores: autoresArray,
      codEditora
    };

    controleLivro.incluir(livro);
    navigate('/');
  };

  return (
    <main className="container">
      <h1>Adicionar Livro</h1>
      <form onSubmit={incluir}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resumo">Resumo:</label>
          <textarea
            className="form-control"
            id="resumo"
            value={resumo}
            onChange={(event) => setResumo(event.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="autores">Autores (um por linha):</label>
          <textarea
            className="form-control"
            id="autores"
            value={autores}
            onChange={(event) => setAutores(event.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="editora">Editora:</label>
          <select
            className="form-control"
            id="editora"
            value={codEditora}
            onChange={tratarCombo}
          >
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>
    </main>
  );
}
