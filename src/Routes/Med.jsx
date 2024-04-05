import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

const Med = ()=> {

  return (
        <div>
        <div>
        <h1 className='MedTitle'>Qual Funcionalidade deseja utilizar?</h1>
        <Link to="/Cadastro">
        <button>Caixa de Entrada</button>
      </Link>
      <Link to="/Hist">
      <button>Histórico por Paciente</button>
      </Link>
        </div>
    </div>
  );
}

export default Med;
