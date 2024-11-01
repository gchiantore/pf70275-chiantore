import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../config.js';

mongoose.pluralize(null); // anulamos comportamiento de renombre por defecto de colecciones

const collection = config.USERS_COLLECTION;

const schema = new mongoose.Schema({
    firstName: { type: String, required: true }, // firstName: String,
    lastName: { type: String, required: true }, // lastName:String,
    email: { type: String, required: true, unique: true }, // email: String




    /*
        gender: { type: String, enum: ['Male', 'Famale', 'Non-Binary', 'Agener'], default: 'Male', index: true}, //con index en true crea el indice automaticamente
    */
});
schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);    

export default model;



