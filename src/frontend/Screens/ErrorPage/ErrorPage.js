import React from "react";
import { Link } from "react-router-dom";
import "../ErrorPage/ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-heading">404</h1>
        <p className="error-text">Ops! Parece que você se perdeu...</p>
        <p className="error-text">A página que você está procurando não foi encontrada.</p>
        <Link to="/" className="error-link">Voltar para a página inicial</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
