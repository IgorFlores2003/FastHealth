import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarMed from "../../components/NavBarMed";

const Hist = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showNextButton, setShowNextButton] = useState(false);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const hospital = localStorage.getItem('hospital');
  const URL = "http://localhost:8080/tr";

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const myRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8080/users/${localStorage.getItem('loggedInUser')}`);
        const userHospital = userResponse.data.hospital;
        
        const response = await axios.get(`${URL}/?hospital=${userHospital}`);
        const resposta = response.data;
       
        setConsultas(resposta);
        if (resposta.length > 0) {
          localStorage.setItem('consultaId', resposta[0]._id);
        }
        
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obter o hospital associado ao usuário logado
        const userResponse = await axios.get(`http://localhost:8080/users/${localStorage.getItem('loggedInUser')}`);
        const userHospital = userResponse.data.hospital;
        
        // Obter as triagens associadas ao hospital do usuário logado
        const response = await axios.get(`${URL}/?hospital=${userHospital}`);
        const resposta = response.data;
       
        setConsultas(resposta);
        if (resposta.length > 0) {
          localStorage.setItem('consultaId', resposta[0]._id);
        }
        
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const totalItems = consultas.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setShowNextButton(currentPage < totalPages);
    setShowPrevButton(currentPage > 1);
  }, [consultas, currentPage, itemsPerPage]);

  const redirectToNewPage = (consultaId) => {
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
      <h1>Histórico Por Paciente</h1>
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

export default Hist;
