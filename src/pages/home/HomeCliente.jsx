import { Box,  Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Typography } from "@mui/material"

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

export const HomeCliente = () => {
  const [cardapio, setCardapio] = useState([])
  const [url, setUrl] = useState('http://localhost:3005/files/')
  const [categoria,setCategoria]=useState('todos')
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

 



  const handleCategoriaClick = (categoria) => {
    
    setCategoria(categoria);

  };

  const cardapioFilterCategoria = cardapioFilter.filter((item) => {
    if (categoria === 'todos') {
      return true;
    } else {
      return item.categoria === categoria;
    }
  });



  return (

    <SnackbarProvider maxSnack={3}>
  
      <AppBarCliente />
     
      <Container maxWidth='xl'>
      <Box sx={{ display: 'flex', mt: 5,justifyContent:'space-evenly',bgcolor:'background.paper'}}>

      <IconButton>

      <AppsIcon fontSize="large"  sx={{color:categoria === 'todos' ? 'red' : 'outlined'}} onClick={() => handleCategoriaClick('todos')}>
        Todos
      </AppsIcon>
      </IconButton>
      <IconButton>

      <LunchDiningIcon fontSize="large" sx={{color:categoria === 'Sanduiche' ? 'red' : 'outlined'}}  onClick={() => handleCategoriaClick('Sanduiche')}>
        Sanduíches
      </LunchDiningIcon>
      </IconButton>

      <IconButton>

      <WineBarIcon fontSize="large"  sx={{color:categoria === 'Bebidas' ? 'red' : 'outlined'}}onClick={() => handleCategoriaClick('Bebidas')}>
        Bebidas
      </WineBarIcon>

      </IconButton>
    </Box>
    

        
        <Grid container sx={{ mt: '70px'   }} spacing={2}  >
     
        {cardapioFilterCategoria.map((cardapios, index) => (
      
            <Grid key={index} item  xl={3} sm={4} lg={4} md={4} xs={6}  >
                     <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1 }}
       >
              <Card  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '400px', maxHeight: '400px' } }>
                
              <Typography   variant="h6">
                    {cardapios.titulo}
                  </Typography>
                  <CardMedia  sx={{display:'flex',flexDirection:'column',gap:1,justifyContent:'center',alignItems:'center',height:{xs:'100px',lg:'150px'}}}>
                  
                          <img style={{width:'100%',height:'100%'}} src={url+cardapios.img}></img>
              
                  </CardMedia>
               
              
                <CardContent sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',mt:2}}>
                   <Typography color={'red'} fontSize='15px' sx={{border:1,height:'50px'}}>
                    {cardapios.subtitulo}
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
              </motion.div>
            </Grid>
       

           
          ))}
     


        </Grid>
        
      </Container>
     
    </SnackbarProvider>


  )
}