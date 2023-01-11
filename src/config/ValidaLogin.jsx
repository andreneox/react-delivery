import {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ValidaLogin = ({children})=>{
const [login]=useState(localStorage.getItem('logado'))
const navigate=useNavigate()
    
    useEffect(()=>{
        if(!login){
            navigate('/login')
        }
    })
    return(
        <>
        {children}
        </>
    )

}