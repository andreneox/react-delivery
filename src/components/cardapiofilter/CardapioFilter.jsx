import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";



 
export const CardapioFilter =({cardapioFilter})=>{
const [categoria,setCategoria]=useState('todos')
const handleCategoriaClick = (categoria) => {
    
    setCategoria(categoria);

  };
    const cardapioFilterCategoria = cardapioFilter.filter((item) => {
        if (categoria === 'todos') {
          return true;
        } else {
          return item.categoria === categoria;
        }
      });
    

    return(
    
       <Box sx={{display:'flex',justifyContent:{lg:'space-evenly',xs:'normal'},mt:5,width:'100%', boxShadow:21,p:2,gap:2,overflowX:'auto'}}>
        <Button variant="contained" onClick={() => handleCategoriaClick('todos')} sx={{minWidth:'150px'}}>
        Todos
        </Button>

        <Button variant="contained" onClick={() => handleCategoriaClick('Sanduiche')} sx={{minWidth:'150px'}}>
        Sanduiches
        </Button>

        <Button variant="contained" onClick={() => handleCategoriaClick('Pizzas')} sx={{minWidth:'150px'}}>
        Pizzas
        </Button>

        <Button variant="contained" onClick={() => handleCategoriaClick('Bebidas')} sx={{minWidth:'150px'}}>
        Bebidas
        </Button>

        <Button variant="contained" onClick={() => handleCategoriaClick('Soremesas')} sx={{minWidth:'150px'}}>
        Sobremesas
        </Button>
        </Box>
    )
}
