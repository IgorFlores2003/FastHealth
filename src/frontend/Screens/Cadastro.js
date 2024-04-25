import React, { useState } from "react";
import img from "../Screens/Imagem/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

function Cadastro() {
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    hospital: '',
    endereco: '',
    crm: '',
    cpf: '',
    tipoUsuario: '' 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });

    console.log(userForm)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
      
        const emailResponse = await axios.get(`http://localhost:8080/?email=${userForm.email}`);
        const existingEmail = emailResponse.data.find(user => user.email === userForm.email);
        if (existingEmail) {
          Swal.fire({
            icon: 'error',
            title: 'Email já cadastrado!',
            text: 'O email informado já está cadastrado. Por favor, utilize outro email.'
          });
          return; 
        }
  
        
        const senhaResponse = await axios.get(`http://localhost:8080/?password=${userForm.password}`);
        const existingPassword = senhaResponse.data.find(user => user.password === userForm.password);
        if (existingPassword) {
          Swal.fire({
            icon: 'error',
            title: 'Senha já cadastrada!',
            text: 'A senha informada já está cadastrada. Por favor, utilize outra senha.'
          });
          return; 
        }
  
        const cpfResponse = await axios.get(`http://localhost:8080/?cpf=${userForm.cpf}`);
        const existingCPF = cpfResponse.data.find(user => user.cpf === userForm.cpf);
        if (existingCPF) {
          Swal.fire({
            icon: 'error',
            title: 'CPF já cadastrado!',
            text: 'O CPF informado já está cadastrado. Por favor, utilize outro CPF.'
          });
          return; 
        }
          const crmResponse = await axios.get(`http://localhost:8080/?crm=${userForm.crm}`);
          const existingCRM = crmResponse.data.find(user => user.crm === userForm.crm);
          if (existingCRM) {
            Swal.fire({
              icon: 'error',
              title: 'CRM já cadastrado!',
              text: 'O CRM informado já está cadastrado. Por favor, utilize outro CRM.'
            });
            return; 
          }

      await axios.post('http://localhost:8080/', userForm);

      setUserForm({
        name: '',
        email: '',
        password: '',
        hospital: '',
        endereco: '',
        crm: '',
        cpf: '',
        tipoUsuario: userForm.tipoUsuario  // Garante que o tipoUsuario seja mantido para o próximo cadastro
      });

      Swal.fire({
        icon: 'success',
        title: 'Cadastro Efetuado com Sucesso',
        text: 'Seja bem-vindo ao Fast Health!'
      });

      navigate("/");

    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);

      Swal.fire({
        icon: 'error',
        title: 'Erro ao Cadastrar',
        text: 'Ocorreu um erro ao cadastrar. Por favor, tente novamente.'
      });
    }
  }

  return (
    <div className="container">
      <div className="imge">
        <img src={img} alt="Logo" />
      </div>
      <div className="inputcont">
        <h1 className="title ">Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input type="text" name="name" placeholder="Nome" required value={userForm.name} onChange={handleInputChange} />
          <br />

          <label>E-mail:</label>
          <input type="email" name="email" placeholder="E-mail" required value={userForm.email} onChange={handleInputChange} />
          <br />

          <label>Senha:</label>
          <input type="password" name="password" placeholder="Senha" required value={userForm.password} onChange={handleInputChange} />
          <br />

          <label>
            <input
              type="radio"
              name="tipoUsuario"
              value="medico"
              checked={userForm.tipoUsuario === "medico"}
              onChange={handleInputChange}
            />
            Médico
          </label>
          <label>
            <input
              type="radio"
              name="tipoUsuario"
              value="paciente"
              checked={userForm.tipoUsuario === "paciente"}
              onChange={handleInputChange}
            />
            Paciente
          </label>
          <br />

          {userForm.tipoUsuario === "medico" && (
            <div>
              <label>Hospital:</label>
              <input type="text" name="hospital" placeholder="Nome do Hospital" required value={userForm.hospital} onChange={handleInputChange} />
              <br />

              <label>Endereço:</label>
              <input type="text" name="endereco" placeholder="Endereço do Hospital" required value={userForm.endereco} onChange={handleInputChange} />
              <br />

              <label>CRM:</label>
              <input type="text" name="crm" className="crm" placeholder="Inserir CRM" required value={userForm.crm} onChange={handleInputChange} />
              <br />
            </div>
          )}

          {userForm.tipoUsuario === "paciente" && (
            <div>
              <label>CPF:</label>
              <input type="text" name="cpf" id="cpf" placeholder="CPF" maxLength={11} value={userForm.cpf} onChange={handleInputChange} />
              <br />
            </div>
          )}

          <button className="buttonReg" type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
