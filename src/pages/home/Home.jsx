import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useContext, useEffect, useState } from "react"
import { CarrinhoContext, CarrinhoProvider } from "../../components/appbar/Carrinho"

import { NavBar } from "../../components/appbar/NavBar"
import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"
<<<<<<< HEAD

=======
// import { CartContext } from "../../contexts/cartcontext/Cart"
>>>>>>> 977e5665352d5524d4fdfbea0e114f58332c6b8d



export const Home = () => {
<<<<<<< HEAD
    const [url,setUrl]=useState()
    const [cardapio,setCardapio]=useState([])
    const {setCarrinho,carrinho,adicionaProduto}=useContext(CarrinhoContext)
 
   

    useEffect(()=>{
        api.get('/Cardapio',{
          headers:{
            "authorization":localStorage.getItem('token')
          }
        })
        .then(function (response) {
          // manipula o sucesso da requisição
          console.log(response);
          setCardapio(response.data.data)
          setUrl('http://localhost:3005/files/')
        
         
        })
        .catch(function (error) {
          // manipula erros da requisição
          console.error(error);
        })
    },[setCardapio])
    
  

    return (
   
    

  
  
        <ValidaLogin>
          <NavBar/>
           <Container sx={{padding:5}}>
            <Grid container spacing={5}>
              {cardapio.map((cardapio,index)=>(
              <Grid item xs={4} sm={4} key={index} >
              <Card sx={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',padding:1}}>
                <Box width='100px'  >
                <img  width={'100%'} height='100%' src={url+cardapio.img}></img>
=======
  const [url, setUrl] = useState('http://localhost:3005/files/')
  const [cardapio, setCardapio] = useState([])
  const [carrinho, setCarrinho] = useState([])

  const adicionaCarrinho = (produto) => {
    setCarrinho([...carrinho, produto])
  }
  
  useEffect(() => {
    api.get('/Cardapio')
      .then(function (response) {
        // manipula o sucesso da requisição
        console.log(response);
        setCardapio(response.data.data)
        console.log("meu console", url)
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
  }, [setCardapio])



  return (
    <ValidaLogin>
      <NavBar />
      <Container>
        <Grid container spacing={4}>
          {cardapio.map((cardapio, index) => (
            <Grid item xs={4} key={index} >
              <Card>
                <Box width='100px'>
                  <img width={'100%'} height='100%' src={url + cardapio.img}></img>
>>>>>>> 977e5665352d5524d4fdfbea0e114f58332c6b8d
                </Box>
                <CardContent>
                  <Typography>{cardapio.nome}</Typography>
                  <Typography>Valor{cardapio.valor}</Typography>
                
                </CardContent>
                <CardActions>
<<<<<<< HEAD
                <Button variant="contained" onClick={()=>adicionaProduto(cardapio)}  >Add</Button>  
=======
                  <Button variant="contained" onClick={() => adicionaCarrinho(cardapio)}>Add</Button>
>>>>>>> 977e5665352d5524d4fdfbea0e114f58332c6b8d
                </CardActions>
              </Card>
            </Grid>
<<<<<<< HEAD
           </Container>
                
         
        </ValidaLogin>
        
    )
=======
          ))}

        </Grid>
      </Container>


    </ValidaLogin>
  )
>>>>>>> 977e5665352d5524d4fdfbea0e114f58332c6b8d
}