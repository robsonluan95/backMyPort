import { Request, Response } from 'express';
import { ListTechnologyService } from "../../services/technology/ListTechnologyService"

export class ListTechnologyController {
    async handle(request: Request, response: Response) {    
        const listTechnologyController = new ListTechnologyService()
        const technologies = await listTechnologyController.execute()
        return response.json(technologies)
    }
}