// InformacoesTriagem.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function InformacoesTriagem() {
  const { consultaId } = useParams(); // Obtém o ID da consulta da URL
  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    const fetchConsulta = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/t${consultaId}`); // Requisição para obter informações da consulta
        setConsulta(response.data);
      } catch (error) {
        console.error("Erro ao obter informações da consulta:", error);
      }
    };

    fetchConsulta();
  }, [consultaId]);

  if (!consulta) {
    return <div>Carregando...</div>; // Exibe "Carregando..." enquanto as informações estão sendo buscadas
  }

  return (
    <div>
      <h2>Informações da Triagem</h2>
      <p>ID da Consulta: {consulta._id}</p>
      <p>Intensidade da Dor: {consulta.intensidade}</p>
      <p>Local da Dor: {consulta.dor}</p>
      <p>Data da Última Triagem: {consulta.dataAtual}</p>
      {/* Exiba outras informações da triagem conforme necessário */}
    </div>
  );
}

export default InformacoesTriagem;
