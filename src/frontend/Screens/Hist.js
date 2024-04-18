import React from "react";
import { useNavigate } from "react-router-dom";

const Hist = () => {
  
    const dados = [
      { id: 1, nome: "Igor", idade: 21, data: "02/05/2024" },
      { id: 2, nome: "Clayton", idade: 49, data: "12/05/2024" },
      { id: 3, nome: "Yasmim", idade: 20, data: "23/05/2024" },
    ];      const navigate = useNavigate(); // Usando useNavigate para obter a função de navegação
    
      const redirectToNewPage = () => {
        // Função para redirecionar para uma nova rota ao clicar na linha
        navigate('/triagem');
      };
    
    return (
      <div>
      <h1>Histórico Por Paciente</h1>
      <table className="tabelaHis">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Data da Última Triagem</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr className="trHis"onClick={redirectToNewPage} key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.idade}</td>
              <td>{item.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }


export default Hist;
