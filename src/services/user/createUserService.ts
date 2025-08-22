import prismaClient from "../../prisma";
import {hash} from "bcryptjs"
interface UserProps {
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ email, password }: UserProps) {
        if (!email) {
            throw new Error("Email incorret");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });

        if (userAlreadyExists) {
            throw new Error("User/Email already exists");
        } 

        const passwordHash = await hash(password,8)

        const user = await prismaClient.user.create({
            data:{
                email:email,
                password:passwordHash
            },
            select:{
                id:true,
                email:true,
            }
        })


        return user;
    }
}

export { CreateUserService };