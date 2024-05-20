import React, { useState } from "react";
import img from "../Screens/Imagem/Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { validator } from 'cpf-cnpj-validator';

function Cadastro() {
  const Joi = require('@hapi/joi').extend(validator)
  const cpfSchema = Joi.document().cpf();

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
  };

  const handleCPChange = (e) => {
    let { name, value } = e.target;
    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '');
    // Formata o CPF enquanto o usuário digita
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setUserForm({ ...userForm, [name]: value });
  };
 
  const handleCRMChange = (e) => {
    let { name, value } = e.target;
    // Remove todos os caracteres não alfanuméricos
    value = value.replace(/[^a-zA-Z0-9]/g, '');
    // Limita o CRM a 9 caracteres
    value = value.slice(0, 9);
    // Adiciona a barra (/) após o sexto dígito, se necessário
    if (value.length > 6) {
      value = value.replace(/^(\d{6})([a-zA-Z]{0,2})$/, '$1/$2');
    }
    // Atualiza o estado userForm
    setUserForm({ ...userForm, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userForm.tipoUsuario === "medico" && !userForm.crm) {
      Swal.fire({
        icon: 'error',
        title: 'CRM não preenchido!',
        text: 'Por favor, preencha o campo CRM.'
      });
      return;
    }
  
    // Verifica se o tipo de usuário é paciente e se o CPF está preenchido
    if (userForm.tipoUsuario === "paciente" && !userForm.cpf) {
      Swal.fire({
        icon: 'error',
        title: 'CPF não preenchido!',
        text: 'Por favor, preencha o campo CPF.'
      });
      return;
    }

    if (!cpfSchema.validate(userForm.cpf)) {
      Swal.fire({
        icon: 'error',
        title: 'CPF inválido!',
        text: 'Por favor, insira um CPF válido.'
      });
      return;
    }

    if (!userForm.tipoUsuario) {
      Swal.fire({
        icon: 'error',
        title: 'Tipo de usuário não selecionado!',
        text: 'Por favor, selecione se você é um Médico ou um Paciente.'
      });
      return;
    }

      // Validar CRM para médicos
  if (userForm.tipoUsuario === "medico" && !/^(\d{6})\/([a-zA-Z]{2})$/.test(userForm.crm)) {
    Swal.fire({
      icon: 'error',
      title: 'CRM inválido!',
      text: 'O CRM deve estar no formato: 000000/AA'
    });
    return;
  }
  
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
  
      // Verificar se o CPF já está cadastrado
      const cpfResponse = await axios.get(`http://localhost:8080/?cpf=${userForm.cpf}`);
      const existingCPF = cpfResponse.data.find(user => user.cpf === userForm.cpf);
      if (existingCPF && userForm.cpf !== '') {
        Swal.fire({
          icon: 'error',
          title: 'CPF já cadastrado!',
          text: 'O CPF informado já está cadastrado. Por favor, utilize outro CPF.'
        });
        return; 
      }
  
      const crmResponse = await axios.get(`http://localhost:8080/?crm=${userForm.crm}`);
      const existingCRM = crmResponse.data.find(user => user.crm === userForm.crm);

      if (existingCRM && userForm.crm !== '') {
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
        text: 'Ocorreu um erro ao cadastrar . Por favor, tente novamente.'
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
              <input type="text" name="crm" className="crm" placeholder="Inserir CRM" maxLength={9} required value={userForm.crm} onChange={handleCRMChange} />
              <br />
            </div>
          )}

          {userForm.tipoUsuario === "paciente" && (
            <div>
              <label>CPF:</label>
              <input type="text" name="cpf" id="cpf" placeholder="CPF" maxLength={14} require value={userForm.cpf} onChange={handleCPChange} />
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
