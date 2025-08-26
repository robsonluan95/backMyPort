import multer from "multer";
import crypto from "crypto";

// armazena dados na memoria 
const storage = multer.memoryStorage()

export const upload = ({
    storage,
    limits:{
        fileSize: 5 *1024*1024, // Limite para 5 mb
    },
    fileFilter:(req,file,cb)=>{
        const allowedMimes = ["image/jpeg","image/png","image/webp"];
        if (allowedMimes.includes(file.minetype)){
            cb(null,true)
        }else{
            cb(new Error("Formato de arquivo invalido!"),false)
        }
    }
})