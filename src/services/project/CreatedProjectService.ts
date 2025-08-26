import type { NextApiRequest, NextApiResponse } from "express";
import nextConnect from "next-connect";
import multer from "multer";
import { Readable } from "stream";
import cloudinary from "../../lib/cloudinary";
import prisma from "../../prisma"; // sua instância do Prisma

export const config = {
    api: {
        bodyParser: false, // necessário para multipart/form-data
    },
};

// Multer usando memória
const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>();

// Middleware do Multer
apiRoute.use(upload.fields([
    { name: "bannerWeb", maxCount: 1 },
    { name: "bannerMobile", maxCount: 1 }
]));

apiRoute.post(async (req: any, res) => {
    try {
        const { name, startYear, endYear, typeProject, mobile, location, github, site, figma, description, technologies } = req.body;

        // Função helper para enviar buffer para o Cloudinary
        const uploadToCloudinary = (fileBuffer: Buffer, folder: string) => {
            return new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
                Readable.from(fileBuffer).pipe(stream);
            });
        };

        // Upload dos banners
        const bannerWebFile = req.files.bannerWeb[0];
        const bannerMobileFile = req.files.bannerMobile[0];

        const bannerWebResult = await uploadToCloudinary(bannerWebFile.buffer, "projects");
        const bannerMobileResult = await uploadToCloudinary(bannerMobileFile.buffer, "projects");

        // Salvar no Prisma
        const project = await prisma.project.create({
            data: {
                name,
                startYear: parseInt(startYear),
                endYear: parseInt(endYear),
                typeProject,
                mobile: mobile === "true",
                location,
                github,
                site,
                figma,
                description,
                bannerWeb: bannerWebResult.secure_url,
                bannerMobile: bannerMobileResult.secure_url,
                technologies: {
                    connect: JSON.parse(technologies), // array de ids de tecnologias
                },
            },
        });

        res.status(200).json(project);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro no upload" });
    }
});

export default apiRoute;
