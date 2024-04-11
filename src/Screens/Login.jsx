import img from "../Imagem/Logo.png";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container">
      <div className="imge">
        <img src={img} />
      </div>
      <div className="inputcont">
        <h1 className="title">Login</h1>
        <form>
          <label>E-mail</label>
          <input type="email" placeholder="E-mail"></input>
          <br></br>

          <label>Senha</label>
          <input type="password" placeholder="Senha"></input>
          <br></br>

          <button >Login</button>
          <Link to="/Cadastro" className="cad">
            Não Possuo uma conta ainda
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
