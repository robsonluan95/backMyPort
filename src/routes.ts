import {Router, type Request,type Response} from "express";
import { CreateUserController } from "./controller/user/createUserController";

const router = Router();


//Rota Teste//
router.get('/teste',(req:Request,res:Response)=>{
    return res.json({ok:true})
})

//Rota User // 

router.post('/user',new CreateUserController().handle)

export  {router};