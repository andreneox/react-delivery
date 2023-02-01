import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useState } from "react";





export const AppBarCliente = ()=>{
   
    const [openCarrinho,setOpenCarrinho]=useState(false)

    const openCart=()=>{
    setOpenCarrinho(true)
    }

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


                <Drawer anchor="right" open={openCarrinho}  onClose={()=>setOpenCarrinho(false)}>
                <Box sx={{display:'flex',alignItems:'center',flexDirection:'column',pt:5,justifyContent:'center',width:'300px',border:1}}>
                <Typography variant="h4">Pedido</Typography>
                <Box sx={{display:'flex',border:1,mt:'60px'}}>
                <Button variant="contained" >Finalizar Comprra</Button>
                </Box>
                
                </Box>
                </Drawer>  

                </Container>
            </Toolbar>

        </AppBar>
        </Box>
    )
}