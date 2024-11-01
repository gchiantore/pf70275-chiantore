
import { Router } from 'express';
import cartController from '../dao/carts.controller.js';
import config from '../config.js';

const router=Router();

const controller= new cartController;

router.get('/:cid',async(req,res)=>{
    const id=req.params.cid;
    const data=await controller.get(id);
    res.status(200).send({data:data});
})

router.post('/', async (req, res) => {
    try {
        const newCart = await controller.createCart();
        config.CART_SELECTED_ID = newCart._id;
        res.status(200).send({ data: newCart });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Eliminar un producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await controller.removeProduct(cid, pid);
        res.status(204).send(); 
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Actualizar el carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const products = req.body.products; 
    try {
        const updatedCart = await controller.updateCart(cid, products);
        res.status(200).send({ data: updatedCart });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Actualizar el carrito con un producto
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const updatedCart = await controller.updateProductQuantity(cid, pid);
        res.status(200).send({ data: updatedCart });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        await controller.clearCart(cid);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


export default router;