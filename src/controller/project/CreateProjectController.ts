import { Request, Response } from 'express'
import { CreateProjectService } from '../../services/project/CreateProjectService'
import { UploadToCloudinary } from '../../utils/UploadToCloudinary'


export class CreateProjectController {
    async handle(request: Request, response: Response) {
        const {
            name, startYear, endYear, typeProject, mobile,
            location, github, site, figma, description, techIds
        } = request.body

        const bannerWeb = request.files['bannerWeb']?.[0];
        const bannerMobile = request.files['bannerMobile']?.[0];

        const arrayTech = Array.isArray(techIds) ? techIds : techIds.split(',')

        const createProjectService = new CreateProjectService()
        const uploadToCloudnary = new UploadToCloudinary()

        const startYearNumber = Number(startYear)
        const endYearNumber = Number(endYear)
        const mobileBoolean = mobile === 'true' || mobile === true

        try {
            const bannerWebUrl = await uploadToCloudnary.execute(bannerWeb.buffer, 'BannerWeb')
            const bannerMobileUrl = await uploadToCloudnary.execute(bannerMobile.buffer, 'BannerMobile')

            const projeto = await createProjectService.execute({
                name, startYear: startYearNumber, endYear: endYearNumber, typeProject, mobile: mobileBoolean,
                location, github, site, figma, description, techIds: arrayTech, bannerWeb: bannerWebUrl, bannerMobile: bannerMobileUrl
            })

            return response.json(projeto)
        } catch (err) {
            console.error('Erro ao criar projeto', err)
            return response.status(500).json({ err: 'Erro interno do servidor' })
        }



    }
}