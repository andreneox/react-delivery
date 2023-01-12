import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"




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
           <Container>
            <Grid container spacing={4}>
              <Grid item xs={4}>
              <Card>
                <CardMedia/>
                <CardContent>
                  <Typography>Valor</Typography>
                </CardContent>
                <CardActions>
                <Button variant="contained">Add</Button>  
                </CardActions>
              </Card>
              </Grid>

            </Grid>
           </Container>
                
         
        </ValidaLogin>
    )
}