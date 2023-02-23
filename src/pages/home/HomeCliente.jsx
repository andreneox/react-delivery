import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material"

import { useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import { AppBarCliente } from "../../components/appbar/AppBarCliente"
import { api } from "../../config/Api"
import { CarrinhoContext } from "../../context/Carrinho"
import { SnackbarProvider, useSnackbar } from 'notistack';
import { SnackBarMessage } from "../../components/snackbar/SnackBarMessage"



export const HomeCliente = () => {
  const [cardapio, setCardapio] = useState([])
  const [url, setUrl] = useState('http://localhost:3005/files/')
  const { adicionaProduto, valorTotal } = useContext(CarrinhoContext)
  const cardapioFilter = cardapio.filter(cardapio => cardapio.status != 'inativo');


  

  useEffect(() => {

    api.get('/Cardapio', {
      headers: {
        "authorization": localStorage.getItem('token')
      }
    })
      .then(function (response) {
        // manipula o sucesso da requisição
        console.log(response)
        setCardapio(response.data.data)

      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
  }, [setCardapio])






  return (

    <SnackbarProvider maxSnack={3}>
  
      <AppBarCliente />
      <Container maxWidth='xl'>
        <Grid container sx={{ mt: '70px' }} spacing={2}>
          {cardapioFilter.map((cardapios, index) => (
            <Grid key={index} item xl={3} sm={4} lg={4} md={4} xs={6}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxwidth: '400px', height: '300px' }}>
                
         
                  <CardMedia sx={{ height:'150px',width:'80%'}}>
                          <img style={{width:'100%',height:'100%'}} src={url+cardapios.img}></img>
                  
                   
                  </CardMedia>
              
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography gutterBottom variant="h8" component="div">
                    {cardapios.nome}
                  </Typography>
                
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <CardActions sx={{ display: { md: 'flex', justifyContent: 'space-between', flexFlow: 'wrap', gap: 1, width: '100%' } }}>
                  <Typography variant="h7" fontWeight='bold' component="div">
                    R$ {cardapios.valor}   
                  </Typography>
                  <SnackBarMessage add={cardapios}  />
                  </CardActions>
                </Box>
              </Card>

            </Grid>


          ))}



        </Grid>
      </Container>

    </SnackbarProvider>


  )
}