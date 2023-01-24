import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './App';
import { CarrinhoProvider } from './context/Carrinho';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CarrinhoProvider>
    <App />
    </CarrinhoProvider>
  
);

