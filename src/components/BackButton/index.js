import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../BackButton/index.css";
import { FaHouseUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { IoReturnUpBack } from "react-icons/io5";

import Swal from 'sweetalert2';

const BackButton = () => {
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

  const Back = () =>{
    navigate(-1);
  }
const Home = () =>{
  navigate("/PacUser")
}

  return (
    <nav className="naveg">
      <div >
        <button onClick={Home}>
            <FaHouseUser />HOME
        </button>
        <button onClick={Back}>
            <IoReturnUpBack />VOLTAR
        </button>
        <button onClick={handleLogout}>
          < IoMdExit className="exit" />SAIR
        </button>
      </div>
    </nav>
  );
};

export default BackButton;