import { AppBar, Button, Container, Drawer, Modal, TextField, Toolbar, Typography } from "@mui/material"


import { useContext, useEffect, useState } from "react";
import { border, Box, width } from "@mui/system";
import { CarrinhoContext } from "./Carrinho";
import { useNavigate } from "react-router-dom";

import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export const NavBar = () => {
  const [open, setOpen] = useState(false)
  const { setCarrinho, carrinho, valor, valorTotal, removeProduto, FinalizaPedido } = useContext(CarrinhoContext)
  const navigate = useNavigate()

  const pessoas =
  {
    id: 1,
    nome: 'Giovanne',
    obs: 'troco pra 50R$'

  }

  const itensMenu = [
    {
      texto: 'home',
      to: '/home'
    },
    {
      texto: 'cadastro',
      to: '/cadastro'
    }
  ]
 
  const EsvaziarCarrinho = () => {
    setCarrinho([])
  }



  const CartOpen = () => {
    setOpen(true)
  }

  const OpennModal = () => {
    setOpenModal(true)
    setOpen(false)
  }

  valorTotal()
  const Logout = () => {
    localStorage.removeItem('logado')
    localStorage.removeItem('token')

    navigate('/login')

  }

  const [openModal, setOpenModal] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


  return (

    <AppBar position="static">

      <Button onClick={(e) => setOpenModal(true)}>Open modal</Button>
      <Modal
        open={openModal}
        onClose={(e) => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Observação
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <TextField
              label='Nome'
            />
            <TextField
              label='Sobrenome'
            />
            <TextField
              label='telefone'
            />
            <TextField
              label='Rua'
            />
            <TextField
              label='bairro'
            />
            <TextField
              label='casa'
            />

            <TextField
              label='Observação'
              placeholder="ex: troco pra 50R$"
              id="standard-multiline-flexible"
              multiline
              variant="filled"
            />
            <Button variant="contained" onClick={()=>FinalizaPedido(pessoas)}>Finalizar Pedido</Button>
          </Box>
        </Box>
      </Modal>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div">
            Sistema de Delivery
          </Typography>

          <Box sx={{display:'flex',gap:20}}>
            {itensMenu.map((item) => (
              <Button key={item} sx={{ color: "white" }} href={item.to}>
                {item.texto}
              </Button>
            ))}
          </Box>
          <Drawer variant="temporary" open={open} anchor='right' sx={{ display: { lg: 'flex', xs: 'none' } }} onClose={() => setOpen(false)}>
            <Typography variant="h4" sx={{ padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>PEDIDOS</Typography>
            <Box width={'100%'} flexDirection='column'>
              {carrinho.map((item, index) => (
                <Box sx={{ px: 2, display: 'flex', mt: 2, justifyContent: 'center', alignContent: 'center', alignItems: 'center', gap: 5 }} >
                  <>
                    <Typography key={index}>{item.id.nome}</Typography>
                    <Typography>quantidade:{item.qtd}</Typography>
                    <Typography>valor:{item.id.valor}R$</Typography>
                  </>
                </Box>
              ))}
            </Box>
            <Box display={'flex'} justifyContent='center' mt={4} alignItems='center'>
              <Typography variant="h4">Valor total:{valor} R$</Typography>
            </Box>
            <Box display={'flex'} justifyContent='center' flexDirection={'column'} gap={2} mt={4} alignItems='center'>
              <Button variant="contained" onClick={EsvaziarCarrinho} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }} >Esvaziar carrinho</Button>
              <Button variant="contained" onClick={OpennModal} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%' }} >Finalizar pedido</Button>
            </Box>
          </Drawer>
          <ShoppingBagIcon onClick={CartOpen} sx={{ cursor: 'pointer' }}></ShoppingBagIcon>
          <Typography variant="h6" sx={{ display: { lg: 'flex', xs: 'none' } }} color={"darkblue"}>{valor},00R$</Typography>
          <Button variant="contained" sx={{ display: { lg: 'flex', xs: 'none', ml: 10 } }} onClick={Logout}>Sair</Button>
        </Toolbar>
      </Container>

    </AppBar>






  )
}