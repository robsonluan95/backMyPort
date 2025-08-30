import {Request,Response} from 'express';
import {DeleteProjectService} from '../../services/project/DeleteProjectService'

export class DeleteProjectController{
    async handle(request:Request,response:Response){
        const {id} = request.body
        const deleteProjectService = new DeleteProjectService()

        const projectDelete = await deleteProjectService.execute(id)

        return response.json(projectDelete)

    }
}