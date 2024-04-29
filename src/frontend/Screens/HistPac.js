import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar";

const HistPac = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const URL = "http://localhost:8080/t";
  const idUser = localStorage.getItem('loggedInUser');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Defina o número máximo de itens por tela aqui
  const [showButton, setShowButton] = useState(false);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const myRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/?userId=${idUser}`);
        const resposta = response.data;
       
        setConsultas(resposta);
        console.log(consultas)
        if (consultas.length > 0) {
          localStorage.setItem('consultaId', consultas[0]._id);
        }
        
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };

    if (idUser) {
      fetchData();
    }
  }, [idUser]);

  useEffect(() => {
    const totalItems = consultas.filter(consulta => consulta.userId === idUser).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [consultas, currentPage, idUser, itemsPerPage]);

  const redirectToNewPage = (consultaId) => {
    navigate(`/informacoes/${consultaId}`); // Rota corrigida para `/informacoes/:consultaId`
  };
  const handleButtonClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    scrollToRef(myRef);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consultas.filter(consulta => consulta.userId === idUser).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <NavBar />
      <h1>Histórico de Consultas</h1>
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
        <button className="buttonHis" onClick={handleButtonClick}>Ir para mais resultados</button>
      )}
      <div ref={myRef}></div>
    </div>
  );
};

export default HistPac;