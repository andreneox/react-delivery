
import Card from "@mui/material/Card"
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react"
import { AppBarAdmin } from "../../components/appbar/AppBarAdmin"
import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"
import Box from '@mui/material/Box';
import BasicModal from "../../components/modal/BasicModal";
import { TextField } from "@mui/material";





export const HomeAdmin = () => {
  const [url, setUrl] = useState('http://localhost:3005/files/')
  const [cardapio, setCardapio] = useState([])
  const [modalOpen,setModalOpen]=useState(false)
  const [nome, setNome] = useState()
  const [valor, setValor] = useState()
  const [img, setImg] = useState()
  const [cardapioEdit,setCardapioEdit]=useState({})



  useEffect(() => {
    api.get('/Cardapio', {
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

  const handleDelete = (cardapio) => {
    api.delete('Deletar/'+cardapio, {
      headers: {
        "authorization": localStorage.getItem('token')
      }
    })
      .then(function (response) {
        // manipula o sucesso da requisição

        console.log(response.data)

      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error("erro",error);
      })
}

const handleEditar=(cardapio)=>{

  api.put('Atualizar/'+cardapio,{
    nome:nome,
    valor:valor,
    img:img,
  },{
    headers: {
      "authorization": localStorage.getItem('token'),
      'Content-Type': 'multipart/form-data'
    }
   
  })
    .then(function (response) {
      
      console.log(response.data)
      console.log('alterado com sucesso')

    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error("erro",error);
    })
      
}
const handleItem =(cardapio)=>{
  setModalOpen(true)
  api.get('ListarItem/'+cardapio,{
  
    headers: {
      "authorization": localStorage.getItem('token')
    
    }
   
  })
    .then(function (response) {
      setCardapioEdit(response.data.data.id)
      console.log(response.data.data.id)
     

    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error("erro",error);
    })
      
}





  return (
    <ValidaLogin>
      <AppBarAdmin />
      <Container>
        <Grid container sx={{ mt: '70px' }} spacing={2}>
          {cardapio.map((cardapios, index) => (
            <Grid key={index} item xl={3} sm={4} lg={4} md={4} xs={6}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxwidth: '400px', height: '300px' }}>
                <Box sx={{ width: '100%', height: '450px' }}>

                  <CardMedia
                    sx={{ width: '100%', height: '100%', borderRadius: 1 }}
                    image={url + cardapios.img}
                  >
                  </CardMedia>
                </Box>
                <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <Typography gutterBottom variant="h8" component="div">
                    {cardapios.nome}
                  </Typography>
                  <Typography variant="h8" fontWeight='bold' component="div">
                    {cardapios.valor}R$
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>

                  <CardActions  sx={{display:{md:'flex',justifyContent:'center',flexFlow:'wrap',gap:1,width:'100%'}}}>
                    <Button onClick={()=>handleDelete(cardapios.id)} variant="contained"  size="small">Remover</Button>
                    <Button onClick={()=>handleItem(cardapios.id)} variant="contained" size="small">Editar</Button>
                    <Button variant="contained" size="small">Pausar</Button>

        
                  </CardActions>
                </Box>
              </Card>
              <BasicModal isOpen={modalOpen} setIsOpen={()=>setModalOpen(false)}>
          <Box  sx={{display:'flex',width:'100%',flexDirection:'column',gap:3}}>
            <TextField
            label='Nome'
            type='text'
            
           
            onChange={(e)=>setNome(e.target.value)}
          
            />
            <TextField
            label='Valor'
            type='float'
            onChange={(e)=>setValor(e.target.value)}
            />
            <TextField
            type='file'
            onChange={(e)=>setImg(e.target.files[0])}
            />
            <Button onClick={()=>handleEditar(cardapioEdit)}>Salvar</Button>
           
 </Box>
        </BasicModal>
            </Grid>
            
            
          ))}
        </Grid>
   

      </Container>

    

    </ValidaLogin>
  )
}