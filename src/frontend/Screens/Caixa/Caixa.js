import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarMed from "../../../components/NavBarMed";
import "./index.css";

const Caixa = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showNextButton, setShowNextButton] = useState(false);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [filter, setFilter] = useState("all");
  const hospital = localStorage.getItem('hospital');
  const URL = "http://localhost:8080/tr";
  const myRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current !== null) {
      window.scrollTo(0, ref.current.offsetTop);
    }
  };

  const filteredConsultas = consultas.filter(consulta => {
    if (filter === "all") {
      return true;
    } else {
      return consulta.status.toLowerCase() === filter.toLowerCase();
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/?hospital=${hospital}`);
        const sortedConsultas = response.data.reverse();
        setConsultas(sortedConsultas);

        if (sortedConsultas.length > 0) {
          localStorage.setItem('consultaId', sortedConsultas[0].id);
        }
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };

    if (hospital) {
      fetchData();
    }
  }, [hospital]);

  useEffect(() => {
    const totalItems = filteredConsultas.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setShowNextButton(currentPage < totalPages);
    setShowPrevButton(currentPage > 1);
  }, [filteredConsultas, currentPage, itemsPerPage]);

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); 
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredConsultas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <NavBarMed />
      <h1>Caixa de Entrada</h1>

      <div className="filter-container">
        <label htmlFor="filter">Filtrar por Status:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">Todas</option>
          <option value="pendente">Pendentes</option>
          <option value="finalizado">Finalizadas</option>
        </select>
      </div>

      <table className="tabelaPac">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Intensidade da Dor</th>
            <th>Local da Dor</th>
            <th>Quanto Tempo está Doendo</th>
            <th>Data da Coleta de Dados</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((consulta) => (
            <tr
              className="trPac"
              key={consulta.id}
              onClick={() => redirectToNewPage(consulta.id)}
            >
              <td>{consulta.name}</td>
              <td>{consulta.intensidade}</td>
              <td>{consulta.dor}</td>
              <td>{consulta.tempo + " " + consulta.tempo2}</td>
              <td>{consulta.dataAtual}</td>
              <td>{consulta.status}</td>
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
