import React, { useState } from "react";
import img from "./Imagem/Logo.png";
import axios from "axios";
import { cpf } from "cpf-cnpj-validator";

function Cadastro() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    hospital: "",
    endereco: "",
    crm: "",
    cpf: ""
  });

  const [tipoUsuario, setTipoUsuario] = useState(""); // estado para controlar o tipo de usuário

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleTipoUsuarioChange = (event) => {
    setTipoUsuario(event.target.value); // atualiza o estado com o valor selecionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/', formValues);

      console.log('Resposta da API:', response.data);
      // Limpar o formulário após o envio bem-sucedido (opcional)
      setFormValues({
        name: '',
        email: '',
        password: '',
        hospital: '',
        endereco: '',
        crm: '',
        cpf: ''
      });
      
      // Adicione aqui qualquer lógica adicional após o envio bem-sucedido
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      // Adicione aqui o tratamento de erro, se necessário
    }
  };

  return (
    <div className="container">
      <div className="imge">
        <img src={img} alt="Logo" />
      </div>
      <div className="inputcont">
        <h1 className="title">Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Nome"
            required
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <br />

          <label>E-mail:</label>
          <input
            type="email"
            placeholder="E-mail"
            required
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <br />

          <label>Senha:</label>
          <input
            type="password"
            placeholder="Senha"
            required
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <br />

          <label>
            <input
              type="radio"
              name="tipoUsuario"
              value="medico"
              checked={tipoUsuario === "medico"}
              onChange={handleTipoUsuarioChange}
            />
            Médico
          </label>
          <label>
            <input
              type="radio"
              name="tipoUsuario"
              value="paciente"
              checked={tipoUsuario === "paciente"}
              onChange={handleTipoUsuarioChange}
            />
            Paciente
          </label>
          <br />

          {tipoUsuario === "medico" && (
            <div>
              <div>
                <label>Hospital:</label>
                <input
                  type="text"
                  placeholder="Nome do Hospital"
                  required
                  name="hospital"
                  value={formValues.hospital}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Endereço:</label>
                <input
                  type="text"
                  placeholder="Endereço do Hospital"
                  required
                  name="endereco"
                  value={formValues.endereco}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>CRM:</label>
                <input
                  className="crm"
                  type="text"
                  placeholder="Inserir CRM"
                  required
                  name="crm"
                  value={formValues.crm}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {tipoUsuario === "paciente" && (
            <div>
              <br />
              <label>CPF:</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="CPF"
                maxLength={11}
                value={formValues.cpf}
                onChange={handleInputChange}
              />
              <br />
            </div>
          )}

          <button className="buttonReg" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
