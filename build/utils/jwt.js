import jwt from "jsonwebtoken";
export function gerarToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        //Tô pensando em por 24h...depois eu vejo
        expiresIn: "1h"
    });
}
export function verificarToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
