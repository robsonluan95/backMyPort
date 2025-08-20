interface UserProps{
    email:string;
    password:string;
}
class CreateUserService{
    async execute({email,password}:UserProps){
        console.log({ok:true})
    }
}

export {CreateUserService}