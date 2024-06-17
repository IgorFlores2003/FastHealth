import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NavBar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "../Triagem/Triagem.css";
import RequiredField from "../../../components/RequiredField/required";

function Triagem() {
  const navigate = useNavigate();

  const [triagem, setTriagem] = useState({
    cod: "",
    dor: "",
    outro: "",
    tempo: "",
    tempo2: "Horas",
    intensidade: "",
    pressao: "",
    pressao2: "",
    Temperatura: "",
    Hospital: "",
    descricao: "",
    dataAtual: format(new Date(), "dd/MM/yyyy"),
  });

  const [hospitais, setHospitais] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTriagem({ ...triagem, [name]: value});
    console.log(triagem);
  };

  useEffect(() => {
    const fetchHospitais = async () => {
      try {
        const response = await axios.get("http://localhost:8080");
        const hospitaisData = response.data;
        console.log(hospitaisData);
        setHospitais(hospitaisData);
        console.log(hospitais);
      } catch (error) {
        console.error("Erro ao obter a lista de hospitais:", error);
      }
    };

    fetchHospitais();
  }, []);

  const idUser = localStorage.getItem("loggedInUser");
  const name = localStorage.getItem("nome");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanData = (data) => {
      for (let key in data) {
        if (data[key] === "") {
          data[key] = null;
        }
      }
      return data;
    };

    try {
      const triagemData = {
        ...triagem,
        userId: idUser,
        name: name,
      };

      const cleanedData = cleanData(triagemData);

      await axios.post("http://localhost:8080/tri", cleanedData);

      Swal.fire({
        icon: "success",
        title: "Triagem Efetuada com Sucesso",
      });

      navigate("/PacUser");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar a Triagem",
      });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="tria">
        <h1 className="title">Coleta de Dados do Paciente</h1>
        <form onSubmit={handleSubmit}>
          <div className="op1">
           <RequiredField> <label>Onde está doendo?</label></RequiredField>
            <br />
            <label>
              <input
                type="radio"
                name="dor"
                value="cabeça"
                onChange={handleInputChange}
                required
              />{" "}
              Cabeça
            </label>
            <label>
              <input
                type="radio"
                name="dor"
                value="olhos"
                onChange={handleInputChange}
                required
              />{" "}
              Olhos
            </label>
            <label>
              <input
                type="radio"
                name="dor"
                value="braços"
                onChange={handleInputChange}
                required
              />{" "}
              Braços
            </label>
            <label>
              <input
                type="radio"
                name="dor"
                value="pernas"
                onChange={handleInputChange}
                required
              />{" "}
              Pernas
            </label>
            <label>
              <input
                type="radio"
                name="dor"
                value="outros"
                onChange={handleInputChange}
                required
              />{" "}
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
            <RequiredField>Há quanto tempo está com dor/incômodo?</RequiredField>
              <br></br>
              <input
                className="dor_Incomodo"
                name="tempo"
                type="number"
                maxLength="2"
                size="1"
                onChange={handleInputChange}
                required
              />
              <select id="tempo2" name="tempo2" onChange={handleInputChange}>
                <option value="Horas">Horas</option>
                <option value="Dias">Dias</option>
                <option value="Semanas">Semanas</option>
                <option value="Meses">Meses</option>
                <option value="Anos">Anos</option>
              </select>
            </label>
          </div>
          <div>
            <br></br>
            <label>
            <RequiredField>  Qual a intensidade da dor?</RequiredField>
              <br></br>
              <input
                type="radio"
                name="intensidade"
                value="Sem Dor"
                onChange={handleInputChange}
                required
              />{" "}
              😊Sem dor
            </label>
            <label>
              <input
                type="radio"
                name="intensidade"
                value="Dor Leve"
                onChange={handleInputChange}
                required
              />{" "}
              🙂 Dor leve
            </label>
            <label>
              <input
                type="radio"
                name="intensidade"
                value="Dor moderada"
                onChange={handleInputChange}
                required
              />{" "}
              😐Dor moderada
            </label>
            <label>
              <br></br>
              <input
                type="radio"
                name="intensidade"
                value="Dor intensa"
                onChange={handleInputChange}
                required
              />{" "}
              🙁Dor intensa
            </label>
            <label>
              <input
                type="radio"
                name="intensidade"
                value="Dor muito intensa"
                onChange={handleInputChange}
                required
              />{" "}
              😟Dor muito intensa
            </label>
            <label>
              <input
                type="radio"
                name="intensidade"
                value="Pior dor possível"
                onChange={handleInputChange}
                required
              />{" "}
              😣Pior dor possível
            </label>
          </div>
          <div>
            <br></br>
            <label>
              Pressão Arterial:
              <br></br>
              <input
                name="pressao"
                type="number"
                maxLength="2"
                size="1"
                onChange={handleInputChange}
              />
              X
              <input
                name="pressao2"
                type="number"
                maxLength="2"
                size="1"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <br></br>
            <label>
              Temperatura:<br></br>
              <input
                name="Temperatura"
                type="number"
                maxLength="3"
                size="3"
                onChange={handleInputChange}
              />{" "}
              Graus
            </label>
          </div>
          <div>
            <br></br>
            <RequiredField><label>Qual hospital irá ser atendido?</label></RequiredField>
            <br></br>
            <select
              className="selectOp"
              id="options"
              name="Hospital"
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione um hospital</option>
              {hospitais
                .filter((hospital) => hospital.hospital.trim() !== "")
                .reduce((uniqueHospitals, hospital) => {
                  return uniqueHospitals.includes(hospital.hospital)
                    ? uniqueHospitals
                    : [...uniqueHospitals, hospital.hospital];
                }, [])
                .map((hospital, index) => (
                  <option key={index} value={hospital}>
                    {hospital}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <br></br>
            <label>Descrição:</label>
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
    </div>
  );
}

export default Triagem;
