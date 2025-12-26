import { describe, it, expect } from "vitest";
import { advanceState } from "../src/services/ordersService";
import { Order } from "../src/models/Orders";

describe("Fluxo de estados do pedido", () => {
    it("avança CREATED → ANALYSIS → COMPLETED", async () => {
        
        const order = new Order({
            //não sei se funciona, tá dando erro sempre

            cliente: "marquinhosDoArrocha", 
            produto: "pamonhas", 
            quantidade: 1, 
            valorFinal: 10 
        });
        
        await order.save();

        const step1 = await advanceState(order._id.toString());
        expect(step1.state).toBe("ANALYSIS");

        const step2 = await advanceState(order._id.toString());
        expect(step2.state).toBe("COMPLETED");
    });
});

//desisto, vai ficar assim mesmo, se funcionar é milagre