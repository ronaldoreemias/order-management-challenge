import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ 
        mensagem: "Token não fornecido" 
    });
  }

  try { 
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  
} catch (err) {
    return res.status(403).json({ 
        mensagem: "Token inválido" 
    });
  }
}
