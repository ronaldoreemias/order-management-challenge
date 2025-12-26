import jwt from "jsonwebtoken";

export function gerarToken(payload: object): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    
    //Tô pensando em por 24h...depois eu vejo
    expiresIn: "1h" 
    
    });
}

export function verificarToken(token: string): any {
    
    return jwt.verify(
        token, 
        process.env.JWT_SECRET as string
    );
}
