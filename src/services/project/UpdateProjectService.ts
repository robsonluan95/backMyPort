import prismaClient from '../../prisma'
import { ProjectProps } from './CreateProjectService'

interface UpdateProjectProps extends ProjectProps {
    id: string;
    techIds: string[];
}


export class UpdateProjectService {
    async execute({
        id,
        techIds,
        ...rest
    }: UpdateProjectProps) {

        const projeto = await prismaClient.project.update({
            where: {
                id: id
            }, data: {
                ...rest,
                technologies: {
                    set: techIds.map((techId) => ({ id: techId }))
                },

            },
            include: {
                technologies: true
            }
        })
        return projeto

    }
}