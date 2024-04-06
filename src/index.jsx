import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Cadastro from "./Screens/Cadastro.jsx";
import Login from "./Screens/Login.jsx";
import ErrorPage from "./Screens/ErrorPage.jsx";
import Triagem from "./Screens/Triagem.jsx";
import Maps from "./Screens/Maps.jsx";
import Med from "./Screens/Med.jsx";
import User from "./Screens/User.jsx";
import Hist from "./Screens/Hist.jsx";
import Caixa from "./Screens/Caixa.jsx";
import HistPac from "./Screens/HistPac.jsx";
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
        element: <Cadastro />,
      },
      { path: "/Triagem", element: <Triagem /> },
      { path: "/Hospitais", element: <Maps /> },
      { path: "/MedUser", element: <Med /> },
      { path: "/PacUser", element: <User /> },
      { path: "/Hist", element: <Hist /> },
      { path: "/Caixa", element: <Caixa /> },
      { path: "/HistUser", element: <HistPac /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
