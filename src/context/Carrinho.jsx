import { createContext, useState } from "react";




export const CarrinhoContext = createContext()


export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([])
  const [subValor, setSubValor] = useState()
  const [pedido, setPedido] = useState([])
  const [openDrawer,setOpenDrawer]=useState(false)
  const [valorTotal,setValorTotal]=useState()
  const [contador,setContador]=useState(0)



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

  const CalculaValorTotal = (taxa)=>{
    let soma=0
    carrinho.map((produto)=>{
      soma+=produto.id.valor*produto.qtd
    })
    setValorTotal((soma+taxa).toFixed(2))
  }

 
  const CalculaSubTotal = () => {
    let soma = 0
    carrinho.map((produto) => {
      soma += produto.id.valor * produto.qtd
    })
   
    setSubValor(soma.toFixed(2))
   
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
  const FinalizaPedido = () => {
   const copyPedido=[...pedido]

  
      copyPedido.push()
   
    
    setPedido(copyPedido)
   
    

  }


  return (
    <CarrinhoContext.Provider value={{contador, pedido,adicionaProduto,CalculaValorTotal ,carrinho, setCarrinho,valorTotal, subValor, CalculaSubTotal, removeProduto, FinalizaPedido,openDrawer,setOpenDrawer}}>
      {children}
    </CarrinhoContext.Provider>
  )
}