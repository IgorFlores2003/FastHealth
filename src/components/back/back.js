import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { FaHouseUser } from "react-icons/fa";

const Back = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <nav className="naveg">
      <div>
        <button onClick={goHome}>
          <FaHouseUser /> Página Inicial
        </button>
      </div>
    </nav>
  );
};

export default Back;
