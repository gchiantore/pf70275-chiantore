import cartModel from './models/cart.model.js';
import productModel from './models/product.model.js';
import config from '../config.js';

/**
* GET: userModel. find(). Lean() -> Lean permite "Limpiar" la consulta y obtener un objeto plano Javascript (POJO) POST: userModel. create ()
* POST: userModel. create ()
* PUT: userModel. findOneAndUpdate ( )
* DELETE: userModel.findOneAndDelete ()
*/
class CartController {
    constructor() {}

    get = async (id) => {
        config.CART_SELECTED_ID = id;
        try{
            return await cartModel.findById(id).populate({ path: 'productos._id', model: productModel, select: 'title price'}).lean();
        } catch (error) {
            return error.message;
        }    
    }
    getAll = async () => {
        try{
            return await cartModel.find().lean();
        } catch (error) {
            return error.message;
        }
    }

    createCart = async () => {
        try {
            const newCart = await cartModel.create({ productos: [] });
            return newCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Eliminar un producto especifico del carrito
    removeProduct = async (cid, pid) => {
        try {
            return await cartModel.findByIdAndUpdate(
                cid,
                { $pull: { productos: { _id: pid } } },
                { new: true }
            );
        } catch (error) {
            throw new Error(error.message);
        }
    };


    // Actualizar solo la cantidad de un producto específico o agrega uno si no existe
    updateProductQuantity = async (cid, pid) => {
        try {
            const cart = await cartModel.findById(cid);
            const existProduct = cart.productos.find(product => product._id.toString() === pid);
    
            if (existProduct) {
                existProduct.quantity += 1;
            } else {
                cart.productos.push({ _id: pid, quantity: 1 });
            }
            await cart.save();
    
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    // Vacia el carrito
    clearCart = async (cid) => {
        try {
            return await cartModel.findByIdAndUpdate(
                cid,
                { $set: { productos: [] } },
                { new: true }
            );
        } catch (error) {
            throw new Error(error.message);
        }
    };

    deteCart = async (cid) => {
        try {
            return await cartModel.findByIdAndDelete(cid);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}


export default CartController;