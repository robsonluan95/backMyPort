import {Request,Response} from "express"
import {CreateUserService} from "../../services/user/createUserService"

class CreateUserController{
    async handle(request:Request,response:Response){
        const {email,password}= request.body
        const createUserService = new CreateUserService()
        const user = await createUserService.execute({email,password})
        return response.json(user)

    }
}

export {CreateUserController}