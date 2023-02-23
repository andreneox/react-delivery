import { createTheme } from "@mui/material"
import { grey, red } from "@mui/material/colors"



export const LightTema =createTheme({
    palette:{
        primary:{
            main: grey['900'] ,
            dark:grey['800'],
            light:red['500'],
            contrastText:'#fff'
        },
        secondary:{
            main:red['500'] ,
            dark:red['700'],
            light:red['400'],
            contrastText:'#fff'
        },
        text:{
            primary:'#fff',
            secondary:grey['50']
        },
        
        background:{
           default:'#000',
           paper:grey['900'],
         
            
        },
      
    },
    
})