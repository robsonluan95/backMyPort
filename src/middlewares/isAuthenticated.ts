// Importamos
import {Request,Response,NextFunction} from 'express';
//importamos para fazer a verificação
import {verify} from 'jsonwebtoken'

interface PlayLoad{
    sub:string;
}

export function isAuthenticated(request:Request,response:Response,next:NextFunction){
    //buscando caso tenhamos um token
    const authToken = request.headers.authorization;

    if (!authToken){
        return response.status(401).end()
    }

    const [,token]= authToken.split(" ")

    try{
        const {sub}= verify(token,process.env.JWT_SECRET) as PlayLoad
        request.user_id = sub

        return next();

    }catch (err){
        console.error('Erro na verificação do token:', err);
        return response.status(401).end()
    }

}