import { Router, Request, Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/cadastro", async (req: Request, res: Response) => {
  const { email, password, confirmarSenha } = req.body;

  //verificar primeiro se os campos estão vazios, vai que enviaram vazios
  if (!email || !password || !confirmarSenha) {
    
    return res.json({ 
        mensagem: "Campos obrigatórios não preenchidos" 
    });
  
}
    // verificar se tem campos supeitos
    const suspeita = [ '$', '!', '{', '[', '/' ];
    
    const campos = [ email, password, confirmarSenha];

    for (const campo of campos) {
    
        if (suspeita.some(char => campo.includes(char))) {
        
        return res.status(400).json({ 
            mensagem: "Entrada suspeita detectada" 
        });
    }
    }


    // agora vamos previnir contra DoS hehehe.... não é bemmmmm previr , mas ajuda a combater
    if(email.length > 50){
        return res.status(400).json({
            mensagem: "vai conseguir muito em, tenta mais"
        });
    }

    if(password.length > 50){
        return res.status(400).json({
            mensagem: "vai conseguir muito em, tenta mais"
        });
    }


//aqui tô só verificando se a senha tá correta mesmo
  if (password !== confirmarSenha) {
    
    return res.json({ 
        mensagem: "Senhas não coincidem" 
    });
  
  }

  const existente = await User.findOne({ email });
  
  if (existente) {
   
    return res.json({ 
        mensagem: "Usuário já cadastrado" 
    });
  
}
    //resolvi usar o bcrypt para ter uma hash em vez de senha, não é seguro guardar senha sem incriptar
  const hash = await bcrypt.hash(password, 10);
  const novoUsuario = new User({ email, password: hash });
  
  await novoUsuario.save();

  res.json({ 
    mensagem: "Usuário cadastrado com sucesso" 
    });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

   if (!email || !password) {
    
    return res.json({ 
        mensagem: "Campos obrigatórios não preenchidos" 
    });
  
}

    const suspeita = [ '$', '!', '{', '[', '/' ];
    
    const campos = [ email, password];

    for (const campo of campos) {
    
        if (suspeita.some(char => campo.includes(char))) {
        
        return res.status(400).json({ 
            mensagem: "Entrada suspeita detectada" 
        });
    }
    }

    const usuario = await User.findOne({ email });
        
    if (!usuario) {
            
            return res.json({ mensagem: "Usuário não encontrado" });
        
        } 

    // comparando se a hash guardada no banco equivale a senha digitada no login 
    const senhaValida = await bcrypt.compare(password, usuario.password);
  
    //fica mais seguro para essa verificação
  if (!senhaValida){
    return res.json({ mensagem: "Senha incorreta" });
  } 

  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  //enviando o token junto com a resposta em json
    res.json({ 
        mensagem: "Login realizado com sucesso", token 
    });
});

export default router;
