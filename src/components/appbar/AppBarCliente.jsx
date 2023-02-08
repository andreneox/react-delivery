import { AppBar, Button, Divider, Drawer, IconButton, MenuItem, TextareaAutosize, TextField, Toolbar, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useContext, useState } from "react";
import { CarrinhoContext } from "../../context/Carrinho";
import BasicModal from "../modal/BasicModal";
import Textarea from '@mui/joy/Textarea';
import { api } from "../../config/Api";




export const AppBarCliente = ()=>{
    
  
  const {carrinho,valor,openDrawer,setOpenDrawer,valorTotal,pedido,FinalizaPedido}=useContext(CarrinhoContext)
  const [openFinalizaCompra,setOpenFinalizaCompra]=useState(false)
  const [descricao,setDescricao]=useState()
  const [nome,setNome]=useState()
  const [formadepagamento,setFormaDePagamento]=useState()
  const [telefone,setTelefone]=useState()
  const [endereco,setEndereco]=useState()

    const openCart=()=>{
    setOpenDrawer(true)
    
    setDescricao(carrinho.reduce((valorAnterior,ValorAtual)=>valorAnterior+ValorAtual.id.nome+" " +"Qtd:"+ValorAtual.qtd+ "  "+"valor und:"+ValorAtual.id.valor+" "," "))
  
    console.log('descricao',descricao)
    valorTotal()
    }


    const finalizaPedido=()=>{
      setOpenFinalizaCompra(true)
    }
    const formaDePagamento =[
        {
       
        label:'Dinheiro'

    },{

       
        label:'Cartão'
    }
]



const InfoPedido = ()=>{

  api.post('CadastroPedido',{

      nome:nome,
      endereco:endereco,
      telefone:telefone,
      formadepagamento:formadepagamento,
      observacao:descricao
          },
      {

         
    headers:{
      "authorization": localStorage.getItem('token')
    }
  })
  .then(function(response){

    console.log(response.data.data)
  })
  .catch(function(error){
    console.error(error)
  })
}



    
    return(
        <Box>
        <AppBar position="static">
            <Toolbar>
        <Container maxWidth='xl'>

       
                <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>

    
                <Typography>Logo</Typography>

                <Typography>Sistema Delivery</Typography>

                <IconButton  onClick={openCart} color="inherit">
                <ShoppingBasketIcon/>
                </IconButton>
                </Box>


                <Drawer anchor="right" open={openDrawer}  onClose={()=>setOpenDrawer(false)}>
                <Box sx={{display:'flex',alignItems:'center',flexDirection:'column',pt:5,justifyContent:'center',width:'300px'}}>
                <Typography variant="h4">Pedido</Typography>
               
                

              
                <Box  sx={{display:'flex',pt:5,justifyContent:'space-between' ,flexWrap:'nowrap', width:'80%'}}>
               
                    <Typography>item</Typography>
                    
                    <Typography>qtd</Typography>
                  
                   
               
                </Box>
                {carrinho.map((item,index)=>(
                
                <Box key={index} sx={{display:'flex',width:'80%',justifyContent:'space-between',mt:'15px'}}>

               <Typography>{item.id.nome} </Typography>
              
                <Typography>{item.qtd}</Typography>
                
                </Box>
                  ))}
                  <Typography sx={{mt:20}}>Valor total: R$ {valor}</Typography>
                  
                <Button variant="contained" sx={{mt:'50px'}} onClick={finalizaPedido} >Finalizar Comprra</Button>
                
                </Box>
                </Drawer>  

                </Container>
                
            </Toolbar>
           
             
        </AppBar>
        <BasicModal isOpen={openFinalizaCompra} setIsOpen={()=>setOpenFinalizaCompra(false)}>
            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',gap:3,width:'100%'}}>

       <Typography variant="h5">Informações da Entrega</Typography>
        <TextField
        label='Nome'
        type={'text'}
        onChange={(e)=>setNome(e.target.value)}
        />
    
         <TextField
        label='Telefone'
        type={'text'}
        onChange={(e)=>setTelefone(e.target.value)}
        />
        <TextField
        label='Cep'
        type={'text'}
        onChange={(e)=>setEndereco(e.target.value)}
        />
        <TextField
        label='rua'
        type={'text'}
        onChange={(e)=>setEndereco(e.target.value)}
      
        />
        <TextField
        label='casa'
        type={'text'}
        onChange={(e)=>setEndereco(e.target.value)}
        />
        <TextField
        label='bairro'
        type={'text'}
        onChange={(e)=>setEndereco(e.target.value)}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Forma de Pagamento"
          defaultValue=""
         
          helperText="Por favor, selecione a forma de pagamento"
          onChange={(e)=>setFormaDePagamento(e.target.value)}
        >
          {formaDePagamento.map((option) => (
            <MenuItem  key={option.label} value={option.label}>
            {option.label}
            </MenuItem>
          ))}
        </TextField>
   
        <TextField
          id="filled-multiline-static"
          label="Observação"
          multiline
          rows={4}
          
         placeholder='ex: tirar cebola,troco para R$50'
          variant="filled"
        />
       
       <Button variant="contained" color="success" onClick={InfoPedido}>Finalizar Pedido</Button>
        </Box>
        
        </BasicModal>
        </Box>
    )
}