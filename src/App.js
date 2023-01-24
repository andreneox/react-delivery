
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import { Cadastro } from "./pages/cadastro/Cadastro";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";


import { TelaPedido } from "./pages/pedidos/TelaPedido";


function App() {
  return (

     <BrowserRouter>
     <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/cadastro" element={<Cadastro/>}/>
      <Route path="/pedido" element={<TelaPedido/>}/>
    
    
     </Routes>
     </BrowserRouter>
   
  );
}

export default App;
