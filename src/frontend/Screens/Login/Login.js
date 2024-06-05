import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../Imagem/Logo.png";
import Swal from 'sweetalert2';
import "../Login/Login.css"

function Login() {
  const URL = "http://localhost:8080";
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Faz uma requisição GET para buscar os usuários pelo email
      const response = await axios.get(`${URL}/?email=${login.email}`);
      
      const users = response.data; // Recebe um array de usuários com o email fornecido
  
      // Verifica se há usuários com o email fornecido
      if (users.length === 0) {
        // Nenhum usuário encontrado com o email fornecido
        Swal.fire({
          icon: 'warning',
          title: 'Email não cadastrado!',
          text: 'Ops! Este email não está cadastrado em nossa plataforma. Por favor, verifique o email informado ou crie uma nova conta se ainda não estiver registrado conosco.'
        });
      } else {
        // Verifica cada usuário retornado
        let authenticated = false;
        let emailMatch = false;
  
        for (const user of users) {
          if (user.email === login.email) {
            emailMatch = true; // Indica que encontramos um usuário com o email fornecido
            if (user.password === login.password) {
              // Usuário autenticado com sucesso
              authenticated = true;
              const userName = user.name;
              Swal.fire({
                icon: 'success',
                title: 'Login Efetuado',
                text: `Login bem-sucedido! Bem-vindo, ${userName}!`
              });
              navigate(user.tipoUsuario === 'medico' ? "/Meduser" : "/Pacuser");
              const usuarioLogado = user.email
              const hospitalDoUsuarioLogado = user.hospital
              const name = user.name
             
              localStorage.setItem('loggedInUser', usuarioLogado);
              localStorage.setItem('hospital', hospitalDoUsuarioLogado);
              localStorage.setItem('nome', name);
              

              console.log(usuarioLogado)
              console.log(hospitalDoUsuarioLogado)
              console.log(name)
              break; // Para o loop ao encontrar um usuário autenticado
            } else {
              // Senha incorreta para o email correspondente
              Swal.fire({
                icon: 'error',
                title: 'Senha incorreta!',
                text: 'A senha fornecida está incorreta. Por favor, verifique e tente novamente.'
              });
              break; // Para o loop após encontrar um email correspondente, mesmo que a senha esteja incorreta
            }
          }
        }
  
        if (!emailMatch) {
          // Nenhum usuário encontrado com o email fornecido
          Swal.fire({
            icon: 'warning',
            title: 'Email não cadastrado!',
            text: 'Ops! Este email não está cadastrado em nossa plataforma. Por favor, verifique o email informado ou crie uma nova conta se ainda não estiver registrado conosco.'
          });
        } else if (!authenticated) {
          // Email encontrado, mas senha incorreta para todos os usuários correspondentes
          Swal.fire({
            icon: 'error',
            title: 'Senha incorreta!',
            text: 'A senha fornecida está incorreta. Por favor, verifique e tente novamente.'
          });
        }
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro de Login',
        text: 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.'
      });
    }
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
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            placeholder="Senha"
            required
            value={login.password}
            onChange={handleInputChange}
          />
          <br />
          <button type="submit" className="bt">Login</button>
          <Link to="/Cadastro" className="cad">Não possuo uma conta ainda</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;