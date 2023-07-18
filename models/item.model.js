import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    name : { type: String },
    itemtype_id : { type: mongoose.Schema.Types.ObjectId, ref: 'ItemTypes' },
    storagespace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'StorageSpaces' },
    expiry_date : { type: Date },
    item_count : { type: Number, default: 1 }
});

const itemModel = mongoose.model("Items", itemSchema);

export default itemModel;