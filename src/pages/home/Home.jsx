import { Button, Card, CardActions, CardContent, Container, Grid,  Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CarrinhoContext } from "../../components/appbar/Carrinho"
import { NavBar } from "../../components/appbar/NavBar"
import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"
// import { CartContext } from "../../contexts/cartcontext/Cart"



export const Home = () => {
  const [url, setUrl] = useState('http://localhost:3005/files/')
  const [cardapio, setCardapio] = useState([])
  const {adicionaProduto,removeProduto,valor}=useContext(CarrinhoContext)
  const navigate=useNavigate()


  useEffect(() => {
    api.get('/Cardapio',{
      headers: {
        "authorization": localStorage.getItem('token')
    }
    })
      .then(function (response) {
        // manipula o sucesso da requisição
       
        setCardapio(response.data.data)
     
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
  }, [setCardapio])




  return (
    <ValidaLogin>
      <NavBar />
      <Container maxWidth='xl'>
        <Grid container spacing={1}>
          {cardapio.map((cardapio, index) => (
            <Grid item xs={4} key={index}>
              <Card sx={{padding:3,display:{xl:'flex',md:'flex',sm:'flex',xs:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}}>
                <Box width='100px' >
                  <img width={'100%'} height='100%' src={url + cardapio.img}></img>
                </Box>
                <CardContent sx={{width:'100%',height:'100%'}}>
                  <Typography>{cardapio.nome}</Typography>
                  <Typography>Valor {cardapio.valor}R$</Typography>
                
                </CardContent>
                <CardActions>
                  <Button variant="contained"onClick={()=>adicionaProduto(cardapio)} >Adicionar Carrinho</Button>
                  <Button variant="contained"onClick={()=>removeProduto(cardapio)} >Remover Carrinho</Button>
                  
                  
                </CardActions>
              </Card>
            </Grid>
          ))}

        </Grid>
      </Container>


    </ValidaLogin>
  )
}