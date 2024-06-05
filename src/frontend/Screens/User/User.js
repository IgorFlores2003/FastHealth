import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../components/Navbar";
import "../User/User.css";

const User = () => {
  return (
    <div>
      <NavBar/>
      <div className="useroptions">
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
    </div>
  );
};

export default User;
