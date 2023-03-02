import { Button, MenuItem, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { useState } from "react"
import { AppBarAdmin } from "../../components/appbar/AppBarAdmin"
import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"

export const Cadastro = () => {
  const [titulo, setTitulo] = useState()
  const [categoria, setCategoria] = useState()
  const [subtitulo, setSubtitulo] = useState()
  const [valor, setValor] = useState()
  const [img, setImg] = useState()

  const categorias = [
   {nome:'Sanduiche'},
   {nome:'Bebidas'},
   {nome:'Sobremesa'}
  ];


  const Cadastrar = (event) => {

    event.preventDefault()
    api.post('Cadastro', {
      titulo: titulo,
      categoria:categoria,
      subtitulo:subtitulo,
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
      alert('nome do produto já existe!')
      });
  }



  return (
    <ValidaLogin>
      <AppBarAdmin/>
      <Container>
        <Box display={'flex'} flexDirection='column' alignItems={'center'} pb={4} justifyContent='center' >
          <Typography variant="h1">Tela de cadastro</Typography>
          <Box display='flex' width={'90%'} justifyContent='center' flexDirection={'column'} gap={5} component='form' onSubmit={Cadastrar} sx={{bgcolor:'background.paper',p:5}} >

            <TextField
              label='Titulo'
              type='text'
            
              onChange={(e) => setTitulo(e.target.value)}
            />

             <TextField
              label='Subtitulo'
              type='text'
              
              onChange={(e) => setSubtitulo(e.target.value)}
            />
              <TextField
          id="outlined-select-currency"
          select
          defaultValue=""
          label="Categoria"
          onChange={(e)=>setCategoria(e.target.value)}
          helperText="Por favor, selecione a categoria !"
        >
          {categorias.map((option) => (
            
            <MenuItem key={option.nome} value={option.nome} >
               {option.nome}
              
            </MenuItem>
          ))}
          </TextField>

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