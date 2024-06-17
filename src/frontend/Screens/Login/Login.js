import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../Imagem/Logo.png";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";
import "../Login/Login.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./Login.css";

function Login() {
  const URL = "http://localhost:8080";
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${URL}/?email=${login.email}`);
      const users = response.data;

      if (users.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Email não cadastrado!",
          text: "Ops! Este email não está cadastrado em nossa plataforma. Por favor, verifique o email informado ou crie uma nova conta se ainda não estiver registrado conosco.",
        });
      } else {
        let authenticated = false;
        let emailMatch = false;

        for (const user of users) {
          if (user.email === login.email) {
            emailMatch = true;
            const passwordMatch = await bcrypt.compare(
              login.password,
              user.password
            );
            if (passwordMatch) {
              authenticated = true;
              const userName = user.name;
              Swal.fire({
                icon: "success",
                title: "Login Efetuado",
                text: `Login bem-sucedido! Bem-vindo, ${userName}!`,
              });
              navigate(user.tipoUsuario === "medico" ? "/Meduser" : "/Pacuser");
              const usuarioLogado = user.email;
              const hospitalDoUsuarioLogado = user.hospital;
              const name = user.name;

              localStorage.setItem("loggedInUser", usuarioLogado);
              localStorage.setItem("hospital", hospitalDoUsuarioLogado);
              localStorage.setItem("nome", name);

              console.log(usuarioLogado);
              console.log(hospitalDoUsuarioLogado);
              console.log(name);
              break;
            } else {
              Swal.fire({
                icon: "error",
                title: "Senha incorreta!",
                text: "A senha fornecida está incorreta. Por favor, verifique e tente novamente.",
              });
              break;
            }
          }
        }

        if (!emailMatch) {
          Swal.fire({
            icon: "warning",
            title: "Email não cadastrado!",
            text: "Ops! Este email não está cadastrado em nossa plataforma. Por favor, verifique o email informado ou crie uma nova conta se ainda não estiver registrado conosco.",
          });
        } else if (!authenticated) {
          Swal.fire({
            icon: "error",
            title: "Senha incorreta!",
            text: "A senha fornecida está incorreta. Por favor, verifique e tente novamente.",
          });
        }
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      Swal.fire({
        icon: "error",
        title: "Erro de Login",
        text: "Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pages">
      <div className="areaLogin">
        <img src={img} alt="Logo" />
      </div>
      <div className="formLogin">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            value={login.email}
            onChange={handleInputChange}
          />
          <br />
          <div className="password-input-container">
          <label>Senha:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="***********"
              required
              value={login.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <br />
          <button type="submit" className="bt">
            Login
          </button>
          <Link to="/Cadastro" className="cad">
            Não possuo uma conta ainda
          </Link>
        </form>
      </div>
      <footer className="poli"><Link to="/Politica" >Politica de Privacidade</Link></footer>
    </div>
  );
}

export default Login;
