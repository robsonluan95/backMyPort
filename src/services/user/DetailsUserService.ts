import prismaClient from "../../prisma";
import { compare, hash } from 'bcryptjs'

interface UserProps {
    email: string;
    password: string;
}

class DetailsUserService {
    async execute({ email, password }: UserProps) {



        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        })

        if (!userAlreadyExists) {
            throw new Error("User/ Email already exist")
        }
        const passwordMash = await compare(password, userAlreadyExists.password)
        const {password:_,...userData} = userAlreadyExists

        if (!passwordMash) {
            throw new Error("User/Email already exist")
        }

        return { userData }
    }

}

export { DetailsUserService }