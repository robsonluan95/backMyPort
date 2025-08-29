import {Request,Response} from 'express';
import {CreateTechnologyService} from "../../services/technology/CreateTechnologyService"
import {UploadToCloudinary} from "../../utils/UploadToCloudinary"

export class CreateTechnologyController{
    async handle(request:Request,response:Response){
        const {name}= request.body
        const file = request.file


        const createTechnologyService =  new CreateTechnologyService()
        const uploadToCloudinary = new UploadToCloudinary() 

        
        try{
            if(!file){
                return response.status(400).json({err:"Arquivo Imagem é obrigatorio"})
            }

            const bannerUrl  = await uploadToCloudinary.execute(file.buffer,"Technologies")
            const tecnologia = await createTechnologyService.execute({
                name,banner:bannerUrl, 
            })

            return response.json(tecnologia)

        }catch(err){
            console.error("Error ao criar tecnologia",err)
            return response.status(500).json({err:"Error interno do servidor!"})
        }

    }
}