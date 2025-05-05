import { petTypeController } from "../controllers/controllers.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { Router } from "express";



const router = new Router();

router.post('/save',asyncHandler(petTypeController.CreatePetType));
router.get('/fetch',asyncHandler(petTypeController.GetAddItem));
router.put('/update/:id',asyncHandler(petTypeController.updateAddItem));
router.delete('/:id',asyncHandler(petTypeController.deletedAddItemData));

export default router;

