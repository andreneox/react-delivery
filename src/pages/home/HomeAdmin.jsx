import { AppBar, Button, Card, CardActions, CardContent, Container, Grid,  Typography } from "@mui/material"
import { Box } from "@mui/system"
import {useEffect, useState } from "react"
import { AppBarAdmin } from "../../components/appbar/AppBarAdmin"

import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"





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
      
    </ValidaLogin>
  )
}