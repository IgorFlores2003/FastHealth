import React, { useState } from "react";
import img from "../Imagem/Logo.png";
import { cpf } from "cpf-cnpj-validator";

function Cadastro() {
  const [FormData, setForm] = useState({
    name: '',
    email:'',
    senha:'',
    tipoUsuário:'',
    hospital:'',
    enderecos:'',
    crm:'',
    cpf:''
  }
  );

  const handleFormEdit = (event, name) => {
    setForm({
      ...FormData, 
      [name]: event.target.value
         
    })

  }

  function createPost(event){
    try{
      event.preventDefault()
      const response =  fetch('http://localhost:5000/Cadastros',{
      method : 'POST',
      body: JSON.stringify(FormData)
    })

    const json =  response.json()

  }catch(err){

    }
  }
  const [tipoUsuario, setTipoUsuario] = useState(); // estado para eu controlar o tipo de usuário

  const handleTipoUsuarioChange = (event) => {
    setTipoUsuario(event.target.value); // atualiza o estado com o valor que for selcionado
  }
  return (
    <div className="container">
      <div className="imge">
        <img src={img} alt="Logo" />
      </div>
      <div className="inputcont">
        <h1 className="title">Cadastro</h1>
        <form>
          <label>Nome:</label>
          <input type="text" placeholder="Nome" required value={FormData.name} onChange={(e) => {handleFormEdit(e, 'name')}}/>
          <br />

          <label>E-mail:</label>
          <input type="email" placeholder="E-mail" required value={FormData.email} onChange={(e) => {handleFormEdit(e, 'email')}}/>
          <br />

          <label>Senha:</label>
          <input type="password" placeholder="Senha" required value={FormData.senha} onChange={(e) => {handleFormEdit(e, 'senha')}}/>
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
                <input type="text" placeholder=" Nome do Hospital" required value={FormData.hospital}></input>
              </div>
              <div>
                <label>Endereço:</label>
                <input type="text" placeholder="Endereço do Hospital" required value={FormData.enderecos}></input>
              </div>
              <div>
                <label>CRM:</label>
                <input
                  className="crm"
                  type="text"
                  placeholder="Inserir CRM"
                  required
                  value={FormData.crm}
                ></input>
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
              />
              <br />
            </div>
          )}

          <button className="buttonReg" handleFormEdit={createPost}>Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
