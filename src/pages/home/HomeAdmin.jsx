
import Card from "@mui/material/Card"
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useEffect, useState } from "react"
import { AppBarAdmin } from "../../components/appbar/AppBarAdmin"
import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"
import Box from '@mui/material/Box';





export const HomeAdmin = () => {
  const [url, setUrl] = useState('http://localhost:3005/files/')
  const [cardapio, setCardapio] = useState([])
  


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
  })




  return (
<ValidaLogin>
 <AppBarAdmin/>
     <Container>
      <Grid container sx={{mt:'70px'}} spacing={2}>
        {cardapio.map((cardapios,index)=>(
      <Grid  key={index} item xl={3} sm={4} lg={4} md={4} xs={6}>
      <Card sx={{display:'flex',flexDirection:'column',alignItems:'center',maxwidth:'350px',height:'300px'}}>
        <Box sx={{width:'90%',height:'450px'}}>

      <CardMedia
      sx={{width:'100%',height:'100%',borderRadius:1}}
     image={url + cardapios.img}
      >
      </CardMedia>
      </Box>
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {cardapios.nome}
        </Typography>
        <Typography  variant="h5" component="div">
        {cardapios.nome}
        </Typography>
      </CardContent>
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
      <CardActions sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',width:'100%'}}>
      <Button size="small">Remover</Button>
      <Button size="small">Editar</Button>
      <Button size="small">Pausar</Button>
     
      </CardActions>
      </Box>
      </Card>
      </Grid>
             ))}
      </Grid>
      </Container>
    </ValidaLogin>
  )
}