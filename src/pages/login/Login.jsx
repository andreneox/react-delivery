import { Alert, Button, Card, Divider, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../config/Api"



export const Login = ()=>{

    const [user,setUser]=useState()
    const [password,setPassword]=useState()
    const [error,setError]=useState(false)
    const navigate=useNavigate()
    const handleClick =(event)=>{
        event.preventDefault()
        api.post('/Login', {
            nome:user,
            password:password
          })
          .then(function (response) {
            console.log(response);
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('logado',true)
            navigate('/home')

          })
          .catch(function (error) {
           setError('login ou senha invalida')
          });
        }
    return(
        <Box  width='100vw' height={'100vh'} display='flex' justifyContent={'center'}  alignItems='center'>
     
        <Card>
            <Box width='400px' height='500px' display={'flex'} justifyContent='center' alignItems='center'>
               
            <Box display='flex' flexDirection='column' width='70%' gap={4} component={'form'} onSubmit={handleClick}>
            <Typography variant="h6"> <Divider>Tela de Login</Divider> </Typography>
            
           
            <TextField
            label='user'
            type='text'
            onChange={(event)=>setUser(event.target.value)}
            onFocus={()=>setError('')}
            />
             {error && <Alert sx={{}} severity="error">{error}</Alert>}
             <TextField
            label='password'
            type='password'
            onChange={(event)=>setPassword(event.target.value)}
            onFocus={()=>setError('')}
            />
            <Button variant="contained" type="submit">Logar</Button>
            </Box>
              </Box>
        </Card>
        </Box>
    )
}