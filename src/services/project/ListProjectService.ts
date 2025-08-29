import prismaClient from '../../prisma';

interface ProjectProps {
    id: string
}

export class ListProjectService {
    async execute() {
        const projects = await prismaClient.project.findMany()
        return projects
    }
}