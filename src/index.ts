import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Rotas
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com Atlas
mongoose.connect(process.env.MONGO_URI as string)
  
    .then(() => console.log("Conectado ao MongoDB Atlas"))

    .catch(err => console.error("Erro de conexão:", err));


// Rotas principais
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

// Rota raiz
app.get("/", (req, res) => {
    res.send("Servidor rodando lisooooo liso liso  kkkkk");
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
