import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

import { Readable } from "stream"

export class UploadToCloudinary {
    async execute(fileBuffer: Buffer, folder: string) {

        return new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder },
                (error, result) => {
                    if (error) return reject(error);
                    else resolve((result as UploadApiResponse).secure_url )
                }
            )
            Readable.from(fileBuffer).pipe(stream)
        });
    }
}

