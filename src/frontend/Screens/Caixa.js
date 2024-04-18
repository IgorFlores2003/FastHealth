import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Caixa = () => {
    const dados = [
    { id: 1, nome: "Igor", idade: 21, dor: "9-10", data: "02/10/2024", local:"perna"},
      { id: 2, nome: "Clayton", idade: 49, dor: "4-5", data: "21/09/2024", local:"cabeça"},
      { id: 3, nome: "Jasmim", idade: 20, dor: "3-4", data: "22/10/2024", local:"braço"},
    ];

const navigate = useNavigate(); // Usando useNavigate para obter a função de navegação

const redirectToNewPage = () => {
  // Função para redirecionar para uma nova rota ao clicar na linha
  navigate('/triagem');
};

    return (
      <div> 
        <h1>Caixa de Entrada</h1>
      <table className="tabelaCaixa">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Local da Dor</th>
            <th>Nivel de Dor</th>
            <th>Data da Triagem</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr className="trCaixa" onClick={redirectToNewPage} key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.idade}</td>
              <td>{item.local}</td>
              <td>{item.dor}</td>
              <td>{item.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }
  

export default Caixa;
