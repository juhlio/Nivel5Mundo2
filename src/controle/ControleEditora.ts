import { Editora } from "../modelo/Editora";

const editoras: Array<Editora> = [
  { codEditora: 1, nome: 'Alta Books' },
  { codEditora: 2, nome: 'Pearson' },
  { codEditora: 3, nome: 'Addison Wesley' }
];

export class ControleEditora {
  getEditoras(): Array<Editora> {
    return editoras;
  }

  getNomeEditora(codEditora: number): string {
    const editoraEncontrada = editoras.find(editora => editora.codEditora === codEditora);
    return editoraEncontrada ? editoraEncontrada.nome : '';
  }
}
