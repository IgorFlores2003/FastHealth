import img from'../Imagem/Logo.png';
import '../index.css';
function Cadastro() {

  return (

    <div className="container">
    <div className='imge'><img src={img}/></div>
<div className="inputcont">
<h1 className="title">Cadastro</h1>
<form>

     <label>Nome</label>
      <input type='text' placeholder='Nome'></input><br></br>

      <label>E-mail
      <input type='email'placeholder='E-mail'></input><br></br>
      </label>
      <label>Senha
      <input type='password' placeholder='Senha'></input><br></br>

                <input className="op" type="radio" name="myRadio" value="option1" />
          Médico
        </label>
        <label>
          <input type="radio" name="myRadio" value="option2" />
          Paciente
        </label><br></br>
      
     <button className="buttonReg">
Registrar
     </button>
     </form>
    </div>
    </div>
  );
}

export default Cadastro;
