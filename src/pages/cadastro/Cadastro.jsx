import { Button, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { useState } from "react"
import { AppBarAdmin } from "../../components/appbar/AppBarAdmin"
import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"

export const Cadastro = () => {
  const [nome, setNome] = useState()
  const [valor, setValor] = useState()
  const [img, setImg] = useState()

  const Cadastrar = (event) => {

    event.preventDefault()
    api.post('Cadastro', {
      nome: nome,
      valor: valor,
      img: img

    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(function (response) {
        console.log(response);


      })
      .catch(function (error) {
        console.log("error axios", error)
        console.log("minha variavel", img)
      });
  }


  return (
    <ValidaLogin>
      <AppBarAdmin/>
      <Container>
        <Box display={'flex'} flexDirection='column' alignItems={'center'} pb={4} justifyContent='center' >
          <Typography variant="h1">Tela de cadastro</Typography>
          <Box display='flex' width={'90%'} justifyContent='center' flexDirection={'column'} gap={5} component='form' onSubmit={Cadastrar} >

            <TextField
              label='Nome'
              type='text'
              onChange={(e) => setNome(e.target.value)}
            />

            <TextField
              label='Valor'
              type='text'
              onChange={(e) => setValor(e.target.value)}
            />

            <TextField
              type='file'
              onChange={(e) => setImg(e.target.files[0])}
            />
            <Button variant="contained" type="submit">Cadastrar</Button>
          </Box>
        </Box>
      </Container>
    </ValidaLogin>
  )
}