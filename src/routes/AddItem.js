import { AddItemController } from "../controllers/controllers.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { Router } from "express";



const router = new Router();

router.post('/save',asyncHandler(AddItemController.CreateAddItem));
router.get('/fetch',asyncHandler(AddItemController.GetAddItem));
router.put('/update/:id',asyncHandler(AddItemController.updateAddItem));
router.delete('/:id',asyncHandler(AddItemController.deletedAddItemData));
router.get('/get/:id',asyncHandler(AddItemController.getAddItemsController))

export default router;

