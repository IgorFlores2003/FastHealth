import React from 'react';
import '../index.css';
import {Link} from "react-router-dom";



class Caixa extends React.Component {

  render() {
    const dados = [
      { id: 1, nome: 'Igor', idade: 21, dor: '9-10',data:"02/10/2024"  },
      { id: 2, nome: 'Clayton', idade: 49, dor: '4-5' ,data:"21/09/2024" },
      { id: 3, nome: 'Jasmim', idade: 20, dor: '3-4',data:"22/10/2024" }
    ];

    return (
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Nivel de Dor</th>
            <th>Data da Triagem</th>
          </tr>
        </thead>
        <tbody>
          
          {dados.map((item) => (


            <tr key={item.id} >
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.idade}</td>
              <td>{item.dor}</td>
              <td>{item.data}</td>
            </tr>
          
            ))}
        </tbody>
      </table>
    );
  }
}

export default Caixa;
