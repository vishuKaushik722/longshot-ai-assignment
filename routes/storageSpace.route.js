import express from 'express';
import { addStorageSpace, deleteStorageSpace, getAllStorageSpaces, storageSpaceItems, updateStorageSpace } from '../controllers/storageSpace.controller.js';
const router = express.Router();

router.get('/', getAllStorageSpaces);
router.post('/add', addStorageSpace);
router.patch('/update/:id', updateStorageSpace);
router.delete('/delete/:id', deleteStorageSpace);

router.get('/items/:id',storageSpaceItems);

export default router;