import { Link } from "react-router-dom";
import "../NavBarMed/index.css";
import { FaHouseUser} from "react-icons/fa";
import { IoMdExit } from "react-icons/io";


const NavBarMed = () => {
  return (
    <nav className="naveMed">
      
      <div className="links">
        <button>
          <Link to="/MedUser"><FaHouseUser /></Link>
        </button>
        <button>
        <Link to="/"><IoMdExit /></Link>
        </button>
      
      </div>
    </nav>
  );
};
export default NavBarMed;
