import React, { useState } from "react";

function Triagem() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [diasValue, setdiasValue] = useState("");

  const InputChange = (event) =>{
    setdiasValue(event.target.value);
  }
  return (
    <div className="tria">
      <h1 className="title">Coleta de Dados do Paciente</h1>
      <form>
        <div className="op1">
          <label>
            Onde Está Doendo:<br></br>
            <input type="radio" name="radio" value="option1" />
            Cabeça
          </label>
          <label>
            <input type="radio" name="radio" value="option2" />
            Olhos
          </label>
          
          <label>
            <input type="radio" name="radio" value="option3" />
            Braços
          </label>
          <label>
            <input type="radio" name="radio" value="option4" />
            Pernas
          </label>
          
          <label>
            Outro:
            <input type="text" />
          </label>
        </div>
        <div>
        <br></br>
          <label className="op2">
            Há quanto tempo está com Dor/Incomodo?:
            <br></br>
            <input className="dor_Incomodo" type="text" maxlength="2" size="1"></input>
            <input
            type="text"
            value={diasValue}
            onChange={InputChange}
            list="tempo"
            placeholder="Escolha uma opção"
          />
          <datalist id="tempo">
            <option value="Dias" />
            <option value="Semanas" />
            <option value="Meses" />
            <option value="Anos" />
          </datalist>
            
          </label>
        </div>
        <div>
        <br></br>
          <label>
            Qual a Intencidade da Dor?
            <br></br>
            <input type="radio" name="myradio" value="option1" />
            😊Sem dor
          </label>
          <label>
            <input type="radio" name="myradio" value="option2" />
            🙂 Dor leve
          </label>
          <label>
            <input type="radio" name="myradio" value="option3" />
            😐Dor moderada
          </label>
          <label>
            <br></br>
            <input type="radio" name="myradio" value="option4" />
            🙁Dor intensa
          </label>
          <label>
            <input type="radio" name="myradio" value="option4" />
            😟Dor muito intensa
          </label>
          <label>
            <input type="radio" name="myradio" value="option4" />
            😣Pior dor possível
          </label>
        </div>
        <div>
        <br></br>
          <label>
            Pressão Arterial:
            <br></br>
            <input  type="text" maxlength="2" size="1"></input>
            X
            <input type="text" maxlength="2" size="1"></input>
          </label>
        </div>
        <div>
        <br></br>
          <label>
            Temperatura:<br></br>
            <input type="text" maxlength="2" size="1"></input>
            Graus
          </label>
        </div>
        <div>
        <br></br>
          <label>Qual hospital irá ser atendido?:</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            list="options"
            placeholder="Escolha uma opção"
          />
          <datalist id="options">
            <option value="Hospital 1" />
            <option value="Hospital 2" />
            <option value="Hospital 3" />
          </datalist>
          
        </div>
        <div>
        <br></br>
          <label>Descrição (Opcional):</label>
          <input
            type="text"
            placeholder="Descreva mais detalhadamente o que está sentindo"
            maxlength="100" size="50" 
          ></input>
        </div>
        <button className="buttonReg">Finalizar</button>
      </form>
    </div>
  );
}

export default Triagem;
