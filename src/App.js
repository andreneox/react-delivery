
import { CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { Box, height } from "@mui/system";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { AppThemeProvider } from "./context/AppThemeProvider";

import { Cadastro } from "./pages/cadastro/Cadastro";
import { Checkout } from "./pages/checkout/Checkout";
import { Finalizacao } from "./pages/finalizacao/Finalizacao";
import { HomeAdmin } from "./pages/home/HomeAdmin";
import { HomeCliente } from "./pages/home/HomeCliente";

import { Login } from "./pages/login/Login";


import { TelaPedido } from "./pages/pedidos/TelaPedido";



function App() {
  return (
    
     
     <AppThemeProvider>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/admin/home" element={<HomeAdmin/>} />
      <Route path="/cadastro" element={<Cadastro/>}/>
      <Route path="/pedido" element={<TelaPedido/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/finalizacao" element={<Finalizacao/>}/>
      <Route path="/cardapio" element={<HomeCliente/>}/>
    
    
     </Routes>
     </BrowserRouter>
     </AppThemeProvider>
   
  );
}

export default App;
