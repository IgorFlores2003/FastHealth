import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarMed from "../../components/NavBarMed";

const Caixa = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showNextButton, setShowNextButton] = useState(false);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const hospital = localStorage.getItem('hospital');
  const URL = "http://localhost:8080/tr";

  const scrollToRef = (ref) => {
    if (ref.current !== null) {
      window.scrollTo(0, ref.current.offsetTop);
    }
  };

  const myRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/?hospital=${hospital}`);

        const sortedConsultas = response.data.reverse(); 
        
        setConsultas(sortedConsultas);

        if (sortedConsultas.length > 0) {
          localStorage.setItem('consultaId', sortedConsultas[0].id);
        }

        console.log("Fetched Consultas:", sortedConsultas); // Add this line
        
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };
  
    if (hospital) {
      fetchData();
    }
  }, [hospital]);

  useEffect(() => {
    const totalItems = consultas.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setShowNextButton(currentPage < totalPages);
    setShowPrevButton(currentPage > 1);
  }, [consultas, currentPage, itemsPerPage]);

  const redirectToNewPage = (consultaId) => {
    console.log("Redirecting to consulta ID:", consultaId); // Add this line
    navigate(`/Med/${consultaId}`); 
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
      <NavBarMed/>
      <h1>Caixa de Entrada</h1>
      <table className="tabelaPac">
        <thead>
          <tr>
           
            <th>Intensidade da Dor</th>
            <th>Local da Dor</th>
            <th>Quanto Tempo está Doendo</th>
            <th>Data da Coleta de Dados</th>
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
              <td>{consulta.tempo + " " + consulta.tempo2}</td>
              <td>{consulta.dataAtual}</td>
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
    </div>
  );
};

export default Caixa;
