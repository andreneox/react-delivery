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
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { api } from "../../config/Api";


export const Checkout = () => {

    const { carrinho, adicionaProduto, removeProduto, CalculaSubTotal, subValor, valorTotal, CalculaValorTotal } = useContext(CarrinhoContext)
    const [url, setUrl] = useState('http://localhost:3005/files/')
    const [cep, setCep] = useState();
    const [endereco, setEndereco] = useState([]);
    const { logradouro, bairro, localidade, } = endereco;
    const bairros = [{ bairro: 'Ponta Negra', taxa: 10 }, { bairro: 'Compensa', taxa: 5 }]
    const navigate = useNavigate()
    const [taxa, setTaxa] = useState(0)
    const [nome, setNome] = useState()
    const [telefone, setTelefone] = useState()
    const [casa, setCasa] = useState()
    const [observacao, setObservacao] = useState()


    useEffect(() => {
        CalculaSubTotal()
        CalculaValorTotal(taxa)



        if (carrinho.length < 1) {
            navigate('/cardapio')
        }

    })




    const calculaTaxa = (bairro) => {

        const bairroEncontrado = bairros.find((obj) => obj.bairro === bairro);

        if (bairroEncontrado) {
            return setTaxa(bairroEncontrado.taxa)
        } else {
            return alert('nao entregamos para o bairro' + " " + bairro)
        }

    }

    const buscarCep = (cep) => {
        axios.get('https://viacep.com.br/ws/' + cep + '/json/', {

        })
            .then(function (response) {
                // manipula o sucesso da requisição
                console.log(response)

                setEndereco(response.data)
                calculaTaxa(response.data.bairro)



            })
            .catch(function (error) {
                // manipula erros da requisição
                console.error(error);
            })

    }


    const FinalizaPedido = () => {

        api.post('/CadastrarPedido', {
            nome: nome,
            telefone: telefone,
            cep: cep,
            bairro: bairro,
            rua: logradouro,
            casa: casa,

            produtos: carrinho.map((produto) => {
                
                return {

                    id: produto.id.id,
                    qtd: produto.qtd,
                    

                }
                
            }
                  
            ),
            taxa:taxa,
            valorTotal:valorTotal,
            observacao:observacao
            

        })
            .then(function (response) {
                console.log(response);
            navigate('/finalizacao')

            })
            .catch(function (error) {
                console.log(error);
            });
    }



    return (
        <>
            <AppBarCliente />
            <Container maxWidth='xl'>
                <Grid container spacing={10} sx={{ mt: { xs: 5, md: 10 } }} >

                    <Grid item xs={12} md={12} lg={6}>
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
                                <TextField label='Nome' sx={{ width: { xs: '100%', md: '30%' } }}
                                    onChange={(e) => setNome(e.target.value)}


                                />
                                <TextField label='Sobrenome' sx={{ width: { xs: '100%', md: '30%' } }}
                                    onChange={(e) => setNome(e.target.value)}


                                />
                                <TextField label='Telefone para contato' sx={{ width: { xs: '100%', md: '30%' } }}
                                    onChange={(e) => setTelefone(e.target.value)}


                                />
                                <TextField label='cep' sx={{ width: { xs: '100%', md: '30%' } }}
                                    onBlur={() => buscarCep(cep)}
                                    onChange={(e) => setCep(e.target.value)}


                                />

                                <TextField label='rua' sx={{ width: { xs: '100%', md: '100%' } }}
                                    InputLabelProps={{ shrink: true }}
                                    value={logradouro}




                                />
                                <TextField label='numero' sx={{ width: { xs: '100%', md: '30%' } }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setCasa(e.target.value)}

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

                                <Button variant="contained"> <AttachMoneyIcon />Dinheiro</Button>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} >



                        <Typography variant="h5">Pedidos Selecionados</Typography>

                        <Box sx={{ p: 5, bgcolor: 'background.paper' }}>




                            {carrinho.map((pedido, index) => (
                                <>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                                        <Box sx={{ width: '80px' }}>
                                            <img style={{ width: '100%', height: '100%' }} src={url + pedido.id.img}></img>
                                        </Box>

                                        <Typography variant="h6">{pedido.id.nome}</Typography>
                                        <Typography variant="h6" fontWeight={'bolder'}>R${pedido.id.valor}</Typography>

                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, boxShadow: 2 }}>
                                            <IconButton onClick={() => removeProduto(pedido.id)} >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography>{pedido.qtd}</Typography>
                                            <IconButton onClick={() => adicionaProduto(pedido.id)}>
                                                <AddIcon />
                                            </IconButton>

                                        </Box>
                                        <Button variant="contained">Excluir item</Button>
                                    </Box>
                                </>
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Typography variant="h6">Subtotal</Typography>
                                    <Typography>Entrega</Typography>
                                    <Typography variant="h5">Total</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Typography variant="h6">R${subValor}</Typography>
                                    <Typography>R${taxa.toFixed(2)}</Typography>
                                    <Typography variant="h5">R${valorTotal}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 3, gap: 2 }}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Observação"
                                    multiline
                                    sx={{ bgcolor: grey['A700'], width: '100%' }}
                                    InputLabelProps={{ shrink: true }}
                                    rows={10}
                                    onChange={(e) => setObservacao(e.target.value)}
                                    placeholder={'ex: tirar cebela,troco para 50R$ etc.'}
                                />
                                <Button variant="contained" sx={{ width: '100%' }} onClick={FinalizaPedido}>Finalizar Pedido</Button>
                            </Box>


                        </Box>


                    </Grid>
                </Grid>
            </Container>
        </>
    )
}