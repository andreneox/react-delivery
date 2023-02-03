import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import { AppBarCliente } from "../../components/appbar/AppBarCliente"
import { api } from "../../config/Api"
import { CarrinhoContext } from "../../context/Carrinho"




export const HomeCliente =()=>{
    const [cardapio, setCardapio] = useState([])
    const [url, setUrl] = useState('http://localhost:3005/files/')
    const {adicionaProduto,valorTotal}=useContext(CarrinhoContext)
    
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
      },[setCardapio])


      const cardapioFilter = cardapio.filter(cardapio=> cardapio.status !='inativo');

    return(
        <>
       
    <AppBarCliente/>
    <Container maxWidth='xl'>
    <Grid container sx={{ mt: '70px' }} spacing={2}>
      {cardapioFilter.map((cardapios, index) => (
        <Grid key={index} item xl={3} sm={4} lg={4} md={4} xs={6}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxwidth: '400px', height: '300px' }}>
            <Box sx={{ width: '100%', height: '450px' }}>

              <CardMedia
                sx={{ width: '100%', height: '100%', borderRadius: 1 }}
                image={url + cardapios.img}
              >
              </CardMedia>
            </Box>
            <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <Typography gutterBottom variant="h8" component="div">
                {cardapios.nome}
              </Typography>
              <Typography variant="h8" fontWeight='bold' component="div">
              R$ {cardapios.valor}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
              <CardActions  sx={{display:{md:'flex',justifyContent:'center',flexFlow:'wrap',gap:1,width:'100%'}}}>

              <Button variant="contained" onClick={()=>adicionaProduto(cardapios)}>Adicionar</Button>
              </CardActions>
            </Box>
          </Card>
        </Grid>
        
        
      ))}
    </Grid>
  </Container>
  </>
 
    )
}