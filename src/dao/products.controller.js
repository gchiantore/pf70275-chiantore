import productModel from './models/product.model.js';
import config from '../config.js';

/**
* GET: userModel. find(). Lean() -> Lean permite "Limpiar" la consulta y obtener un objeto plano Javascript (POJO) POST: userModel. create ()
* POST: userModel. create ()
* PUT: userModel. findOneAndUpdate ( )
* DELETE: userModel.findOneAndDelete ()
*/
class ProductController{
    constructor() {}

    get = async (pg,limit,sort,filter) => {
        try{
            //return await productModel.find().lean();
            filter = filter ? JSON.parse(filter) : {};
            const options = {
                page: pg,
                limit,
                sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
                lean: true
            };  
            return await productModel.paginate(filter,options);
        } catch (error) {
            return error.message;
        }    
    } 

    add = async (data) => {
        try{
            return await productModel.create(data);
        } catch (error) {
            return error.message;   
        }    
    }

    update = async (filter, updated, options) => {
        try{
            return await productModel.findByIdAndUpdate(filter, updated, options);
        } catch (error) {
            return error.message;
        }    
    }

    delete = async (filter, options) => {
        try{
            return await productModel.findByIdAndDelete(filter, options);
        } catch (error) {
            return error.message;
        }    
    }
}

export default ProductController;