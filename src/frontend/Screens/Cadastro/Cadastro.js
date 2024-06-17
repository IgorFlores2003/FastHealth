import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { validator } from "cpf-cnpj-validator";
import "../Cadastro/Cadastro.css";
import RequiredField from "../../../components/RequiredField/required";

function Cadastro() {
  const Joi = require("@hapi/joi").extend(validator);
  const cpfSchema = Joi.document().cpf();

  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    hospital: "",
    endereco: "",
    crm: "",
    cpf: "",
    tipoUsuario: "",
    crmEstado: "",
  });

  const [estadosBrasil, setEstadosBrasil] = useState([]);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const siglas = response.data.map(estado => estado.sigla);
        setEstadosBrasil(siglas);
      } catch (error) {
        console.error("Erro ao buscar estados do Brasil:", error);
      }
    };

    fetchEstados();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === "medico") {
      setUserForm({ ...userForm, [name]: value, cpf: "" }); 
    } else {
      setUserForm({ ...userForm, [name]: value });
    }
  };


  const handleCPFChange = (e) => {
    let { name, value } = e.target;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setUserForm({ ...userForm, [name]: value });
  };

  const handleCRMChange = (e) => {
    let { name, value } = e.target;
    value = value.replace(/[^0-9]/g, "");
    value = value.slice(0, 6);
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userForm.tipoUsuario === "medico" &&
      (!userForm.crm || !userForm.crmEstado)
    ) {
      Swal.fire({
        icon: "error",
        title: "CRM ou estado não preenchido!",
        text: "Por favor, preencha ambos os campos CRM e estado.",
      });
      return;
    }

    if (userForm.tipoUsuario === "paciente" && !userForm.cpf) {
      Swal.fire({
        icon: "error",
        title: "CPF não preenchido!",
        text: "Por favor, preencha o campo CPF.",
      });
      return;
    }

    if (!cpfSchema.validate(userForm.cpf)) {
      Swal.fire({
        icon: "error",
        title: "CPF inválido!",
        text: "Por favor, insira um CPF válido.",
      });
      return;
    }

    if (!userForm.tipoUsuario) {
      Swal.fire({
        icon: "error",
        title: "Tipo de usuário não selecionado!",
        text: "Por favor, selecione se você é um Médico ou um Paciente.",
      });
      return;
    }

    const crmCompleto = `${userForm.crm}/${userForm.crmEstado}`;

    try {
      const emailResponse = await axios.get(
        `http://localhost:8080/?email=${userForm.email}`
      );
      const existingEmail = emailResponse.data.find(
        (user) => user.email === userForm.email
      );
      if (existingEmail) {
        Swal.fire({
          icon: "error",
          title: "Email já cadastrado!",
          text: "O email informado já está cadastrado. Por favor, utilize outro email.",
        });
        return;
      }

      const cpfResponse = await axios.get(
        `http://localhost:8080/?cpf=${userForm.cpf}`
      );
      const existingCPF = cpfResponse.data.find(
        (user) => user.cpf === userForm.cpf
      );
      if (existingCPF && userForm.cpf !== "") {
        Swal.fire({
          icon: "error",
          title: "CPF já cadastrado!",
          text: "O CPF informado já está cadastrado. Por favor, utilize outro CPF.",
        });
        return;
      }

      const crmResponse = await axios.get(
        `http://localhost:8080/?crm=${crmCompleto}`
      );
      const existingCRM = crmResponse.data.find(
        (user) => user.crm === crmCompleto
      );
      if (existingCRM && userForm.crm !== "") {
        Swal.fire({
          icon: "error",
          title: "CRM já cadastrado!",
          text: "O CRM informado já está cadastrado. Por favor, utilize outro CRM.",
        });
        return;
      }

      const newUserForm = { ...userForm, crm: crmCompleto };
      await axios.post("http://localhost:8080/", newUserForm);

      setUserForm({
        name: "",
        email: "",
        password: "",
        hospital: "",
        endereco: "",
        crm: "",
        cpf: "",
        tipoUsuario: userForm.tipoUsuario,
        crmEstado: "",
      });

      Swal.fire({
        icon: "success",
        title: "Cadastro Efetuado com Sucesso",
        text: "Seja bem-vindo ao Fast Health!",
      });

      navigate("/");
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);

      Swal.fire({
        icon: "error",
        title: "Erro ao Cadastrar",
        text: "Ocorreu um erro ao cadastrar. Por favor, tente novamente.",
      });
    }
  };

  return (
    <div className="page">
      <div className="formCad">
        <form className="formLogin" onSubmit={handleSubmit}>
          <h1>Cadastro</h1>
          <RequiredField> <label>Nome:</label></RequiredField>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            required
            value={userForm.name}
            onChange={handleInputChange}
          />
          <br />

          <RequiredField> <label>E-mail:</label></RequiredField>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            value={userForm.email}
            onChange={handleInputChange}
          />
          <br />

          <RequiredField><label>Senha:</label></RequiredField>
          <input
            type="password"
            name="password"
            placeholder="Senha"
            required
            value={userForm.password}
            onChange={handleInputChange}
          />
          <br />

          <RequiredField><label>Tipo usuário:</label></RequiredField>
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
              <RequiredField><label>Hospital:</label></RequiredField>
              <input
                type="text"
                name="hospital"
                placeholder="Nome do Hospital"
                required
                value={userForm.hospital}
                onChange={handleInputChange}
              />
              <br />

              <RequiredField><label>Endereço:</label></RequiredField>
              <input
                type="text"
                name="endereco"
                placeholder="Endereço do Hospital"
                required
                value={userForm.endereco}
                onChange={handleInputChange}
              />
              <br />

              <div className="crm-container">
              <RequiredField> <label>CRM:</label></RequiredField>
                <input
                  type="text"
                  name="crm"
                  className="crm"
                  placeholder="Inserir CRM"
                  maxLength={6}
                  required
                  value={userForm.crm}
                  onChange={handleCRMChange}
                />
                <select
                  name="crmEstado"
                  className="crm-estado"
                  required
                  value={userForm.crmEstado}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione o Estado</option>
                  {estadosBrasil.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {userForm.tipoUsuario === "paciente" && (
            <div>
             <RequiredField> <label>CPF:</label></RequiredField>
              <input
                type="text"
                name="cpf"
                id="cpf"
                placeholder="CPF"
                maxLength={14}
                required
                value={userForm.cpf}
                onChange={handleCPFChange}
              />
              <br />
            </div>
          )}

          <button className="btn" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
