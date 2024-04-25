import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HistPac = () => {
  const navigate = useNavigate(); // Usando useNavigate para obter a função de navegação

  const redirectToNewPage = () => {
    // Função para redirecionar para uma nova rota ao clicar na linha
    navigate('/triagem');
  };

  const dados = [
    { id: 1, dor: "9-10", local: "Braço", data: "02/05/2024" },
    { id: 2, dor: "4-5", local: "Perna", data: "20/05/2024" },
    { id: 3, dor: "3-4", local: "Cabeça", data: "30/05/2024" },
  ];

  return (
<div>
  <h1>Histórico De Consultas</h1>
    <table className="tabelaPac">
      <thead>
        <tr>
          <th>ID</th>
          <th>Intensidade da Dor</th>
          <th>Local da Dor</th>
          <th>Data da Última Triagem</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((item) => (
          <tr className="trPac" key={item.id} onClick={redirectToNewPage}>
            <td>{item.id}</td>
            <td>{item.dor}</td>
            <td>{item.local}</td>
            <td>{item.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default HistPac;
