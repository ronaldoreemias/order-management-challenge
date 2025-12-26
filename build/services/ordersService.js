import { Order } from "../models/Orders.js";
// eu juro que tá certo, mas pode ser que não esteja...... testar depois com o cURL
export async function createOrder(data) {
    // verificar se o pedido tem pelomenos um serviço
    if (!data.services || data.services.length === 0) {
        throw new Error("Pedido deve conter ao menos um serviço");
    }
    const valorTotal = data.services.reduce((acc, s) => acc + s.value, 0);
    // verificar se é menor ou igual a 0
    if (valorTotal <= 0) {
        throw new Error("Valor total inválido");
    }
}
export async function advanceState(orderId) {
    const order = await Order.findById(orderId);
    //mundando essa parte pq funcionou o throw kkkk não me pergunte o pq que funcionou, nem eu sei
    if (!order)
        throw new Error("Pedido não encontrado");
    const fluxo = {
        CREATED: "ANALYSIS",
        ANALYSIS: "COMPLETED",
        COMPLETED: null
    };
    const next = fluxo[order.state];
    if (!next)
        throw new Error("Não é possível avançar além de COMPLETED");
    order.state = next;
    await order.save();
    return order;
}
