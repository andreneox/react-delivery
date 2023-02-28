import { Box, Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { AppBarCliente } from "../../components/appbar/AppBarCliente"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaidIcon from '@mui/icons-material/Paid';

export const Finalizacao = () => {


    return (
        <>

            <AppBarCliente />

            <Container maxWidth='xl' >
                <Grid container spacing={10}>
                    <Grid item lg={6}>
                        <Box sx={{display:'flex',flexDirection:'column',mt:{xs:5,lg:25}}}>

                      
                        <Typography variant="h4" fontWeight={'bolder'}>Uhul! Pedido confirmado</Typography>
                        <Typography variant='h6'>Agora é só aguardar que logo seu pedido chegará até você</Typography>
                        </Box>
                    <Box sx={{display:'flex',flexDirection:'column',gap:5,boxShadow:24,p:5,mt:5}}>
                    <Box sx={{display:'flex',alignItems:'center', width:'100%',gap:1}}>
                        <LocationOnIcon fontSize="large"/>
                    <Typography variant="h6">Entrega na rua antonio luiz pereira,41 - compensa</Typography>
                        </Box>
                        <Box sx={{display:'flex',alignItems:'center', width:'100%',gap:1}}>
                       <AccessTimeFilledIcon fontSize="large"/>
                    <Typography variant="h6">Previsão de entrega 20 min - 30 min</Typography>
                        </Box>
                        <Box sx={{display:'flex',alignItems:'center', width:'100%',gap:1}}>
                       <PaidIcon fontSize="large"/>
                    <Typography variant="h6">Pagamento na entrega</Typography>
                    <Typography variant="h6">Cartão de Crédito</Typography>
                        </Box>
                   

                    </Box>
                
                    </Grid>


                    <Grid item xs={12} lg={6}>
                    <Box sx={{display:'flex',boxShadow:21,justifyContent:'center',alignItems:'center',height:'100%',mt:{lg:10}}}>
                    <img style={{width:'100%',height:'100%'}} src="https://images.vexels.com/media/users/3/224179/isolated/preview/cfc075888ed8ccfefe27c5a2a5f194b0-logotipo-do-entregador-de-moto.png"/>
                  

                  </Box>
                  
                  
                  
                    </Grid>

                </Grid>
            </Container>
        </>

    )
}