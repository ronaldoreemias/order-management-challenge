import { Schema, model } from "mongoose";
const ServiceSchema = new Schema({
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
const OrderSchema = new Schema({
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
export const Order = model("Order", OrderSchema);
