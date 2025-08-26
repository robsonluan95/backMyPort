import {Request,Response} from "express";
import {DetailsUserService} from "../../services/user/DetailsUserService"

export class DatailsUserController{

    async handle(request:Request,response:Response){
        const {email,password}= request.body
        const detailsUserService = new DetailsUserService()
        const userDetails = await detailsUserService.execute({email,password})
        return response.json(userDetails)

    }

}
