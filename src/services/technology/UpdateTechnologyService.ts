import prismaClient from '../../prisma'

interface TechnologyProps{
    id:string;
    name:string;
    banner:string;
}


export class UpdateTechnologyService{
    async execute({id,name,banner}:TechnologyProps){
        const technology = await prismaClient.technology.update({
            where:{
                id:id
            },data:{
                name:name,
                banner:banner
            }
        })

        return technology
    }
}