import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import Cadastro from "./frontend/Screens/Cadastro/Cadastro.js";
import Login from "./frontend/Screens/Login/Login.js";
import ErrorPage from "./frontend/Screens/ErrorPage/ErrorPage.js";
import Triagem from "./frontend/Screens/Triagem/Triagem.js";
import Maps from "./frontend/Screens/Maps.js";
import Med from "./frontend/Screens/Med/Med.js";
import User from "./frontend/Screens/User/User.js";
import Hist from "./frontend/Screens/Hist.js";
import Caixa from "./frontend/Screens/Caixa.js";
import HistPac from "./frontend/Screens/HistPac.js";
import Informacoes from "./frontend/Screens/TriInformation/TriInformation.js";
import InformacoesTriagem from "./frontend/Screens/MedInfo/MedInfo.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/Cadastro",
        element: <Cadastro />,                                  },
      { path: "/Triagem", element: <Triagem /> },
      { path: "/Hospitais", element: <Maps /> },
      { path: "/MedUser", element: <Med /> },
      { path: "/PacUser", element: <User /> },
      { path: "/Hist", element: <Hist /> },
      { path: "/Caixa", element: <Caixa /> },
      { path: "/HistUser", element: <HistPac /> },
      {path: "/informacoes/:consultaId", element: <Informacoes/>},
      {path: "/Med/:consultaId", element: <InformacoesTriagem/>},
    
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
