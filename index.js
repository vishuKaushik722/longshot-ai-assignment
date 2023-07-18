import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import storageSpaceRoutes from './routes/storageSpace.route.js';
import itemTypeRoutes from './routes/itemType.route.js';
import itemRoutes from './routes/item.route.js';

const app = express();

app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
    res.send("API is working");
});

app.use('/api/v1/storage-space', storageSpaceRoutes);
app.use('/api/v1/item-type', itemTypeRoutes);
app.use('/api/v1/items', itemRoutes);


const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || "mongodb+srv://grocery-store:grocery-store@grocery-store.utymm8a.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL)
    .then(()=> {
        app.listen(PORT, () => console.log(`Server running on port : ${PORT} and connection to database is established`));
    })
    .catch((error) => console.log(error.message));
