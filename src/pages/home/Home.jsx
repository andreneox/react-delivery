import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { NavBar } from "../../components/appbar/NavBar"
import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"
import { CartContext } from "../../contexts/cartcontext/Cart"



export const Home = () => {
    const [url,setUrl]=useState()
    const [cardapio,setCardapio]=useState([])

  
    useEffect(()=>{
        api.get('/Cardapio')
        .then(function (response) {
          // manipula o sucesso da requisição
          console.log(response);
          setCardapio(response.data.data)
          setUrl('http://localhost:3005/files/')
          console.log("meu console",url)
        })
        .catch(function (error) {
          // manipula erros da requisição
          console.error(error);
        })
    },[setCardapio])
    
  

    return (
        <ValidaLogin>
          <NavBar/>
           <Container>
            <Grid container spacing={4}>
              {cardapio.map((cardapio,index)=>(
              <Grid item xs={4} key={index} >
              <Card>
                <Box width='100px'>
                <img  width={'100%'} height='100%' src={url+cardapio.img}></img>
                </Box>
                <CardContent>
                <Typography>{cardapio.nome}</Typography>
                  <Typography>Valor{cardapio.valor}</Typography>
                </CardContent>
                <CardActions>
                <Button variant="contained">Add</Button>  
                </CardActions>
              </Card>
              </Grid>
               ))}

            </Grid>
           </Container>
                
         
        </ValidaLogin>
    )
}