import { Schema, model } from "mongoose"; // melhor postgresql...interface complicada essa


//acho que agora funciona
export type OrderState = "CREATED" | "ANALYSIS" | "COMPLETED";
export type OrderStatus = "ACTIVE" | "DELETED";

export interface IOrder {
  cliente: string;
  produto: string;
  quantidade: number;
  valorFinal: number;
  state: OrderState;
  status: OrderStatus;
}

const OrderSchema = new Schema<IOrder>({
  
    cliente: { 
        type: String, 
        required: true 
    },

    produto: { 
        type: String, 
        required: true 
    },

    quantidade: { 
        type: Number, 
        required: true 
    },

    valorFinal: { 
        type: Number, 
        required: true 
    },

    state: { 
        type: String, 
        enum: ["CREATED", "ANALYSIS", "COMPLETED"], 
        default: "CREATED" 
    },
    status: { 
        type: String, 
        enum: ["ACTIVE", "DELETED"], 
        default: "ACTIVE" 
    }
});

export const Order = model<IOrder>("Order", OrderSchema);
