import { createContext, useState } from "react";
import { json, useNavigate } from "react-router-dom";



export const CarrinhoContext = createContext()


export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([])
  const [valor, setValor] = useState([])
  const [pedido, setPedido] = useState([])



  const adicionaProduto = (id) => {
    const copyProductsCart = [...carrinho]
  
    const item = copyProductsCart.find((produto) => produto.id === id);
  
    if (!item) {
      copyProductsCart.push({ id:id,qtd: 1 })
    } else {
      item.qtd = item.qtd + 1
    }
    console.log(copyProductsCart)
    setCarrinho(copyProductsCart)


  }

  const valorTotal = () => {
    let soma = 0
    carrinho.map((produto) => {
      soma += produto.id.valor * produto.qtd
    })
    setValor(soma)

  }
  const removeProduto = (pedido) => {
    const copyProductsCart = [...carrinho];

    const item = copyProductsCart.find(produto => produto.id === pedido)
    if (item && item.qtd > 1) {
      item.qtd = item.qtd - 1;
      setCarrinho(copyProductsCart);
    } else {
      const arrayFilter = copyProductsCart.filter(produto => produto.id != pedido)
      setCarrinho(arrayFilter)
    }
  }
  const FinalizaPedido = (dados) => {
   const copyPedido=[...pedido]
   const item=copyPedido.find((pedidos)=>pedidos.id ===dados)
    if(!item){
      copyPedido.push({id:dados,lanche:carrinho})
   
    }
    setPedido(copyPedido)
   
    console.log('meu pedido',pedido)

  }


  return (
    <CarrinhoContext.Provider value={{ adicionaProduto, carrinho, setCarrinho, valor, valorTotal, removeProduto, FinalizaPedido,pedido}}>
      {children}
    </CarrinhoContext.Provider>
  )
}