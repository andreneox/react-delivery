import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useContext } from "react"
import { CarrinhoContext } from '../../context/Carrinho';


export const SnackBarMessage =({add}) =>{
  const { adicionaProduto, valorTotal,contaQtd} = useContext(CarrinhoContext)
  const { enqueueSnackbar } = useSnackbar();
 
  const handleClick = () => {
    contaQtd()
    enqueueSnackbar(add.nome+" "+'no carrinho ;)', { variant: 'success',
  
  });
    adicionaProduto(add)
    console.log("snack",add)
  };

  return (
    <Button variant='contained' onClick={handleClick}>Adicionar ao carrinho</Button>
  );
}