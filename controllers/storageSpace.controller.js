import itemModel from "../models/item.model.js";
import storageSpaceModel from "../models/storageSpace.model.js";
import mongoose from "mongoose";

// Get sll storage Spaces
export const getAllStorageSpaces = async (req, res) => {
    try {
        const storageSpaces = await storageSpaceModel.find();
        res.status(200).json(storageSpaces);

    } catch (err) {
        res.status(404).json({message : err.message});
    }
}

// Add a storage space
export const addStorageSpace = async (req, res) => {
    try {

        const { name, max_limit, is_refegeration } = req.body;
        const newStorageSpace = new storageSpaceModel({ name, max_limit, is_refegeration });
        await newStorageSpace.save();
        res.status(201).json(newStorageSpace);

    } catch (err) {
        res.status(404).json({message : err.message});
    }
}

// Edit a storage space
export const updateStorageSpace = async (req, res) => {
    try {
        const storageSpaceID = req.params.id;
        const storageSpace = req.body;
    
        if(!mongoose.Types.ObjectId.isValid(storageSpaceID))
            return res.status(404).json(`Not a Valid Storage Space ID`);
    
        const updatedStorageSpace = await storageSpaceModel.findByIdAndUpdate(storageSpaceID,{...storageSpace,storageSpaceID},{new : true});
        res.status(201).json(updatedStorageSpace);
    } catch (err) {
        res.status(404).json({message : err.message});
    }
}

// Delete a storage space
export const deleteStorageSpace = async (req, res) => {
    try {
        const storageSpaceID = req.params.id; 

        if(!mongoose.Types.ObjectId.isValid(storageSpaceID))
            return res.status(404).json(`Not a Valid Storage Space ID`);

        const storageSpace = await storageSpaceModel.findById(storageSpaceID);
        if (!storageSpace) {
            return res.status(404).json({ message: 'Storage space not found' });
        }
        if(storageSpace.curr_count >= 0) {
            return res.status(404).json({ message: 'Items are currently available here.' });
        }
        await storageSpaceModel.findByIdAndRemove(storageSpaceID);
        
        res.status(200).json(`Item deleted successfully`);
    }
    catch (err) {
        res.status(404).json({message : err.message});
    }
}

// Get all items inside a storage space
export const storageSpaceItems = async (req, res) => {
    try {

        const storageSpaceID = req.params.id; 

        if(!mongoose.Types.ObjectId.isValid(storageSpaceID))
            return res.status(404).json(`Not a Valid Storage Space ID`);

        const storageSpaceItems = await itemModel.find({storagespace_id : storageSpaceID}, [], { sort : {expiry_date: 1}});
        res.status(200).json(storageSpaceItems);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}