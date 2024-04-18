import React, { useState } from "react";

function Triagem() {

  return (
    <div className="tria">
      <h1 className="title">Coleta de Dados do Paciente</h1>
      <form>
        <div className="op1">
          <label>
            Onde está doendo?<br></br>
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
            Há quanto tempo está com dor/incômodo?
            <br></br>
            <input
              className="dor_Incomodo"
              type="text"
              maxlength="2"
              size="1"
            ></input>
            <select id="tempo">
            <option value="Horas" >Horas</option>
              <option value="Dias" >Dias</option>
              <option value="Semanas" >Semanas</option>
              <option value="Meses" >Meses</option>
              <option value="Anos" >Anos</option>
            </select>
          </label>
        </div>
        <div>
          <br></br>
          <label>
            Qual a intensidade da dor?
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
            <input type="text" maxlength="2" size="1"></input>X
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
          <label>Qual hospital irá ser atendido?</label>
          <br></br>
          <select className="selectOp" id="options" >
            <option value="Hospital 1" >Hospital 1</option>
            <option value="Hospital 2" >Hospital 2</option>
            <option value="Hospital 3" >Hospital 3</option>
          </select>
        </div>
        <div>
          <br></br>
          <label>Descrição (Opcional):</label>
          <input
            type="text"
            placeholder="Descreva mais detalhadamente o que está sentindo"
            maxlength="100"
            size="50"
          ></input>
        </div>
        <button className="buttonReg">Finalizar</button>
      </form>
    </div>
  );
}

export default Triagem;
