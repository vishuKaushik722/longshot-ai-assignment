import express from 'express';
import { addItemType, deleteItemType, getAllItemTypes, updateItemType } from '../controllers/itemType.controller.js';

const router = express.Router();

router.get('/', getAllItemTypes);
router.post('/add', addItemType);
router.patch('/update/:id', updateItemType);
router.delete('/delete/:id', deleteItemType);

export default router;