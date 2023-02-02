
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
import { useNavigate } from "react-router-dom";





export const HomeAdmin = () => {
  const [url, setUrl] = useState('http://localhost:3005/files/')
  const [cardapio, setCardapio] = useState([])
  const [modalEditar,setModalEditar]=useState(false)
  const [modalExcluir,setModalExcluir]=useState(false)
  const [nome, setNome] = useState()
  const [valor, setValor] = useState()
  const [status,setStatus]=useState()
  const [img, setImg] = useState()
  const [itemDelete,setItemDelete]=useState()
  const [itemEditar,setItemEditar]=useState({})
 
  const navigate =useNavigate()



  useEffect(() => {
    
    api.get('/Cardapio', {
      headers: {
        "authorization": localStorage.getItem('token')
      }
    })
      .then(function (response) {
        // manipula o sucesso da 

        console.log('response',response.data.data)
        
        setCardapio(response.data.data)

      

      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      
  },[setCardapio])





  

  const PegarItemExcluir =(item)=>{
    setModalExcluir(true)
    api.get('ListarItem/'+item,{
      headers:{
        "authorization": localStorage.getItem('token')
      }
    })
    .then(function(response){
      setItemDelete(response.data.data.id)
      console.log(response.data.data.id)
    })
    .catch(function(error){
      console.error(error)
    })
  }

  const ExcluirItem =(item)=>{
    setModalExcluir(false)
    api.delete('/Deletar/'+item,{
      headers:{
        "authorization": localStorage.getItem('token')
      }
    }).then(function(response){
      
      console.log(response.data)
    }).catch(function(error){
      console.error(error)
    })
  }

  const PegarItemEditar =(item)=>{
    api.get('ListarItem/'+item,  
  {
      headers:{
        "authorization": localStorage.getItem('token')
      }
    })
    .then(function(response){
      setItemEditar(response.data.data)
     
      console.log(response.data.data.id)
      setModalEditar(true)
    })
    .catch(function(error){
      console.error(error)
    })
  }

  const EditarItem=(item)=>{
    api.put('Atualizar/'+item,{
      nome:nome,
      valor:valor,
      img:img,
      status:status
    },{
      headers:{
        "authorization":localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      }
    }).then(function(response){
      console.log(response)
      setModalEditar(false)
      setNome()
      setValor()
      setImg()
      setStatus()
      
    }).catch(function(error){
    
      console.error(error)
    })
  }



const cardapioFiltrado = cardapio.filter((cardapio)=>cardapio.status!='inativo')



  return (
    <ValidaLogin>
      <AppBarAdmin />
      <Container>
        <Grid container sx={{ mt: '70px' }} spacing={2}>
          
          {cardapioFiltrado.map((cardapios,index) => (
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
                  R$ {cardapios.valor}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <CardActions  sx={{display:{md:'flex',justifyContent:'center',flexFlow:'wrap',gap:1,width:'100%'}}}>

                    <Button onClick={()=>PegarItemExcluir(cardapios.id)} variant="contained"  size="small">Remover</Button>

                    <Button  variant="contained"  onClick={()=>PegarItemEditar(cardapios.id)} size="small">Editar</Button>

                    <Button variant="contained" size="small">Pausar</Button>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
            
            
          ))}
        </Grid>
            
            <BasicModal isOpen={modalExcluir} setIsOpen={()=>setModalExcluir(false)}>
            <Typography>Você tem certeza que dejesa excluir esse produto ?</Typography>
            <Button color="error"variant="contained" onClick={()=>ExcluirItem(itemDelete)}>Excluir</Button>

            <Button color="success" onClick={()=>setModalExcluir(false)} variant="contained">Cancelar</Button>
            </BasicModal>


            <BasicModal isOpen={modalEditar} setIsOpen={()=>setModalEditar(false)}>
             <TextField
             label='nome'
           
            defaultValue={itemEditar.nome}
             type='text'
             onChange={(e) => setNome(e.target.value)}
            

             /> 

              <TextField
             label='valor'
             type='text'
             defaultValue={itemEditar.valor}
             onChange={(e) => setValor(e.target.value)}
             /> 
              <TextField
             label='status'
             type='text'
             onChange={(e) => setStatus(e.target.value)}
             /> 

            <TextField
             type='file'
             onChange={(e) => setImg(e.target.files[0])}
             /> 

             <Button variant='contained' onClick={()=>EditarItem(itemEditar.id)}>Salvar</Button>
            </BasicModal>

      </Container>

    

    </ValidaLogin>
  )
}