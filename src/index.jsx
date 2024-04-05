import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Cadastro from './Routes/Cadastro.jsx';
import Login from './Routes/Login.jsx'
import ErrorPage from './Routes/ErrorPage.jsx';
import Triagem from './Routes/Triagem.jsx';
import Maps from './Routes/Maps.jsx';
import Med from './Routes/Med.jsx';
import User from './Routes/User.jsx';
import Hist from './Routes/Hist.jsx';
import Caixa from './Routes/Caixa.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[
     {
     path:"/",
     element:<Login/>
     },
     {
      path:"/Cadastro",
    element:<Cadastro/>,
     },
     {path:"/Triagem",
     element:<Triagem/>,
     },
     {path:"/Hospitais",
     element:<Maps/>
     },
     {path:"/MedUser",
     element:<Med/>
     },
     {path:"/PacUser",
     element:<User/>
     },
     {path:"/Hist",
     element:<Hist/>
     },
     {path:"/Caixa",
      element:<Caixa/>}
    
    ],
  },
 ]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
