import express from 'express';
import { addNewItem, deleteAnItem, getAllItems, relocateItem } from '../controllers/items.controller.js';

const router = express.Router();

router.get('/', getAllItems);
router.post('/add', addNewItem);
router.delete('/delete/:id', deleteAnItem );
router.patch('/relocate/:id', relocateItem);

export default router;