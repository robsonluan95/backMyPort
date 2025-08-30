import { Request, Response } from 'express';
import { UpdateProjectService } from '../../services/project/UpdateProjectService'
import { UploadToCloudinary } from '../../utils/UploadToCloudinary'
import { ProjectProps } from '../../services/project/CreateProjectService'



export class UpdateProjectController {
    async handle(request: Request, response: Response) {
        const {
            id, name, startYear, endYear, typeProject, mobile, location,
            github, site, figma, description, techIds,
        } = request.body
        const bannerWeb = request.files['bannerWeb']?.[0];
        const bannerMobile = request.files['bannerMobile']?.[0];


        const arrayTech = Array.isArray(techIds) ? techIds : techIds.split(',')

        const updateProjectService = new UpdateProjectService()
        const uploadToCloudnary = new UploadToCloudinary()

        const startYearNumber = Number(startYear)
        const endYearNumber = Number(endYear)
        const mobileBoolean = mobile === 'true' || mobile === true

        try {
            const bannerWebUrl = await uploadToCloudnary.execute(bannerWeb.buffer, 'BannerWeb')
            const bannerMobileUrl = await uploadToCloudnary.execute(bannerMobile.buffer, 'BannerMobile')

            const updateProject = await updateProjectService.execute({
                id, name, startYear: startYearNumber, endYear : endYearNumber, typeProject, mobile : mobileBoolean, location,
                github, site, figma, description, techIds: arrayTech, bannerWeb: bannerWebUrl, bannerMobile: bannerMobileUrl,
            })

            return response.json(updateProject)

        } catch (err) {
            console.error('Erro ao criar projeto', err)
            return response.status(500).json({ err: 'Erro interno do servidor' })
        }

    }
}