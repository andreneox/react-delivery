import { AppBar, Button, Divider, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useContext, useState } from "react";
import { CarrinhoContext } from "../../context/Carrinho";





export const AppBarCliente = ()=>{
    
  
    const {carrinho,valor,openDrawer,setOpenDrawer,valorTotal}=useContext(CarrinhoContext)

    const openCart=()=>{
    setOpenDrawer(true)
   
    }
    valorTotal()
    
    return(
        <Box>
        <AppBar position="static">
            <Toolbar>
        <Container maxWidth='xl'>

       
                <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>

    
                <Typography>Logo</Typography>

                <Typography>Sistema Delivery</Typography>

                <IconButton  onClick={openCart} color="inherit">
                <ShoppingBasketIcon/>
                </IconButton>
                </Box>


                <Drawer anchor="right" open={openDrawer}  onClose={()=>setOpenDrawer(false)}>
                <Box sx={{display:'flex',alignItems:'center',flexDirection:'column',pt:5,justifyContent:'center',width:'300px'}}>
                <Typography variant="h4">Pedido</Typography>
               
                

              
                <Box  sx={{display:'flex',pt:5,justifyContent:'space-between' ,flexWrap:'nowrap', width:'80%'}}>
               
                    <Typography>item</Typography>
                    
                    <Typography>qtd</Typography>
                  
                   
               
                </Box>
                {carrinho.map((item,index)=>(
                
                <Box key={index} sx={{display:'flex',width:'80%',justifyContent:'space-between',mt:'15px'}}>

               <Typography>{item.id.nome} </Typography>
              
                <Typography>{item.qtd}</Typography>
                
                </Box>
                  ))}
                  <Typography sx={{mt:20}}>Valor total: R$ {valor}</Typography>
                <Button variant="contained" sx={{mt:'50px'}}>Finalizar Comprra</Button>
                </Box>
                </Drawer>  

                </Container>
            </Toolbar>

        </AppBar>
        </Box>
    )
}