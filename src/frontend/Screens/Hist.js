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
  const [filtroEmail, setFiltroEmail] = useState('');
  const [opcoesEmail, setOpcoesEmail] = useState([]); // Estado para armazenar as opções de e-mail disponíveis
  const URL = "http://localhost:8080/t";

  const tabelaPacRef = useRef(null); // Referência para o contêiner da tabela

  const scrollToRef = () => {
    if (tabelaPacRef.current) {
      window.scrollTo(0, tabelaPacRef.current.offsetTop);
    }
  };

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/emails");
        const emails = response.data;
        setOpcoesEmail(emails);
      } catch (error) {
        console.error("Erro ao obter os e-mails:", error);
      }
    };
  
    fetchEmails(); // Carrega os e-mails ao montar o componente
  }, []);
  
  const redirectToNewPage = (consultaId) => {
    navigate(`/Med/${consultaId}`); 
  };

  const handleNextButtonClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    scrollToRef();
  };

  const handlePrevButtonClick = () => {
    setCurrentPage(prevPage => prevPage - 1);
    scrollToRef();
  };

  const handleInputChange = (e) => {
    setFiltroEmail(e.target.value);
  };

  const handleFilterButtonClick = async () => {
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/?userId=${filtroEmail}`);
        const sortedConsultas = response.data.reverse(); 
        
        setConsultas(sortedConsultas);

        if (sortedConsultas.length > 0) {
          localStorage.setItem('consultaId', sortedConsultas[0].id);
        }
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };

    if (filtroEmail) {
      fetchData();
    }
  }, [filtroEmail]);

  useEffect(() => {
    const totalItems = consultas.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setShowNextButton(currentPage < totalPages);
    setShowPrevButton(currentPage > 1);
  }, [consultas, currentPage, itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consultas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <NavBarMed/>
      <h1>Histórico Por Paciente</h1>
      <div id="filtroContainer">
        <label htmlFor="filtroEmail">Filtrar por E-mail:</label>
        <select id="filtroEmail" value={filtroEmail} onChange={handleInputChange}>
          <option value="">Selecione um e-mail</option>
          {opcoesEmail.map((email, index) => (
            <option key={index} value={email}>{email}</option>
          ))}
        </select>
        <button id="filtroButton" onClick={handleFilterButtonClick}>Filtrar</button>
      </div>
      <table className="tabelaPac" ref={tabelaPacRef}>
        <thead>
          <tr>
            <th>E-mail</th>
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
              <td>{consulta.userId}</td>
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
