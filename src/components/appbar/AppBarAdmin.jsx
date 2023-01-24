import { AppBar, Button, List, Toolbar } from "@mui/material"
import { Box, Container } from "@mui/system"
import { Link } from "react-router-dom"
import style from './AppBar.module.css'

const pages=[
{
    texto:'Home',
    to:'/admin/home'
},
{
    texto:'Cadastro',
    to:'/cadastro'
},
{
    texto:'Pedidos',
    to:'/pedido'
}
]


export const AppBarAdmin=()=>{
    return(
        <AppBar position="static">
            <Container>
                <Toolbar>
                LOGO
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:10,width:'100%'}}>
       
        {pages.map((page,index)=>(
           <Link key={index} to={page.to} className={style.MenuLink}>{page.texto}</Link>
        ))}
           
            </Box>
            <Link className={style.MenuLink}>Sair</Link>
         
            
     
          
          
                </Toolbar>
            </Container>
        </AppBar>
    )
}