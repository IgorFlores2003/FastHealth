import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButtonMed from "../../../components/BackButtonMed";
import "./Medinfo.css";

function InformacoesTriagem() {
  const { consultaId } = useParams(); 
  const [consulta, setConsulta] = useState({ status: "pendente" }); 
  const [parecer, setParecer] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsulta = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/test/${consultaId}`
        ); 
        setConsulta(response.data);

      } catch (error) {
        console.error("Erro ao obter informações da consulta:", error);
      }
    };

    fetchConsulta();
  }, [consultaId]);

  const handleParecerChange = (event) => {
    setParecer(event.target.value);
  };

  const handleInputChange = (event) => {
    const minHeight = 50;
    const lineHeight = parseInt(window.getComputedStyle(event.target).lineHeight);
    const numLines = Math.ceil(event.target.scrollHeight / lineHeight);
    const newHeight = Math.max(minHeight, numLines * lineHeight);
    event.target.style.height = `${newHeight}px`;
    setParecer(event.target.value);
  };

  const enviarParecer = async () => {
    try {
      if (consulta.status === "pendente") { 
        await axios.post(`http://localhost:8080/tri/${consultaId}`, { parecer });
        setConsulta({ ...consulta, status: "finalizado", parecer }); 
        navigate(-1)
      } else if (consulta.status === "FINALIZADO") {
        await axios.put(`http://localhost:8080/t/${consultaId}`, { parecer });
        setConsulta({ ...consulta, parecer });
        navigate(-1);
      }
    } catch (error) {
      console.error("Erro ao enviar o parecer:", error);
    }
  };

  if (!consulta) {
    return <div className="loading">Carregando...</div>; 
  }

  return (
    <div>
      <BackButtonMed />
      <div className="centered-content">
        <h1 className="title">Informações da Coleta:</h1>
        <div>
          <h3>Local da Dor:</h3>
          <p>{consulta.dor}</p>
        </div>
        <div>
          <h3>Intensidade da Dor:</h3>
          <p>{consulta.intensidade}</p>
        </div>
        <div>
          <h3>Quanto Tempo Está com Dor:</h3>
          <p>{consulta.tempo + " " + consulta.tempo2}</p>
        </div>
        <div>
          <h3>Data da Última Triagem: </h3>
          <p>{consulta.dataAtual}</p>
        </div>
        <div>
          <h3>Pressão Arterial:</h3>
          <p>
            {(consulta.pressao || "Não Informado") +
              " X " +
              (consulta.pressao2 || "Não Informado")}
          </p>
        </div>
        <div>
          <h3>Temperatura: </h3>
          <p>{consulta.Temperatura || "Não Informado"}</p>
        </div>
        <div>
          <h3> Hospital Atendido: </h3>
          <p>{consulta.Hospital || "Não Informado"}</p>
        </div>
        <div>
          <h3>Descrição: </h3>
          <p>{consulta.descricao || "Não Informado"}</p>
        </div>
        <div>
          <h3>Parecer: </h3>
          <textarea 
            value={parecer} 
            onChange={handleParecerChange} 
            onInput={handleInputChange} 
            maxLength={200} 
            className="medInput" 
          />
          <button onClick={enviarParecer}>Enviar Parecer</button>
        </div>
      </div>
    </div>
  );
}

export default InformacoesTriagem;
