import React from "react";

class HistPac extends React.Component {
  render() {
    const dados = [
      { id: 1, dor: "9-10", local: "Braço", data: "02/05/2024" },
      { id: 2, dor: "4-5", local: " Perna", data: "20/05/2024" },
      { id: 3, dor: "3-4", local: "Cabeça", data: "30/05/2024" },
    ];

    return (
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Intensidade da Dor</th>
            <th>Local da Dor</th>
            <th>Dt. da Última Triagem</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.dor}</td>
              <td>{item.local}</td>
              <td>{item.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default HistPac;
