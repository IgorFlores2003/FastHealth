import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import NavBar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';


function Triagem() {
  const navigate = useNavigate();

  const [triagem, setTriagem] = useState({
    dor:'',
    outro:'',
    tempo:'',
    tempo2:'Horas',
    intensidade:'',
    pressao:'',
    pressao2:'',
    Temperatura:'',
    Hospital:'',
    descricao:'',
    dataAtual: format(new Date(), 'dd/MM/yyyy')
  });

  const [hospitais, setHospitais] = useState([]); // Para armazenar a lista de hospitais disponíveis

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTriagem({ ...triagem, [name]: value });

    console.log(triagem)
  };

  useEffect(() => {
    // Função para buscar a lista de hospitais
    const fetchHospitais = async () => {
      try {
        const response = await axios.get("http://localhost:8080");
        const hospitaisData = response.data; // Recebe os dados diretamente da resposta

        console.log(hospitaisData)
  
        setHospitais(hospitaisData); // Define os hospitais no estado

        console.log(hospitais)
      } catch (error) {
        console.error("Erro ao obter a lista de hospitais:", error);
      }
    };
  
    fetchHospitais(); // Chama a função de busca quando o componente é montado
  }, []);

  const idUser = localStorage.getItem('loggedInUser'); // Obtendo o ID do usuário logado do Local Storage
  const name = localStorage.getItem('nome')

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const triagemData = {
        ...triagem,
        userId: idUser, // Incluindo o ID do usuário no objeto de triagem
        name: name
      };
  
      // Enviando a triagem para a API
      await axios.post("http://localhost:8080/tri", triagemData);
  
      // Exibindo mensagem de sucesso
      Swal.fire({
        icon: "success",
        title: "Triagem Efetuada com Sucesso"
      });
  
      // Navegando para a página de usuário
      navigate("/PacUser");
    } catch (err) {
      console.error(err);
      // Exibindo mensagem de erro
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar a Triagem"
      });
    }
  };
  

  return (
    <div className="tria">
      <NavBar/>
      <h1 className="title">Coleta de Dados do Paciente</h1>
      <form onSubmit={handleSubmit}>
      <div className="op1">
  <label>
    Onde está doendo?
  </label>
  <br />
  <label>
    <input
      type="radio"
      name="dor"
      value="cabeça"
      onChange={handleInputChange}
      required
    />
    Cabeça
  </label>
  <label>
    <input
      type="radio"
      name="dor"
      value="olhos"
      onChange={handleInputChange}
      required
    />
    Olhos
  </label>
  <label>
    <input
      type="radio"
      name="dor"
      value="braços"
      onChange={handleInputChange}
      required
    />
    Braços
  </label>
  <label>
    <input
      type="radio"
      name="dor"
      value="pernas"
      onChange={handleInputChange}
      required
    />
    Pernas
  </label>
  <label>
    <input
      type="radio"
      name="dor"
      value="outros"
      onChange={handleInputChange}
      required
    />
    Outros
  </label>
  {triagem.dor === "outros" && (
    <input
      name="outro"
      type="text"
      onChange={handleInputChange}
      required
    />
  )}
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
              onChange={handleInputChange} required></input>
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
            <input type="radio" name="intensidade" value="Sem Dor" onChange={handleInputChange} required/>
            😊Sem dor
          </label>
          <label>
            <input type="radio" name="intensidade" value="Dor Leve" onChange={handleInputChange} required/>
            🙂 Dor leve
          </label>
          <label>
            <input type="radio" name="intensidade" value="Dor moderada" onChange={handleInputChange} required/>
            😐Dor moderada
          </label>
          <label>
            <br></br>
            <input type="radio" name="intensidade" value="Dor intensa" onChange={handleInputChange} required/>
            🙁Dor intensa
          </label>
          <label>
            <input type="radio" name="intensidade" value="Dor muito intensa" onChange={handleInputChange} required/>
            😟Dor muito intensa
          </label>
          <label>
            <input type="radio" name="intensidade" value="Pior dor possível" onChange={handleInputChange} required/>
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
  <select className="selectOp" id="options" name="Hospital" onChange={handleInputChange} required>
  <option value="">Selecione um hospital</option>
  {hospitais
    .filter(hospital => hospital.hospital.trim() !== "") // Filtra hospitais vazios
    .reduce((uniqueHospitals, hospital) => { // Remove hospitais duplicados
      return uniqueHospitals.includes(hospital.hospital) ? uniqueHospitals : [...uniqueHospitals, hospital.hospital];
    }, [])
    .map((hospital, index) => (
      <option key={index} value={hospital}>{hospital}</option>
    ))}
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
