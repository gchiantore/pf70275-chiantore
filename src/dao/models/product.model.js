import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config.js';

mongoose.pluralize(null); // anulamos comportamiento de renombre por defecto de colecciones

const collection = config.PRODUCTS_COLLECTION;

const schema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true }, 
    price: { type: String, required: true }, 
    stock: { type: String, required: true },
    category: { type: String, required: true },
    thumbnails:{ type: Array}
});
schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);    

export default model;



