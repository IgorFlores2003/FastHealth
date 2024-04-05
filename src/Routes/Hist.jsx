import React from 'react';
import '../index.css';
import {Link} from "react-router-dom";



class Tabela extends React.Component {

  render() {
    const dados = [
      { id: 1, nome: 'Igor', idade: 21,data:'02/05/2024'  },
      { id: 2, nome: 'Clayton', idade: 49 ,data:'12/05/2024'},
      { id: 3, nome: 'Yasmim', idade: 20 ,data:'23/05/2024'}
    ];

    return (
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Dt. da Última Triagem</th>
          </tr>
        </thead>
        <tbody>
          
          {dados.map((item) => (


            <tr key={item.id} >
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.idade}</td>
              <td>{item.data}</td>
            </tr>
          
            ))}
        </tbody>
      </table>
    );
  }
}

export default Tabela;
