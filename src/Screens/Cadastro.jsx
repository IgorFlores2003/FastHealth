import React, { useState } from 'react';
import img from "../Imagem/Logo.png";
import "../index.css";
function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState(); // estado para eu controlar o tipo de usuário

  const handleTipoUsuarioChange = (event) => {
    setTipoUsuario(event.target.value); // atualiza o estado com o valor que for selcionado
  };


  return (
    <div className="container">
      <div className="imge">
        <img src={img} alt="Logo" />
      </div>
      <div className="inputcont">
        <h1 className="title">Cadastro</h1>
        <form>
          <label>Nome:</label>
          <input type="text" placeholder="Nome" />
          <br />

          <label>E-mail:</label>
          <input type="email" placeholder="E-mail" />
          <br />

          <label>Senha:</label>
          <input type="password" placeholder="Senha" />
          <br />
          <label>
            <input
              type="radio"
              name="tipoUsuario"
              value="medico"
              checked={tipoUsuario === 'medico'}
              onChange={handleTipoUsuarioChange}
            />
            Médico
          </label>
          <label>
            <input
              type="radio"
              name="tipoUsuario"
              value="paciente"
              checked={tipoUsuario === 'paciente'}
              onChange={handleTipoUsuarioChange}
            />
            Paciente
          </label>
          <br/>
          {tipoUsuario === 'medico' && (
            <div><div>
              <label >Hospital:</label>
              <input type="text" placeholder=' Nome do Hospital'></input>
              </div>
              <div>
              <label>Endereço:</label>
              <input type="text" placeholder='Endereço do Hospital'></input>
              </div>
              <div>
              <label >CRM:</label>
              <input className='crm' type='text' placeholder='Inserir CRM'></input>
            </div></div>
          )}
          {tipoUsuario === 'paciente' && (
            <div><br/>
              <label>CPF:</label>
              <input type="text" id="cpf" name="cpf" placeholder="CPF" maxLength={11}/>
              <br />
            </div>
          )}

          <button className="buttonReg">Registrar</button>
        </form>
      </div>
    </div>

    
  );
}

export default Cadastro;
