import { Router } from 'express';
import ProductController from '../dao/products.controller.js';
import CartController from '../dao/carts.controller.js';
import config from '../config.js';


const router = Router();
const controllerProduct = new ProductController();
const controllerCart = new CartController();



router.get('/index', (req, res) => {
    const idCart=config.CART_SELECTED_ID 
    const data = {
        cart:idCart
    }
    
    res.status(200).render('index', data);
});

router.get ('/newuser', (req, res) => {
    const idCart=config.CART_SELECTED_ID 
    const data = {
        cart:idCart
    };

    res.status (200).render ('newuser', data);
});

router.get ('/newproduct', (req, res) => {
    const idCart=config.CART_SELECTED_ID 
    const data = {
        cart:idCart
    };

    res.status (200).render ('newproduct', data);
});

router.get ('/cart/:cid', async(req, res) => {
    const id = req.params.cid;
    const cart = await controllerCart.get(id);
    res.status (200).render ('cart', {data: cart});

})

router.get ('/setcart', async(req, res) => {
    const idCart=config.CART_SELECTED_ID 
    const cartData=await controllerCart.getAll();
    const data = {
        cart:idCart,
        data:cartData
    }
    res.status (200).render ('setcart', {data:data});

})

router.get('/products', async (req, res) => {
    const { pg, limit, sort, filter } = req.query;
    const cartSelected=config.CART_SELECTED_ID;
    const products = await controllerProduct.get(parseInt(pg), parseInt(limit), sort, filter);

    
    const data = {
        docs: products.docs,
        page: products.page,
        totalPages: products.totalPages,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        limit: limit,    
        sort: sort,     
        filter: filter,  
        cartSelected:cartSelected 
    };
    res.status(200).render('products', {data:data});
});


router.get('/realtimeproducts', async (req, res) => {
    const idCart=config.CART_SELECTED_ID 
    const data = {
        cart:idCart
    }
    res.status(200).render('realTimeProducts',data);
});


export default router;   
