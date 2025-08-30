import prismaClient from "../../prisma"

export class ListTechnologyService{
    async execute(){
        const technologies = await prismaClient.technology.findMany()
        return technologies
    }
}