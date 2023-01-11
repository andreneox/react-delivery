import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";


function App() {
  return (
   
     <BrowserRouter>
     <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
     </Routes>
     </BrowserRouter>
   
  );
}

export default App;
