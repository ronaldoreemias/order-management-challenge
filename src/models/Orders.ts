import { Schema, model } from "mongoose";

export type OrderState = "CREATED" | "ANALYSIS" | "COMPLETED";
export type OrderStatus = "ACTIVE" | "DELETED";

export interface IService {
  name: string;
  value: number;
  status: "PENDING" | "DONE";
}

export interface IOrder {
  lab: string;
  patient: string;
  customer: string;
  services: IService[];
  state: OrderState;
  status: OrderStatus;
}

const ServiceSchema = new Schema<IService>({
    name: { 
        type: String, 
        required: true 
    
    },

    value: { 
        type: Number, 
        required: true 
    },

    status: { 
        type: String, 
        enum: ["PENDING", "DONE"], 
        default: "PENDING" 
    }
});

const OrderSchema = new Schema<IOrder>({
    lab: { 
        type: String, 
        required: true 
    },

    patient: { 
        type: String, 
        required: true 
    },

    customer: { 
        type: String, 
        required: true 
    },

    services: { 
        type: [ServiceSchema], 
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
