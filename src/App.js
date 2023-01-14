
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/cartcontext/Cart";
import { Cadastro } from "./pages/cadastro/Cadastro";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";


function App() {
  return (

     <BrowserRouter>
     <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/cadastro" element={<Cadastro/>}/>
    
     </Routes>
     </BrowserRouter>
   
  );
}

export default App;
