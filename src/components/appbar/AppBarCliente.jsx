import { AppBar, Badge, Button, Divider, Drawer, IconButton, MenuItem, TextareaAutosize, TextField, Toolbar, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useContext, useState } from "react";
import { CarrinhoContext } from "../../context/Carrinho";
import BasicModal from "../modal/BasicModal";
import Textarea from '@mui/joy/Textarea';
import { api } from "../../config/Api";
import styled from "@emotion/styled";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';




export const AppBarCliente = () => {


  const { carrinho, valor, openDrawer, setOpenDrawer, valorTotal,contador } = useContext(CarrinhoContext)
  const [openFinalizaCompra, setOpenFinalizaCompra] = useState(false)

  const [nome, setNome] = useState()

  const [telefone, setTelefone] = useState()
  const [rua, setRua] = useState()
  const [cep, setCep] = useState()
  const [casa, setCasa] = useState()
  const [bairro, setBairro] = useState()
  const [produto, setProduto] = useState([])


  const openCart = () => {
    setOpenDrawer(true)
    valorTotal()
  }


  const finalizaPedido = () => {
    setOpenFinalizaCompra(true)



  }
  const formaDePagamento = [
    {

      label: 'Dinheiro'

    }, {


      label: 'Cartão'
    }
  ]

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: '2px solid',
      padding: '0 4px',
    },
  }));


  const InfoPedido = (id) => {

    api.post('CadastrarPedido', {
      nome: nome,
      telefone: telefone,
      cep: cep,
      rua: rua,
      casa: casa,
      bairro: bairro,

      produtos: carrinho.map((produto) => {
        return {

          id: produto.id.id,
          qtd: produto.qtd

        }
      })





    })
      .then(function (response) {
        console.log(response);
      
      })
      .catch(function (error) {
        console.error(error);
      });
  }


 

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth='xl'>


            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>


              <Typography>Logo</Typography>

              <Typography>Sistema Delivery</Typography>

              <IconButton color="inherit" onClick={openCart} aria-label="delete">
                <StyledBadge badgeContent={contador} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Box>


            <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', pt: 5, justifyContent: 'center', width: '300px' }}>
                <Typography variant="h4">Pedido</Typography>




                <Box sx={{ display: 'flex', pt: 5, justifyContent: 'space-between', flexWrap: 'nowrap', width: '80%' }}>

                  <Typography>item</Typography>

                  <Typography>qtd</Typography>



                </Box>
                {carrinho.map((item, index) => (

                  <Box key={index} sx={{ display: 'flex', width: '80%', justifyContent: 'space-between', mt: '15px' }}>

                    <Typography>{item.id.nome} </Typography>

                    <Typography>{item.qtd}</Typography>

                  </Box>
                ))}

                <Typography sx={{ mt: 20 }}>Valor total: R$ {valor}</Typography>
                <Button variant="contained" sx={{ mt: '50px' }} onClick={() => finalizaPedido()} >Finalizar Comprra</Button>


              </Box>

            </Drawer>

          </Container>

        </Toolbar>


      </AppBar>
      <BasicModal isOpen={openFinalizaCompra} setIsOpen={() => setOpenFinalizaCompra(false)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, width: '100%' }}>

          <Typography variant="h5">Informações da Entrega</Typography>
          <TextField
            label='Nome'
            type={'text'}
            onChange={(e) => setNome(e.target.value)}
          />

          <TextField
            label='Telefone'
            type={'text'}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <TextField
            label='Cep'
            type={'text'}
            onChange={(e) => setCep(e.target.value)}
          />
          <TextField
            label='rua'
            type={'text'}
            onChange={(e) => setRua(e.target.value)}

          />
          <TextField
            label='casa'
            type={'text'}
            onChange={(e) => setCasa(e.target.value)}
          />
          <TextField
            label='bairro'
            type={'text'}
            onChange={(e) => setBairro(e.target.value)}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Forma de Pagamento"
            defaultValue=""

            helperText="Por favor, selecione a forma de pagamento"

          >
            {formaDePagamento.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="filled-multiline-static"
            label="Observação"
            multiline
            rows={4}

            placeholder='ex: tirar cebola,troco para R$50'
            variant="filled"
          />

          <Button variant="contained" color="success" onClick={InfoPedido}>Finalizar Pedido</Button>
        </Box>

      </BasicModal>
    </Box>
  )
}