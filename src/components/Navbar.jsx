import { Link } from "react-router-dom";
import "../index.css";
import { FaHouseUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";


const NavBar = () => {
  return (
    <nav className="naveg">
      
      <div className="links">
        <button>
          <Link to="/PacUser"><FaHouseUser /></Link>
        </button>
        <button>
        <Link to="/"><IoMdExit /></Link>
        </button>
      </div>
    </nav>
  );
};
export default NavBar;
