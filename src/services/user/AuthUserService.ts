import prismaClient from "../../prisma";
import {compare} from "bcryptjs";
import {sign} from 'jsonwebtoken';

interface AuthUserRequest{
    email:string;
    password:string;
}

class AuthUserService{

    async execute({email,password}:AuthUserRequest){
        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })
        if (!user){
            throw new Error("User não encontrado")
        }
        //Comparando se a senha esta certa hash
        const passwordMatch = await compare(password,user.password)

        if (!passwordMatch){
            throw new Error("Email/password incorretos")
        }

        //gerando token JWT
        const token = sign(
            {
                name:user.email,
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn:"30d"
            }
        )

        return {
            id:user?.id,email:user?.email,token
        }
    }
}

export {AuthUserService}