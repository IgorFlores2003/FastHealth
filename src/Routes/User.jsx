import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

const User = ()=> {

  return (

    <div>
        <div>
        <h1 className='MedTitle'>Qual Funcionalidade deseja utilizar?</h1>
        <Link to="/Triagem">
        <button>Fazer Triagem</button>
      </Link>
      <Link to="/Hospitais">
      <button>Hospitais Próximos</button>
      </Link>
      
      <button>Histórico</button>
      
        </div>
    </div>
  );
}

export default User;
