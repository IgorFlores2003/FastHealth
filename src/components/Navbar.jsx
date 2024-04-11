import { Link } from "react-router-dom";
import "../index.css";

const NavBar = () => {
  return (
    <nav className="naveg">
      <button>
        <Link to="/">Login</Link>
      </button>
      <button>
        <Link to="/Triagem">Triagem</Link>
      </button>
      <button>
        <Link to="/Hospitais">Hospitais Proximos</Link>
      </button>
      <button>
        <Link to="/MedUser">TelaMed</Link>
      </button>
      <button>
        <Link to="/PacUser">TelaPac</Link>
      </button>
      <button>
        <Link to="/Hist">Hist</Link>
      </button>
      <button>
        <Link to="/Caixa">Caixa de Entrada</Link>
      </button>
      <button>
        <Link to="/HistUser">Histórico Paciente</Link>
      </button>
    </nav>
  );
};
export default NavBar;
