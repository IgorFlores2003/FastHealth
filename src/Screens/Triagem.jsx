import React, { useState } from "react";

function Triagem() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
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
          <label className="op2">
            Há quanto tempo está com Dor/Incomodo?:
            
            <input type="text"></input>
            
          </label>
        </div>
        <div>
          <label>
            Qual a Intencidade da Dor?
            
            <input type="radio" name="myradio" value="option1" />
            0-4
          </label>
          <label>
            <input type="radio" name="myradio" value="option2" />
            5-6
          </label>
          {" "}
          <label>
            <input type="radio" name="myradio" value="option3" />
            7-8
          </label>
          <label>
            <input type="radio" name="myradio" value="option4" />
            9-10
          </label>
          
        </div>
        <div>
          <label>
            Pressão Arterial:
            <input type="number"></input>
            <input type="number"></input>
          </label>
          
        </div>
        <div>
          <label>
            Temperatura:
            <input type="number"></input>
          </label>
        </div>
        <div>
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
          <label>Descrição (Opcional):</label>
          <input
            type="text"
            placeholder="Descreva mais detalhadamente o que está sentindo"
          ></input>
        </div>
        <button className="buttonReg">Finalizar</button>
      </form>
    </div>
  );
}

export default Triagem;
