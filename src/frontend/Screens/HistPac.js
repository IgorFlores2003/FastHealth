import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar";

const HistPac = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const loggedInUserId = localStorage.getItem('loggedInUser');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showNextButton, setShowNextButton] = useState(false);
  const [showPrevButton, setShowPrevButton] = useState(false);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const myRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/t?userId=${loggedInUserId}`);
        
        const sortedConsultas = response.data.reverse(); 
        setConsultas(sortedConsultas);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };
  
    if (loggedInUserId) {
      fetchData();
    }
  }, [loggedInUserId]);

  useEffect(() => {
    const totalItems = consultas.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setShowNextButton(currentPage < totalPages);
    setShowPrevButton(currentPage > 1);
  }, [consultas, currentPage, itemsPerPage]);

  const redirectToNewPage = (consultaId) => {
    navigate(`/informacoes/${consultaId}`);
  };

  const handleNextButtonClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    scrollToRef(myRef);
  };

  const handlePrevButtonClick = () => {
    setCurrentPage(prevPage => prevPage - 1);
    scrollToRef(myRef);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consultas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <NavBar />
      <h1>Histórico de Consultas</h1>
      <table className="tabelaPac">
        <thead>
          <tr>
           
            <th>Intensidade da Dor</th>
            <th>Local da Dor</th>
            <th>Data da Coleta de Dados</th>
            <th>Hospital Atendido</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((consulta) => (
            <tr
              className="trPac"
              key={consulta.id}
              onClick={() => redirectToNewPage(consulta.id)}
            >
          
              <td>{consulta.intensidade}</td>
              <td>{consulta.dor}</td>
              <td>{consulta.dataAtual}</td>
              <td>{consulta.Hospital}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {showPrevButton && (
          <button className="buttonHis" onClick={handlePrevButtonClick}>Voltar</button>
        )}
        {showNextButton && (
          <button className="buttonHis" onClick={handleNextButtonClick}>Ir para mais resultados</button>
        )}
      </div>
      <div ref={myRef}></div>
    </div>
  );
};

export default HistPac;
