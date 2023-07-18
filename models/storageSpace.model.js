import mongoose from "mongoose";

const storageSpaceSchema = mongoose.Schema({
    name: { type: String, unique: true },
    max_limit: { type : Number },
    curr_count: {type: Number, default: 0},
    is_refegeration: { type: Boolean }
});


const storageSpaceModel = mongoose.model("StorageSpaces" , storageSpaceSchema);

export default storageSpaceModel;