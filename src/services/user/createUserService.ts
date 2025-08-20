interface UserProps{
    email:string;
    password:string;
}
class CreateUserSevice{
    async execute({email,password}:UserProps){
        console.log({ok:true})
    }
}

export {CreateUserSevice}