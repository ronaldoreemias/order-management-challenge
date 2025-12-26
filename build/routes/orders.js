import { Router } from "express";
import { autenticarToken } from "../middlewares/auth.js";
import { createOrder, advanceState } from "../services/ordersService.js";
import { Order } from "../models/Orders.js";
const router = Router();
router.post("/", autenticarToken, async (req, res) => {
    try {
        const order = await createOrder(req.body);
        res.json(order);
    }
    catch (err) {
        res.status(400).json({ mensagem: err.message });
    }
});
router.get("/", autenticarToken, async (req, res) => {
    const { page = 1, limit = 10, state } = req.query;
    const filtro = state ? { state } : {};
    const skip = (Number(page) - 1) * Number(limit);
    try {
        const orders = await Order.find(filtro).skip(skip).limit(Number(limit));
        const total = await Order.countDocuments(filtro);
        res.json({ page: Number(page), limit: Number(limit), total, orders });
    }
    catch (err) {
        res.status(400).json({ mensagem: "Erro ao buscar pedidos" });
    }
});
router.patch("/:id/advance", autenticarToken, async (req, res) => {
    try {
        const order = await advanceState(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400).json({ mensagem: err.message });
    }
});
export default router;
