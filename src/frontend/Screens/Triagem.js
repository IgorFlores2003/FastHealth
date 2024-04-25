import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function Triagem() {
  const [triagem, setTriagem] = useState({
    dor:'',
    tempo:'',
    tempo2:'',
    intensidade:'',
    pressao:'',
    pressao2:'',
    Temperatura:'',
    Hospital:'',
    descricao:''
  });
  const user = async () =>{ 
    try{
      const response = await axios.get(`${URL}/?email=igorfb2003@gmail.com`)
      const users = response.data;
       console.log(users)
  }catch{ }
} 

  const handleInputChange = (e) => {
    
      const { name, value } = e.target;
      setTriagem({ ...triagem, [name]: value });

      console.log(triagem)
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/tri", triagem);
      
      Swal.fire({
        icon: "success",
        title: "Triagem Efetuada com Sucesso"
      });
      console.log(user.users)
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar a Triagem"
      });
    }
  };

  return (
    <div className="tria">
      <h1 className="title">Coleta de Dados do Paciente</h1>
      <form onSubmit={handleSubmit}>
        <div className="op1">
          <label>
            Onde está doendo?
            <br />
            <input
              type="radio"
              name="dor"
              value="cabeça"
              onChange={handleInputChange}
            />
            Cabeça
          </label>
          <label>
            <input
              type="radio"
              name="dor"
              value="olhos"
              onChange={handleInputChange}
            />
            Olhos
          </label>

          <label>
            <input
              type="radio"
              name="dor"
              value="braços"
              onChange={handleInputChange}
            />
            Braços
          </label>
          <label>
            <input
              type="radio"
              name="dor"
              value="pernas"
              onChange={handleInputChange}
            />
            Pernas
          </label>

          <label>
            Outro:
            <input
              name="dor"
              type="text"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <br></br>
          <label className="op2">
            Há quanto tempo está com dor/incômodo?
            <br></br>
            <input
              className="dor_Incomodo"
              name="tempo"
              type="number"
              maxLength="2"
              size="1"
              onChange={handleInputChange}></input>
            <select id="tempo2" name="tempo2" onChange={handleInputChange}>
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
            <input type="radio" name="intensidade" value="Sem Dor" onChange={handleInputChange}/>
            😊Sem dor
          </label>
          <label>
            <input type="radio" name="intensidade" value="Dor Leve" onChange={handleInputChange}/>
            🙂 Dor leve
          </label>
          <label>
            <input type="radio" name="intensidade" value="Dor moderada" onChange={handleInputChange}/>
            😐Dor moderada
          </label>
          <label>
            <br></br>
            <input type="radio" name="intensidade" value="Dor intensa" onChange={handleInputChange}/>
            🙁Dor intensa
          </label>
          <label>
            <input type="radio" name="intensidade" value="Dor muito intensa" onChange={handleInputChange}/>
            😟Dor muito intensa
          </label>
          <label>
            <input type="radio" name="intensidade" value="Pior dor possível" onChange={handleInputChange}/>
            😣Pior dor possível
          </label>
        </div>
        <div>
          <br></br>
          <label>
            Pressão Arterial:
            <br></br>
            <input name="pressao" type="number" maxLength="2" size="1" onChange={handleInputChange}></input>X
            <input name="pressao2" type="number" maxLength="2" size="1" onChange={handleInputChange}></input>
          </label>
        </div>
        <div>
          <br></br>
          <label>
            Temperatura:<br></br>
            <input name="Temperatura" type="number" maxLength="3" size="3" onChange={handleInputChange}></input>
            Graus
          </label>
        </div>
        <div>
          <br></br>
          <label>Qual hospital irá ser atendido?</label>
          <br></br>
          <select className="selectOp" id="options" name="Hospital" onChange={handleInputChange} >
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
            maxLength="100"
            size="50"
            onChange={handleInputChange}
            name="descricao"
          ></input>
        </div>
        <button className="buttonReg">Finalizar</button>
      </form>
    </div>
  );
}

export default Triagem;
