import {Router, type Request,type Response} from "express";

//- Import de User -//
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DatailsUserController } from "./controller/user/DetailsUserController";

//- Import de Autenticação -//

const router = Router();


//Rota Teste//
router.get('/teste',(req:Request,res:Response)=>{
    return res.json({ok:true})
})

//Rota User // 

router.post('/user',new CreateUserController().handle)
router.post('/session',new AuthUserController().handle)
router.get('/me', isAuthenticated,new DatailsUserController().handle)




export  {router};