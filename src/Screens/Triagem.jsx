import "../index.css";
import React, { useState } from "react";

function Triagem() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="tria">
        <h1 className="title">Triagem</h1>
        <form>
          <label>
            Onde Está Doendo:<br></br>
            <input className="op" type="radio" name="radio" value="option1" />
            Cabeça
          </label>
          <label>
            <input type="radio" name="radio" value="option2" />
            Olhos
          </label>
          <br></br>
          <label>
            <input type="radio" name="radio" value="option3" />
            Braços
          </label>
          <label>
            <input type="radio" name="radio" value="option4" />
            Pernas
          </label>
          <br></br>
          <label className="out">
            Outro:<br></br>
            <input className="tri" type="text" />
          </label>
          <br></br>
          <label>
            Há quanto tempo está com Dor/Incomodo?:
            <br></br>
            <input className="dor" type="text"></input>
            <br></br>
          </label>
          <label>
            Qual a Intencidade da Dor?
            <br></br>
            <input type="radio" name="myradio" value="option1" />
            0-4
          </label>
          <label>
            <input type="radio" name="myradio" value="option2" />
            5-6
          </label>
          <br></br>{" "}
          <label>
            <input type="radio" name="myradio" value="option3" />
            7-8
          </label>
          <label>
            <input type="radio" name="myradio" value="option4" />
            9-10
          </label>
          <br></br>
          <label>
            Pressão Arterial:
            <input type="number"></input>
            <input type="number"></input>
          </label>
          <br></br>
          <label>
            Temperatura:
            <input type="number"></input>
          </label>
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
          </datalist><br></br>
          <label>Descrição (Opcional):</label>
          <input className="descri"type="text" placeholder="Descreva mais detalhadamente o que está sentindo"></input>
          <button className="buttonReg">Finalizar</button>
        </form>
      </div>
  );
}

export default Triagem;
