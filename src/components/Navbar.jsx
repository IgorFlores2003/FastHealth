import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { FaHouseUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import Swal from 'sweetalert2';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Deseja realmente sair?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  const Home = () =>{
    navigate("/PacUser")
  }

  return (
    <nav className="naveg">
      <div >
        <button onClick={Home}>
            <FaHouseUser />Página Inicial
        </button>
        <button onClick={handleLogout}>
          < IoMdExit className="exit" />SAIR
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
