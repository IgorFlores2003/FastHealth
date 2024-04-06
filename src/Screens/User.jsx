import React from "react";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <div className="useroptions">
        <h1>Qual Funcionalidade deseja utilizar?</h1>
        <Link to="/Triagem">
          <button>Fazer Triagem</button>
        </Link><br />
        <Link to="/Hospitais">
          <button>Hospitais Próximos</button>
        </Link><br />

        <Link to="/HistUser">
          <button>Histórico</button>
        </Link><br />
    </div>
  );
};

export default User;
