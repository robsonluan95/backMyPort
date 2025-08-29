import { Router, type Request, type Response } from "express";

//- Import de User -//
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DatailsUserController } from "./controller/user/DetailsUserController";


//-  import de Technology - //
import { CreateTechnologyController } from "./controller/technology/CreateTechnologyController"

// - import de Projetos
import { CreateProjectController } from "./controller/project/CreateProjectController"

import { upload } from "./config/multer";

//- Import de Autenticação -//

const router = Router();

//Rota Teste//
router.get('/teste', (req: Request, res: Response) => {return res.json({ ok: true })})

//Rota User // 

router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DatailsUserController().handle)

//Rota Tecnologia

router.post('/technology', upload.single("banner"), new CreateTechnologyController().handle)

// Rota Projectos

router.post('/projects', upload.fields([{ name: "bannerWeb", maxCount: 1 },
{ name: "bannerMobile", maxCount: 1 }]), new CreateProjectController().handle)

export { router };