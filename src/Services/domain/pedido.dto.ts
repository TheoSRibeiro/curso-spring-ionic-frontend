import { RefDTO } from "../../models/ref.dto";
import { ItemPedidoDTO } from "./item-pedido.dto";
import { PagamentoDTO } from "./pagamento.dto";

export interface PedidoDTO{
    cliente: RefDTO;
    enderecoDeEntrega: RefDTO;
    pagamento: PagamentoDTO;
    itens: ItemPedidoDTO[];
}