import { Request, Response } from 'express';
import { UpdateTechnologyService } from '../../services/technology/UpdateTechnologyService'
import { UploadToCloudinary } from '../../utils/UploadToCloudinary'


export class UpdateTechnologyController {
    async handle(request: Request, response: Response) {
        const { id, name } = request.body
        const file = request.file

        const updateTechnologyController = new UpdateTechnologyService()
        const uploadToCloudnary = new UploadToCloudinary()
        try {
            const bannerUrl = await uploadToCloudnary.execute(file.buffer, "Technologies")

            const technology = await updateTechnologyController.execute({ id, name, banner: bannerUrl })

            return response.json(technology)
            
        } catch (err) {
            console.error("Erro ao atualizar tecnologia", err)
            return response.status(500).json({ err: "Erro ao atualizar tecnologia" })
        }


        
    }
}