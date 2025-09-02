import { Request, Response } from 'express';
import { DeleteTechnologyService } from '../../services/technology/DeleteTechnologyService'

export class DeleteTechnologyController {
    async handle(request: Request, response: Response) {
        const { id } = request.body
        const deleteTechnologyService = new DeleteTechnologyService()

        const technologyDelete = await deleteTechnologyService.execute(id)

        return response.json(technologyDelete)

    }
} 