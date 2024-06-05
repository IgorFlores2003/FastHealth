// InformacoesTriagem.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton/index";
import "../TriInformation/TriInformation.css";

function Informacoes() {
  const { consultaId } = useParams();
  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    const fetchConsulta = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/test/${consultaId}`); 
        setConsulta(response.data);
      } catch (error) {
        console.error("Erro ao obter informações da consulta:", error);
      }
    };

    fetchConsulta();
  }, [consultaId]);

  if (!consulta) {
    return <div className="loading">Carregando...</div>; 
  }

  return (
    <div>
      <BackButton/>
    <div className="centered-content">
    <h1 className="title">Informações da Coleta de Dados do Paciente:</h1>
    <div>
      <h3>ID da Consulta:</h3>
      <p>{consulta.id}</p>
      </div>
      <div>
      <h3>Local da Dor:</h3>
{consulta.dor === "outros" ? (
  <p>{consulta.outro}</p>
) : (
  <p>{consulta.dor}</p>
)}
      </div>
      <div>
      <h3>Intensidade da Dor:</h3>
      <p>{consulta.intensidade }</p>
      </div>
      <div>
      <h3>Quanto Tempo Está com Dor:</h3>
      <p>{consulta.tempo  + " " + consulta.tempo2}</p>
      </div>
      <div>
      <h3>Data da Última Triagem: </h3>
      <p>{consulta.dataAtual }</p>
      </div>
      <div>
      <h3>Pressão Arterial:</h3>
      <p>{(consulta.pressao || "Não Informado") + " X " + (consulta.pressao2 || "Não Informado")}</p>

      </div>
      <div>
      <h3>Temperatura: </h3>
      <p>{consulta.Temperatura ? consulta.Temperatura + " º Graus" : "Não Informado"}</p>
      </div>
      <div>
      <h3> Hospital Atendido: </h3>
      <p>{consulta.Hospital || "Não Informado"}</p>
      </div>
      <div>
      <h3>Descrição: </h3>
      <p>{consulta.descricao || "Não Informado"}</p>
      </div>
      <p></p>
    </div>
    </div>
  );
}

export default Informacoes;
