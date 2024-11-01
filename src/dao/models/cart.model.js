import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config.js';

mongoose.pluralize(null); // anulamos comportamiento de renombre por defecto de colecciones

const collection = config.CARTS_COLLECTION;

const schema = new mongoose.Schema({
    productos: { type: [{_id: {type: mongoose.Schema.Types.ObjectId, ref: config.PRODUCTS_COLLECTION}, quantity: Number }], required: true } 
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);    

export default model;



