import prismaClient from '../../prisma'


export class DeleteTechnologyService{
    async execute(id:string){
        const technology = await prismaClient.technology.delete({
            where:{
                id:id
            }
        })
        
        return technology
    }
}