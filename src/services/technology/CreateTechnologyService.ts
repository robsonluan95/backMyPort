import prismaClient from "../../prisma"
interface TechnologyProps {
    name: string;
    banner: string;
}

export class CreateTechnologyService {
    async execute({ name, banner }: TechnologyProps) {
        const technology = await prismaClient.technology.create({
            data: {
                name,
                banner,
            }

        })

        return {technology}

    }
}