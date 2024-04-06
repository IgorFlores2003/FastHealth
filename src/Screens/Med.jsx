import React from "react";
import { Link } from "react-router-dom";

const Med = () => {
  return (
    <div className="medoptions">
    
        <h1>Qual Funcionalidade deseja utilizar?</h1>
        <Link to="/Caixa">
          <button>Caixa de Entrada</button>
        </Link><br />
        <Link to="/Hist">
          <button>Histórico por Paciente</button>
        </Link>
      
      </div>
  );
};

export default Med;
