import mongoose from "mongoose";
import itemTypeModel from "../models/itemType.model.js";
import storageSpaceModel from "../models/storageSpace.model.js";
import itemModel from "../models/item.model.js";


// Get all items
export const getAllItems = async (req, res) => {
    try {

        const { skip = 0, limit = 100 } = req.query;

        const allItems = await itemModel.find({}, [], {skip, limit, sort: {expiry_date: 1}})
                        .populate({path: 'itemtype_id'})
                        .populate({path: 'storagespace_id'});

        res.status(200).json(allItems);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

// Add a new item
export const addNewItem = async (req, res) => {
    try {

        const { name, itemtype_id, storagespace_id, expiry_date, item_count } = req.body;

        const currentDate = new Date();
        if(expiry_date <= currentDate) {
            return res.status(404).json({ message: 'Item has expired' });
        }

        if(!mongoose.Types.ObjectId.isValid(itemtype_id) || !mongoose.Types.ObjectId.isValid(storagespace_id)) {
            return res.status(404).json({ message: 'Either itemtype id or storage space id is not valid' });
        }

        const itemType = await itemTypeModel.findById(itemtype_id);
        if(!itemType) {
            return res.status(404).json({ message: 'Item should have a valid item type' });
        }

        const storageSpace = await storageSpaceModel.findById(storagespace_id);
        if(!storageSpace) {
            return res.status(404).json({ message: 'Item should have a valid storage space' });
        }

        if(storageSpace.curr_count + item_count > storageSpace.max_limit) {
            return res.status(404).json({ message: 'Not enough space in Storage Space' });
        }

        if(itemType.refegeration_required && !storageSpace.is_refegeration) {
            return res.status(404).json({ message: 'Item requires refegeration facility but not provided' });
        }


        const newItem = itemModel({ name, itemtype_id, storagespace_id, expiry_date, item_count });
        await newItem.save();

        storageSpace.curr_count += item_count;
        await storageSpace.save();
        
        res.status(200).json(newItem);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

// Delete an Item
export const deleteAnItem = async (req, res) => {
    try {

        const itemID = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(itemID))
            return res.status(404).json(`Not a Valid Item Type ID`);

        const deletedItem = await itemModel.findByIdAndRemove(itemID);
        if(!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const storageSpace = await storageSpaceModel.findById(deletedItem.storagespace_id);
        storageSpace.curr_count -= deletedItem.item_count;
        storageSpace.save()

        res.status(200).json(deletedItem);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

// Relocate an item to a different storage space
export const relocateItem = async (req, res) => {
    try {

        const { new_storage_spaceID } = req.body, itemID = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(itemID) || !mongoose.Types.ObjectId.isValid(new_storage_spaceID))
            return res.status(404).json(`Not a Valid Type of ID`);

        const currItem = await itemModel.findById(itemID);
        if(!currItem) {
            return res.status(404).json(`Current Item doesn't exist`);
        }

        const newStorageSpace = await storageSpaceModel.findById(new_storage_spaceID);
        if(!newStorageSpace) {
            return res.status(404).json(`New Storage Space doesn't exist`);
        }

        const currItemType = await itemTypeModel.findById(currItem.itemtype_id);
        if (currItemType.refegeration_required && !newStorageSpace.is_refegeration) {
            return res.status(400).json({ error: 'Item requires refegeration facility but not provided' });
        }

        if(newStorageSpace.curr_count + itemID.item_count > newStorageSpace.max_limit) {
            return res.status(404).json({ message: "New Storage Space doesn't have enough space"})
        }

        if(currItem.storagespace_id === newStorageSpace.storagespace_id) {
            return res.status(404).json({ message: "Item already in same Storage Space"})
        }

        const currStorageSpace = await storageSpaceModel.findById(currItem.storagespace_id);
        currStorageSpace.curr_count -= currItem.item_count;
        await currStorageSpace.save();

        newStorageSpace.curr_count += currItem.item_count;
        await newStorageSpace.save();

        currItem.storagespace_id = new_storage_spaceID;
        await currItem.save();

        res.status(200).json(currItem);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}