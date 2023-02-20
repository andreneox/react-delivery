import { createContext } from "react";
import {ThemeProvider} from '@mui/material'
import { LightTema } from "../themes/LightTema";
import { Box } from "@mui/system";

const ThemeContext=createContext({})



export const AppThemeProvider =({children})=>{

    return(
        <ThemeContext.Provider >
          <ThemeProvider theme={LightTema}>
            <Box sx={{width:'100vw', height:'100vh', bgcolor:LightTema.palette.background.default}}>
            {children}
            </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}