import { useEffect, useState } from "react"
import { AppBarAdmin } from "../../components/appbar/AppBarAdmin"
import { api } from "../../config/Api"
import { ValidaLogin } from "../../config/ValidaLogin"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper }   from '@mui/material/styles';
import { Box } from "@mui/system";

export const TelaPedido = () => {

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {

    api.get('/VisualizarPedidos', {
      headers: {
        "authorization": localStorage.getItem('token')
      }
    })
      .then(function (response) {
        // manipula o sucesso da 

        console.log('response', response.data)

        setPedidos(response.data.data)

      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })

  }, [])




  return (


        <ValidaLogin>

      
      <AppBarAdmin />
      <div>
      <h2>Lista de Pedidos</h2>
      <table>
        <thead>
          <tr>
            <th>ID do Pedido</th>
            <th>Nome do cliente</th>
            <th>telefone</th>
            <th>rua</th>
            <th>casa</th>
            <th>bairro</th>
            <th>cep</th>
            <th>Produtos</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.nome}</td>
              <td>{pedido.telefone}</td>
              <td>{pedido.rua}</td>
              <td>{pedido.casa}</td>
              <td>{pedido.bairro}</td>
              <td>{pedido.cep}</td>

              <td>
                <ul>
                  {pedido.Pedidos.map(produto => (
                    <li key={produto.Cardapio.id}>{produto.Cardapio.nome}
                    {produto.Cardapio.valor} 
                      qtd: {produto.qtd}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   
    </ValidaLogin>
  )
}