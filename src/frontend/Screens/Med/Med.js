import React from "react";
import { Link } from "react-router-dom";
import NavBarMed from "../../../components/NavBarMed";
import "../Med/Med.css";

const Med = () => {
  return (
  <div>
      <NavBarMed/>
      <div className="medoptions">
      <h1>Qual funcionalidade deseja utilizar?</h1>
      <Link to="/Caixa">
        <button>CAIXA DE ENTRADA</button>
      </Link>
      <br />
      <Link to="/Hist">
        <button>HISTÓRICO POR PACIENTE</button>
      </Link>
    </div></div>
  );
};

export default Med;
