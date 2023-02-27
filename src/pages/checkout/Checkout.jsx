import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { AppBarCliente } from "../../components/appbar/AppBarCliente"
import PlaceIcon from '@mui/icons-material/Place';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useContext, useEffect, useState } from "react";
import { CarrinhoContext } from "../../context/Carrinho";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";


export const Checkout = () => {

    const { carrinho,adicionaProduto,removeProduto,valorTotal,valor} = useContext(CarrinhoContext)
    const [url, setUrl] = useState('http://localhost:3005/files/')
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState([]);
    const { logradouro, bairro, localidade, } = endereco;

    useEffect(()=>{
        valorTotal()
    })

    const buscarCep=(cep)=>{
        axios.get('https://viacep.com.br/ws/'+cep+'/json/', {
       
    })
      .then(function (response) {
        // manipula o sucesso da requisição
        console.log(response)
        setEndereco(response.data)

   
       

      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
    }
   

    return (
        <>
            <AppBarCliente />
            <Container maxWidth='xl'>
                <Grid container spacing={10} sx={{ mt: { xs: 5, md: 10 } }} >

                    <Grid item xs={12} md={8}>
                        <Typography sx={{ mb: 1 }} variant="h5">Complete seu pedido</Typography>
                        <Box sx={{ p: 5, bgcolor: 'background.paper' }}>

                            <Box sx={{ display: 'flex' }}>
                                <PlaceIcon sx={{ mr: 1 }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography sx={{ fontWeight: 'bolder' }}>Endereço de entrega</Typography>
                                    <Typography>Informe o endereço onde dejesa receber seu pedido</Typography>
                                </Box>

                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 5, gap: { xs: 2, md: 2 } }}>
                                <TextField label='cep' sx={{ width: { xs: '100%', md: '30%' } }}
                               onBlur={()=>buscarCep(cep)}
                                onChange={(e) => setCep(e.target.value)}
                      
                                
                                />
                                <TextField label='rua' sx={{ width: { xs: '100%', md: '100%' } }}
                                InputLabelProps={{ shrink: true }}
                                value={logradouro}
                                onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })}
                              
                               
                                 />
                                <TextField label='numero' sx={{ width: { xs: '100%', md: '30%' } }} 
                                 InputLabelProps={{ shrink: true }}
                               
                                />
                                <TextField label='complemento' sx={{ width: { xs: '100%', md: '50%' } }} 
                                 InputLabelProps={{ shrink: true }}
                                
                                />
                                <TextField label='bairro' sx={{ width: { xs: '100%', md: '30%' } }} 
                                 InputLabelProps={{ shrink: true }}
                                 value={bairro}
                               
                                 />
                                <TextField label='cidade' sx={{ width: { xs: '100%', md: '50%' } }} 
                                 InputLabelProps={{ shrink: true }}
                                 value={localidade}
                                 onChange={(e) => setEndereco({ ...endereco, localidade: e.target.value })}
                                 />
                            </Box>
                        </Box>

                        <Box sx={{ mt: 5, bgcolor: 'background.paper', p: 5 }}>
                            <Box sx={{ display: 'flex' }}>
                                <AttachMoneyIcon sx={{ mr: 1, fontSize: '30px' }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography>Pagamento</Typography>
                                    <Typography>O pagamento é feito na entrega. Escolha a forma que deseja pagar</Typography>
                                </Box>

                            </Box>
                            <Box sx={{ display: 'flex', mt: 3, gap: 3 }}>
                                <Button variant="contained"> <CreditCardIcon sx={{ mr: 2 }} /> Cartão de Crédito/Débito</Button>
                                <Button variant="contained"> <AttachMoneyIcon sx={{ mr: 2 }} />Dinheiro</Button>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item md={4} >



                        <Typography variant="h5">Pedidos Selecionados</Typography>

                        <Box sx={{ p: 5, bgcolor: 'background.paper' }}>




                            {carrinho.map((pedido, index) => (
                                <>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                        <Box sx={{ width: '80px' }}>
                                            <img style={{ width: '100%', height: '100%' }} src={url + pedido.id.img}></img>
                                        </Box>

                                        <Typography variant="h6">{pedido.id.nome}</Typography>
                                        <Typography variant="h6" fontWeight={'bolder'}>{pedido.id.valor}</Typography>

                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, boxShadow: 2 }}>
                                            <IconButton onClick={()=>removeProduto(pedido.id)} >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography>{pedido.qtd}</Typography>
                                            <IconButton onClick={()=>adicionaProduto(pedido.id)}>
                                                <AddIcon />
                                            </IconButton>

                                        </Box>
                                        <Button variant="contained">Excluir item</Button>
                                    </Box>
                                </>
                            ))}
                             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column',gap:2 }}>
                                    <Typography variant="h6">Subtotal</Typography>
                                    <Typography>Entrega</Typography>
                                    <Typography variant="h5">Total</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column',gap:2 }}>
                                    <Typography variant="h6">R$100</Typography>
                                    <Typography>R$100</Typography>
                                    <Typography variant="h5">{valor}</Typography>
                                </Box>
                            </Box>



                        </Box>


                    </Grid>
                </Grid>
            </Container>
        </>
    )
}