import { AppBar, Badge, Button, Divider, Drawer, IconButton, MenuItem, TextareaAutosize, TextField, Toolbar, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useContext, useEffect, useState } from "react";
import { CarrinhoContext } from "../../context/Carrinho";
import BasicModal from "../modal/BasicModal";
import Textarea from '@mui/joy/Textarea';
import { api } from "../../config/Api";
import styled from "@emotion/styled";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { BadgeCart } from "../badge/BadgeCart";



export const AppBarCliente = () => {


  const { carrinho, subValor,CalculaSubTotal, openDrawer, setOpenDrawer,  adicionaProduto,contador, removeProduto } = useContext(CarrinhoContext)
 
  const [url, setUrl] = useState('http://localhost:3005/files/')


  const navigate = useNavigate()

  const openCart = () => {
    setOpenDrawer(true)

  }
  useEffect(() => {
    CalculaSubTotal()
  })

  const finalizaPedido = () => {
  
  let qtdCarrinho=0
  carrinho.map((valor)=>{
    qtdCarrinho=valor.qtd
  })
  if(qtdCarrinho===0){
    alert('você precisa adicionar algum item no seu carrinho para continuar')
  }else{
    navigate('/checkout')
    setOpenDrawer(false)
  }
  
   }
       
      
 

  
  

 

 




  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth='xl'>


            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center',width: '100%' }}>

          
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100px'}}>
                          <img style={{width:'100%',height:'100%'}} src={'https://play-lh.googleusercontent.com/2myDHuFjsHxi4DjhSITZ9tPDwyj1tPsMNzkzdiJHrrgaZ0FH1LMWUgd8ma-7CqdTgg'}></img>
                  
                   
                  </Box>
            

              <Typography>Sistema Delivery</Typography>

              <IconButton color="inherit" size="large" onClick={openCart} aria-label="delete">
                <BadgeCart badgeContent={contador}>
                  <ShoppingCartIcon />
                  </BadgeCart>
              </IconButton>
            </Box>


            <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>

              <Typography variant="h5">Pedidos Selecionados</Typography>

              <Box sx={{ p: 5, bgcolor: 'background.paper' }}>




                {carrinho.map((pedido, index) => (
                  <>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',gap:1 }}>

                      <Box sx={{ width: '80px' }}>
                        <img style={{ width: '100%', height: '100%' }} src={url + pedido.id.img}></img>
                      </Box>

                      <Typography variant="h6">{pedido.id.nome}</Typography>
                      <Typography variant="h6" fontWeight={'bolder'}>R${pedido.id.valor}</Typography>

                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, boxShadow: 2 }}>
                        <IconButton onClick={() => removeProduto(pedido.id)} >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{pedido.qtd}</Typography>
                        <IconButton onClick={() => adicionaProduto(pedido.id)}>
                          <AddIcon />
                        </IconButton>

                      </Box>
                      <Button variant="contained">Excluir item</Button>
                    </Box>
                  </>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  

                    <Typography variant="h5">Total</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                 

                    <Typography variant="h5">{subValor}</Typography>
                  </Box>
                </Box>

                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',mt:5}}>
                  <Button variant="contained" onClick={finalizaPedido} sx={{width:'100%'}}>Finalizar Pedido</Button>
                </Box>


              </Box>
            </Drawer>

          </Container>

        </Toolbar>


      </AppBar>

    
    </Box>
  )
}