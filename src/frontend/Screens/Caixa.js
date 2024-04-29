import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarMed from "../../components/NavBarMed";

const Caixa = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const URL = "http://localhost:8080/busca";
  const [currentPage, setCurrentPage] = useState(1);
  const [user,setUser] = useState();
  const itemsPerPage = 5; // Defina o número máximo de itens por tela aqui
  const [showButton, setShowButton] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
 
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const myRef = useRef(null);

  
  useEffect(() => {
      const fetchConsultas = async () => {
        try {
          const response2 = await axios.get(`http://localhost:8080/t`);
          const consultaI = response2.data;
          console.log(consultaI)
          setConsultas(consultaI);
          console.log(consultas);
        } catch (error) {
          console.error("Erro ao obter as consultas:", error);
        }
      };
  
      fetchConsultas();
  }, []);
  

  useEffect(() => {
    const totalItems = consultas.filter(
      (consulta) => consulta.Hospital === user
    ).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setShowButton(currentPage < totalPages);
    setShowBackButton(currentPage > 1);
  }, [consultas, currentPage, user, itemsPerPage]);

  const redirectToNewPage = (consultaId) => {
    navigate(`/informacoes/${consultaId}`);
  };

  const handleButtonClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    scrollToRef(myRef);
  };

  const handleBackButtonClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    scrollToRef(myRef);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consultas
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <NavBarMed />
      <h1>Caixa de Entrasa</h1>
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
          {currentItems.map((consulta) => (
            <tr
              className="trPac"
              key={consulta._id}
              onClick={() => redirectToNewPage(consulta._id)}
            >
              <td>{consulta._id}</td>
              <td>{consulta.intensidade}</td>
              <td>{consulta.dor}</td>
              <td>{consulta.dataAtual}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showButton && (
        <button className="buttonHis" onClick={handleButtonClick}>
          Próximo
        </button>
      )}
      <button
        className="buttonHis"
        onClick={handleBackButtonClick}
        disabled={!showBackButton}
      >
        Anterior
      </button>

      <div ref={myRef}></div>
    </div>
  );
};

export default Caixa;
