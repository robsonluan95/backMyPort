import { Request, Response } from 'express';
import { ListProjectService } from '../../services/project/ListProjectService'

export class ListProjectController {
    async handle(request: Request, response: Response) {
        const listProjectController = new ListProjectService()
        const projects = await listProjectController.execute()
        return response.json(projects)


    }

}