import React from "react";
import { Link } from "react-router-dom";
import NavBarMed from "../../components/NavBarMed";

const Med = () => {
  return (
    <div className="medoptions">
      <NavBarMed/>
      <h1>Qual funcionalidade deseja utilizar?</h1>
      <Link to="/Caixa">
        <button>CAIXA DE ENTRADA</button>
      </Link>
      <br />
      <Link to="/Hist">
        <button>HISTÓRICO POR PACIENTE</button>
      </Link>
    </div>
  );
};

export default Med;
