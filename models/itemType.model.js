import mongoose from "mongoose";

const itemTypeSchema = mongoose.Schema({
    name: { type: String, unique: true },
    refegeration_required: { type: Boolean }
});

const itemTypeModel = mongoose.model("ItemTypes", itemTypeSchema);

export default itemTypeModel;