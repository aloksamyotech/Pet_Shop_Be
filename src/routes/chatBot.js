import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { ChatBotController } from "../controllers/controllers.js";


const router = Router();

router.post('/save',asyncHandler(ChatBotController.ChatBot))
router.get('/fetch',asyncHandler(ChatBotController.ChatBotGet))

export default router;
