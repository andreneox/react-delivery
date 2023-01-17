import { AppBar, Button, Container, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { CarrinhoContext } from "./Carrinho";
import { Link, useNavigate } from "react-router-dom";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


export const NavBar = () => {   
    const [open,setOpen]=useState(false)
    const {setCarrinho,carrinho,valor,valorTotal}=useContext(CarrinhoContext)    
    const navigate=useNavigate()
    const itensMenu=[
        {
          texto:'home',
          to:'/home'
        },
        {
          texto:'cadastro',
          to:'/cadastro'
        }
      ]
      const itensCarrinho=[
        {
          texto:'descricao',
          icon:(<RemoveCircleIcon color="error"/>)
        }
      ]

      const EsvaziarCarrinho =()=>{
        setCarrinho([])
      }
      
      valorTotal();
   
    const CartOpen = ()=>{
        setOpen(true)
    }
    const Logout =()=>{
        localStorage.removeItem('logado')
        localStorage.removeItem('token')
        navigate('/login')
    }

    return(
    
        <AppBar position="static" > 
        <Container maxWidth="xl">
          
     
            <Drawer  open={open} anchor={"right"} onClose={()=>setOpen(false)}>
            <Box padding={4} width='400px' display={'flex'} flexDirection='column' justifyContent='center' alignItems={'center'} gap={2}>
            <Typography >PEDIDO</Typography>
            <Box display={'flex'} width='50%'  justifyContent='center' gap={2} >

          
                {carrinho.map((produto,index)=>(
                <> 
                {itensCarrinho.map((itensCarrinho)=>(
                  <>
                <Typography key={index} sx={{display:'flex',gap:2,cursor:'pointer'}}>{itensCarrinho.icon}{produto.nome}</Typography>
                <Typography >Valor:{produto.valor}R$</Typography>
               
             
                  </>
                
                ))} 
                
                </>
                ))}
                 </Box>
                 <Typography variant="h4">VALOR TOTAL:{valor}</Typography>
               
               
                <Button variant="contained" >Finalizar Pedido</Button>
                <Button variant="contained" onClick={EsvaziarCarrinho}>Esvaziar carrinho</Button>
               
            </Box>
            </Drawer>
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow:0 }}>
            SISTEMA DELIVERY
          </Typography>
          <List sx={{display:'flex',justifyContent:'center',alignItems:'center',flexGrow:1, gap:30}} className='Menu'>
          {itensMenu.map(itensMenu =>(
                <Link key={itensMenu.texto} to={itensMenu.to}>
                <ListItem disablePadding>
               <Typography variant="h6" >{itensMenu.texto}</Typography>
                </ListItem>
                </Link>
                    ))}
                    <List>
                      <Button variant="contained" onClick={Logout}>Sair</Button>
                    </List>
                    </List>
            <Button variant="contained" onClick={CartOpen}><ShoppingCartIcon/></Button>
            </Toolbar>
            </Container>
        </AppBar>
        
  

    )
}