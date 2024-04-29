import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar";

const User = () => {
  return (
    <div className="useroptions">
      <NavBar/>
      <h1>Qual funcionalidade deseja utilizar?</h1>
      <Link to="/Triagem">
        <button>FAZER TRIAGEM</button>
      </Link>
      <br />
      <Link to="/Hospitais">
        <button>HOSPITAIS PRÓXIMOS</button>
      </Link>
      <br />

      <Link to="/HistUser">
        <button>HISTÓRICO</button>
      </Link>
      <br />
    </div>
  );
};

export default User;
