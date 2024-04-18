import img from "./Imagem/Logo.png";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Login = () => {

const userRef = useRef();

const [user, setUser] = useState();
const [psw, setPsw] = useState();
const [success, setSuccess] = useState();
const [err, setErr] = useState();

useEffect(() =>{
   userRef.current.focus();
},[])

const handleSubmit = async (e) =>{
   e.preventDefault();
   setUser('');
   setPsw('');
   setSuccess(true);
}
  return (
    <div className="container">
      <div className="imge">
        <img src={img} />
      </div>
      <div className="inputcont">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit}>
          <label>E-mail:</label>
          <input type="email" ref={userRef}placeholder="E-mail" required onChange={(e) => setUser(e.target.value)} value={user}></input>
          <br></br>

          <label>Senha:</label>
          <input type="password" placeholder="Senha"required onChange={(e) => setPsw(e.target.value)} value={psw}></input>
          <br></br>

          <button>Login</button>
          <Link to="/Cadastro" className="cad">
            Não possuo uma conta ainda
          </Link>
        </form>
      </div>
    </div>

        )}
      


export default Login;
