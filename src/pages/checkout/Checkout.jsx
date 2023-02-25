import { Grid, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { AppBarCliente } from "../../components/appbar/AppBarCliente"
import PlaceIcon from '@mui/icons-material/Place';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export const Checkout = () => {


    return (
        <>
            <AppBarCliente />
            <Container maxWidth='xl'>
                <Grid container sx={{mt:{xs:10,md:20}}} >

                    <Grid item xs={12} md={8}>
                    <Typography sx={{mb:1}} variant="h5">Complete seu pedido</Typography>
                        <Box sx={{p:5,bgcolor: 'background.paper'}}>

                        <Box sx={{ display: 'flex'}}>
                            <PlaceIcon sx={{mr:1}} />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontWeight: 'bolder' }}>Endereço de entrega</Typography>
                                <Typography>Informe o endereço onde dejesa receber seu pedido</Typography>
                            </Box>

                        </Box>
                        <Box sx={{ display:'flex', flexWrap: 'wrap',mt:5, gap:{xs:2,md:2} }}>
                            <TextField label='cep' sx={{width:{xs:'100%',md:'30%'}}} />
                            <TextField label='rua'sx={{width:{xs:'100%',md:'100%'}}} />
                            <TextField label='numero' sx={{width:{xs:'100%',md:'30%'}}}/>
                            <TextField label='complemento' sx={{width:{xs:'100%',md:'50%'}}} />
                            <TextField label='bairro' sx={{width:{xs:'100%',md:'30%'}}} />
                            <TextField label='cidade' sx={{width:{xs:'100%',md:'50%'}}} />
                        </Box>
                        </Box>

                        <Box sx={{mt:5,bgcolor:'background.paper',p:5}}>
                        <Box sx={{display:'flex'}}>
                        <AttachMoneyIcon sx={{mr:1,fontSize:'30px'}}/>
                        <Box sx={{display:'flex',flexDirection:'column'}}>
                        <Typography>Pagamento</Typography> 
                        <Typography>O pagamento é feito na entrega. Escolha a forma que deseja pagar</Typography> 
                        </Box>
                          
                        </Box>
                        </Box>
                    </Grid>
                    <Grid item md={4} sx={{display:{xs:'none',md:'flex',}}}>
                    teste
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}