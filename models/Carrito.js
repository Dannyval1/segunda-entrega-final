import mongoose from "mongoose";

const carCollection = 'carritos';

const carSchema = new mongoose.Schema({
    carrito : { type: String, require: true, max: 100 },
});

export const Car = mongoose.model(carCollection, carSchema);