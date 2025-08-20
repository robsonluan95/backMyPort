import express, {type Request,type Response,type NextFunction} from 'express';
import cors from "cors";
import {router} from "./routes";
const app = express();


app.use(express.json())

app.use(cors())
app.use(router)

app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof Error){
        return res.status(400).json({
            error:err.message
        })
    }

    //caso o err seja no servidor error 500
    return res.status(500).json({
        status:'error',
        message:'internal server error'
    })

})

app.listen(3333,()=>{
    console.log("server online ")
})