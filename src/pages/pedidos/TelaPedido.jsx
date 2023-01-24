import { useState } from "react"
import { useContext, useEffect } from "react"
import { CarrinhoContext } from "../../components/appbar/Carrinho"



export const TelaPedido=()=>{

    
    const [pedidos]=useState((localStorage.getItem('pedido')))
  useEffect(()=>{
 
   console.log("pedidos",pedidos)
 
  })
    return(
        <div>
            <h1>Tela de pedidos</h1>
           
            <div>
            
       

            </div>
        </div>
         
    )
}