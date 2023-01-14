import { AppBar, Button, Drawer, Toolbar, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartDrawer } from "./CartDrawer";
import { useState } from "react";
import { Box } from "@mui/system";


export const NavBar = () => {   
    const [open,setOpen]=useState(false)
    const CartOpen = ()=>{
        setOpen(true)
    }
    return(
    
        <AppBar position="static"> 
            <Drawer  open={open} anchor={"right"} onClose={()=>setOpen(false)}>
            <Box padding={4}>
                <Typography>Carrinho de Compra</Typography>
                <Button variant="contained">Finalizar Pedido</Button>
            </Box>
            </Drawer>
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SISTEMA DELIVERY
          </Typography>
            <Button variant="contained" onClick={CartOpen}><ShoppingCartIcon/></Button>
            </Toolbar>
       
        </AppBar>
        
  

    )
}