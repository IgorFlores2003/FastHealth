import React, { useState } from "react";
import axios from "axios";

function Triagem() {

  const [formData, setFormData] = useState({
    Pain: "",
    duration: "",
    painIntensity: "",
    Pressure: "",
    temperature: "",
    hospital: "",
    description: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar dados para a API
      const response = await axios.post("SUA_URL_DA_API", formData);

      // Se a requisição for bem-sucedida, exibir mensagem ou redirecionar o usuário
      console.log("Dados da triagem enviados com sucesso!", response.data);

      // Limpar o formulário após o envio bem-sucedido (opcional)
      setFormData({
        Pain: "",
        duration: "",
        painIntensity: "",
        Pressure: "",
        temperature: "",
        hospital: "",
        description: ""
      });

      // Exibir mensagem de sucesso (opcional)
      alert("Triagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar triagem:", error);
      alert("Erro ao enviar triagem. Por favor, tente novamente.");
    }
  };

  return (
    <div className="tria">
      <h1 className="title">Coleta de Dados do Paciente</h1>
      <form>
        <div className="op1">
          <label>
            Onde está doendo?<br></br>
            <input type="radio" name="radio" value="option1" onChange={handleInputChange}/>
            Cabeça
          </label>
          <label>
            <input type="radio" name="radio" value="option2" onChange={handleInputChange}/>
            Olhos
          </label>

          <label>
            <input type="radio" name="radio" value="option3" onChange={handleInputChange}/>
            Braços
          </label>
          <label>
            <input type="radio" name="radio" value="option4" onChange={handleInputChange}/>
            Pernas
          </label>

          <label>
            Outro:
            <input type="text" onChange={handleInputChange}/>
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
              onChange={handleInputChange}
            ></input>
            <select id="tempo">
            <option value="Horas" onChange={handleInputChange}>Horas</option>
              <option value="Dias" onChange={handleInputChange}>Dias</option>
              <option value="Semanas" onChange={handleInputChange}>Semanas</option>
              <option value="Meses" onChange={handleInputChange}>Meses</option>
              <option value="Anos" onChange={handleInputChange}>Anos</option>
            </select>
          </label>
        </div>
        <div>
          <br></br>
          <label>
            Qual a intensidade da dor?
            <br></br>
            <input type="radio" name="myradio" value="option1" onChange={handleInputChange}/>
            😊Sem dor
          </label>
          <label>
            <input type="radio" name="myradio" value="option2" onChange={handleInputChange}/>
            🙂 Dor leve
          </label>
          <label>
            <input type="radio" name="myradio" value="option3" onChange={handleInputChange}/>
            😐Dor moderada
          </label>
          <label>
            <br></br>
            <input type="radio" name="myradio" value="option4" onChange={handleInputChange}/>
            🙁Dor intensa
          </label>
          <label>
            <input type="radio" name="myradio" value="option4" onChange={handleInputChange}/>
            😟Dor muito intensa
          </label>
          <label>
            <input type="radio" name="myradio" value="option4" onChange={handleInputChange}/>
            😣Pior dor possível
          </label>
        </div>
        <div>
          <br></br>
          <label>
            Pressão Arterial:
            <br></br>
            <input type="text" maxlength="2" size="1" onChange={handleInputChange}></input>X
            <input type="text" maxlength="2" size="1" onChange={handleInputChange}></input>
          </label>
        </div>
        <div>
          <br></br>
          <label>
            Temperatura:<br></br>
            <input type="text" maxlength="2" size="1" onChange={handleInputChange}></input>
            Graus
          </label>
        </div>
        <div>
          <br></br>
          <label>Qual hospital irá ser atendido?</label>
          <br></br>
          <select className="selectOp" id="options" >
            <option value="Hospital 1" onChange={handleInputChange}>Hospital 1</option>
            <option value="Hospital 2" onChange={handleInputChange}>Hospital 2</option>
            <option value="Hospital 3" onChange={handleInputChange}>Hospital 3</option>
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
            onChange={handleInputChange}
          ></input>
        </div>
        <button className="buttonReg">Finalizar</button>
      </form>
    </div>
  );
}

export default Triagem;
