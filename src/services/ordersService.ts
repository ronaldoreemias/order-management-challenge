import { Order, IOrder, OrderState } from "../models/Orders.js";

export async function createOrder(data: Partial<IOrder>) {
    // miltiplicar q quanditado com o valor
    const valorFinal = (data.quantidade ?? 0) * (data.valorFinal ?? 0);
    
    //agora eu posso fazer a verificação e validar
        if (valorFinal <= 0) throw new Error("Valor inválido"); // não entendi como funciona o throw, mas tá rodando...

    const order = new Order({ ...data, valorFinal });
    return await order.save();
}

    export async function advanceState(orderId: string) {
    
        const order = await Order.findById(orderId);
        //mundando essa parte pq funcionou o throw kkkk não me pergunte o pq que funcionou, nem eu sei
        if (!order) throw new Error("Pedido não encontrado");

            const fluxo: Record<OrderState, OrderState | null> = {
            CREATED: "ANALYSIS",
            ANALYSIS: "COMPLETED",
            COMPLETED: null
        };

  const next = fluxo[order.state];
  
  if (!next) throw new Error(
        "Não é possível avançar além de COMPLETED"
    );

  order.state = next;
  await order.save();
  return order;
}
