import {Router} from "express"
import { asyncHandler } from "../utils/asyncWrapper.js";
import { chatMessageController } from "../controllers/controllers.js";

const router = Router();

router.post('/save',asyncHandler(chatMessageController.chatMessage))
export default router;
