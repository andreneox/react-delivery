import { createContext, useState } from "react";




export const CarrinhoContext = createContext()


export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([])
  const [valor, setValor] = useState([])
  const [pedido, setPedido] = useState([])
  const [openDrawer,setOpenDrawer]=useState(false)



  const adicionaProduto = (id) => {

    const copyProductsCart = [...carrinho]
  
    const item = copyProductsCart.find((produto) => produto.id === id);
  
    if (!item) {
      copyProductsCart.push({ id:id,qtd:1 })
    } else {
      item.qtd = item.qtd + 1
    }
   
   
    setCarrinho(copyProductsCart)

    console.log('carrinho',carrinho)
  
    
   

  }

  const valorTotal = () => {
    let soma = 0
    carrinho.map((produto) => {
      soma += produto.id.valor * produto.qtd
    })
    setValor(soma.toFixed(2))
   
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
  const FinalizaPedido = (desc) => {
   const copyPedido=[...pedido]

  
      copyPedido.push({descricao:desc})
   
    
    setPedido(copyPedido)
   
    

  }


  return (
    <CarrinhoContext.Provider value={{ pedido,adicionaProduto, carrinho, setCarrinho, valor, valorTotal, removeProduto, FinalizaPedido,pedido,openDrawer,setOpenDrawer}}>
      {children}
    </CarrinhoContext.Provider>
  )
}