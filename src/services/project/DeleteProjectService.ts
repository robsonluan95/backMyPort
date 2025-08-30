import prismaClient from '../../prisma'


export class DeleteProjectService{
    async execute(id:string){
        const project = await prismaClient.project.delete({
            where:{
                id:id
            }
        })
        
        return project
    }
}