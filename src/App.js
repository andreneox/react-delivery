
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import { Cadastro } from "./pages/cadastro/Cadastro";
import { HomeAdmin } from "./pages/home/HomeAdmin";
import { HomeCliente } from "./pages/home/HomeCliente";

import { Login } from "./pages/login/Login";


import { TelaPedido } from "./pages/pedidos/TelaPedido";


function App() {
  return (

     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/admin/home" element={<HomeAdmin/>} />
      <Route path="/cadastro" element={<Cadastro/>}/>
      <Route path="/pedido" element={<TelaPedido/>}/>
      <Route path="/cardapio" element={<HomeCliente/>}/>
    
    
     </Routes>
     </BrowserRouter>
   
  );
}

export default App;
