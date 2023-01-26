import { AppBar, Button, List, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { Link } from "react-router-dom"
import style from './AppBar.module.css'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

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
    const [openMenu, setOpenMenu] = useState(false);
  
  
    const openNavMenu = () => {
      setOpenMenu(true);
    };
 
  
    const openCloseMneu = () => {
      setOpenMenu(false);
    };
  
  
    return(
     
        <AppBar position="sticky">
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
              <Box sx={{display:{md:'flex',xs:'none'}}}>
                Logo
              </Box>
              
            <Box sx={{display:{md:'flex',xs:'none',justifyContent:'center',alignItems:'center',gap:10,width:'100%'}}}>
        {pages.map((page,index)=>(
           <Link key={index} to={page.to} className={style.MenuLink}>{page.texto}</Link>
        ))}
           
            </Box>

            <Box sx={ {display: { xs: "flex",justifyContent:'center',alignItems:'center',width:'100%', md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openNavMenu}
              color="inherit"
             
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "center"

                
              }}
              
            
              open={Boolean(openMenu)}
              onClose={openCloseMneu}
              sx={{
                display: { xs: "flex", md: "none" }
              }}
            >
              {pages.map((page,index) => (
                <MenuItem key={index} onClick={openCloseMneu}>
                  <Link className={style.MenuLinkCell} to={page.to}><Typography textAlign="center" color={'black'}>{page.texto}</Typography></Link>
                  
                </MenuItem>
              ))}
            </Menu>
          </Box>
           
          
       
       <Link className={style.MenuLink}>Sair</Link>
      
         
       
                </Toolbar>
                </Container>
              
        </AppBar>
        
    )
}