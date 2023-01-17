import { createContext, useState } from "react";


export const CarrinhoContext= createContext()


export const CarrinhoProvider=({children})=>{
        const [carrinho,setCarrinho]=useState([])
        const [valor,setValor]=useState([])
        const [resultado,setResultado]=useState(0)
       

  const  adicionaProduto=(produto)=>{
         setCarrinho([...carrinho,produto])
         console.log('add com sucesso',carrinho)
        }
        const valorTotal = ()=>{
        let soma=0
         carrinho.map((produto)=>{
        soma +=produto.valor
         
         })
         setValor(soma)
         console.log("valor total",valor)
        }
    return(
     <CarrinhoContext.Provider value={{adicionaProduto,carrinho,setCarrinho,valor,valorTotal}}>
        {children}
     </CarrinhoContext.Provider>
    )
}