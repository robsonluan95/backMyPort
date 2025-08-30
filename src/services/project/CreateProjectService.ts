import prismaClient from "../../prisma"

export interface ProjectProps {
    name: string;
    startYear: number;
    endYear: number;
    typeProject: string;
    mobile: boolean;
    location: string;
    github: string;
    site: string;
    figma: string;
    description: string;

    bannerWeb: string;
    bannerMobile: string;

    techIds: string[];

}

export class CreateProjectService {
    async execute({
        name, startYear, endYear, typeProject, mobile,
        location, github, site, figma, description, techIds, bannerWeb, bannerMobile
    }: ProjectProps) {

        const projeto = await prismaClient.project.create({
            data: {
                name,
                startYear,
                endYear,
                typeProject,
                mobile,
                location,
                github,
                site,
                figma,
                description,
                bannerWeb,
                bannerMobile,
                // aqui estamos adicionado as tecnoligas 
                technologies: {
                    connect: techIds.map((techId) => ({ id: techId }))
                },
            },
            include: {
                technologies: true
            }
        })

        return { projeto }

    }
}