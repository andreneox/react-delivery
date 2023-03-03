import { Box,  Button,  Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Typography } from "@mui/material"

import { useState } from "react"

import { useEffect } from "react"
import { AppBarCliente } from "../../components/appbar/AppBarCliente"
import { api } from "../../config/Api"

import { SnackbarProvider, useSnackbar } from 'notistack';
import { SnackBarMessage } from "../../components/snackbar/SnackBarMessage"

import LunchDiningIcon from '@mui/icons-material/LunchDining';
import WineBarIcon from '@mui/icons-material/WineBar';
import AppsIcon from '@mui/icons-material/Apps';
import { motion } from "framer-motion";
import { CardapioFilter } from "../../components/cardapiofilter/CardapioFilter"

export const HomeCliente = () => {
  const [cardapio, setCardapio] = useState([])
  const [url, setUrl] = useState('http://localhost:3005/files/')

  const cardapioFilter = cardapio.filter(cardapio => cardapio.status != 'inativo');


  

  useEffect(() => {
 
    api.get('cliente/Cardapio', {
     
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
      
  },[])

 







  return (

    <SnackbarProvider maxSnack={3}>
  
      <AppBarCliente />
     
     <CardapioFilter cardapioFilter={cardapioFilter}/>

      <Container sx={{mt:10}}>

    
      <Grid container  sx={{border:1}}>
   
      {cardapioFilter.map((item,index)=>(
   
      <Grid item xs={12}>
      
        
        <Card sx={{border:1,width:'100%',height:'150px'}}>
       
        <CardMedia sx={{height:'150px'}}>
        <img style={{width:'100%',height:'100%'}} src={url+item.img}/>
        </CardMedia>
        </Card>
       
      </Grid>
      ))}
      </Grid>
      
      </Container>
  
     
     
    </SnackbarProvider>


  )
}