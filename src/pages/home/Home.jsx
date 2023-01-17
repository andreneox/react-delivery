import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useContext, useEffect, useState } from "react"
import { CarrinhoContext, CarrinhoProvider } from "../../components/appbar/Carrinho"

import { NavBar } from "../../components/appbar/NavBar"
import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"




export const Home = () => {
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
                </Box>
                <CardContent>
                <Typography>{cardapio.nome}</Typography>
                  <Typography>Valor{cardapio.valor}</Typography>
                
                </CardContent>
                <CardActions>
                <Button variant="contained" onClick={()=>adicionaProduto(cardapio)}  >Add</Button>  
                </CardActions>
              </Card>
              </Grid>
               ))}

            </Grid>
           </Container>
                
         
        </ValidaLogin>
        
    )
}