import cloudinary from "../../lib/cloudinary"
import { Readable } from "stream"

export class uploadToCloudinary {
    async execute(fileBuffer: Buffer, folder: string) {

        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result)
                }
            )
            Readable.from(fileBuffer).pipe(stream)
        });
    }
}

