import itemModel from "../models/item.model.js";
import itemTypeModel from "../models/itemType.model.js";
import mongoose from "mongoose";


// Get all Item Types
export const getAllItemTypes = async (req, res) => {
    try {
        
        const itemTypes = await itemTypeModel.find();
        res.status(200).json(itemTypes);

    } catch (err) {
        res.status(404).json({message : err.message});
    }
}


// Add an Item Type
export const addItemType = async (req, res) => {
    try {

        const { name, refegeration_required } = req.body;
        const newItemType = itemTypeModel({ name, refegeration_required });
        await newItemType.save();
        res.status(201).json(newItemType);

    } catch (err) {
        res.status(404).json({message : err.message});
    }
}

// Edit an Item Type
export const updateItemType = async (req, res) => {
    try {
        
        const itemTypeID = req.params.id;
        const itemType = req.body;
    
        if(!mongoose.Types.ObjectId.isValid(itemTypeID))
            return res.status(404).json(`Not a Valid Item Type ID`);
    
        const updatedItemType = await itemTypeModel.findByIdAndUpdate(itemTypeID,{...itemType,itemTypeID},{new : true});
        res.status(201).json(updatedItemType);


    } catch (err) {
        res.status(404).json({message : err.message});
    }
}

// Delete an Item Type
export const deleteItemType = async (req, res) => {
    try {
        
        const itemTypeID = req.params.id; 

        if(!mongoose.Types.ObjectId.isValid(itemTypeID))
            return res.status(404).json(`Not a Valid Item Type ID`);

        const itemsWithType = await itemModel.findOne({itemtype_id: itemTypeID});
        if(itemsWithType)
            return res.status(404).json({message: "Deleting is not possible because there are one or more items associated with this item type."});
        const itemType = await itemTypeModel.findByIdAndRemove(itemTypeID);
        if (!itemType) {
            return res.status(404).json({ message: 'Item Type not found' });
        }
        
        res.status(200).json(`Item deleted successfully`);


    }
    catch (err) {
        res.status(404).json({message : err.message});
    }
}