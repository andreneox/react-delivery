import { createTheme } from "@mui/material"
import { grey, red } from "@mui/material/colors"



export const LightTema =createTheme({
    palette:{
        primary:{
            main: grey['800'] ,
            dark:grey['900'],
            light:grey['100'],
            contrastText:'#fff'
        },
        secondary:{
            main:red['500'] ,
            dark:red['700'],
            light:red['400'],
            contrastText:'#fff'
        },
        background:{
           default:grey['400'],
           paper:'#fff',
         
            
        },
      
    },
    
})