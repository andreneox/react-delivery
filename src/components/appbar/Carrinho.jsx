import { createContext, useState } from "react";


export const CarrinhoContext= createContext()


export const CarrinhoProvider=({children})=>{
        const [carrinho,setCarrinho]=useState([])
        const [valor,setValor]=useState([])
        
       

  const  adicionaProduto=(id)=>{
    const copyProductsCart = [...carrinho]

    const item = copyProductsCart.find((produto)=>produto.id ===id);
 
    if(!item){
        copyProductsCart.push({id:id,nome:id.nome,valor:id.valor,qtd:1})
    }else{
        item.qtd = item.qtd+1
    }
    
    setCarrinho(copyProductsCart)

    
        }
        
        const valorTotal = ()=>{
        let soma=0
         carrinho.map((produto)=>{
        soma +=produto.valor * produto.qtd
         })
         setValor(soma)
         console.log("valor total",valor)
        }
        const removeProduto=(pedido)=>{
            const copyProductsCart = [...carrinho];

        const item = copyProductsCart.find(produto=>produto.id ===pedido)
        if (item  && item.qtd >1) {
            item.qtd = item.qtd - 1;
            setCarrinho(copyProductsCart);
        }else{
          const arrayFilter = copyProductsCart.filter(produto=>produto.id != pedido)
          setCarrinho(arrayFilter)
        }
      
      }
        
    return(
     <CarrinhoContext.Provider value={{adicionaProduto,carrinho,setCarrinho,valor,valorTotal,removeProduto}}>
        {children}
     </CarrinhoContext.Provider>
    )
}