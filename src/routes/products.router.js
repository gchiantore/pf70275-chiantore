
import { Router } from 'express';
import ProductController from '../dao/products.controller.js';

const router=Router();
const controllerProduct=new ProductController();

router.get('/',async(req,res)=>{
    const { pg, limit, sort, filter } = req.query;
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
        filter: filter   
    };
    res.status(200).send({error:null,data:data});
    
})


router.post('/',async(req,res)=>{
    const { title, description, code, price, stock, category, status } = req.body;
    if (
        req.body.hasOwnProperty('title') && 
        req.body.hasOwnProperty('description') && 
        req.body.hasOwnProperty('code') && 
        req.body.hasOwnProperty('price') && 
        req.body.hasOwnProperty('stock') && 
        req.body.hasOwnProperty('category')
    ) {
        if (req.body.title && req.body.description && req.body.code && req.body.price && req.body.stock && req.body.category) {
            if (req.body.hasOwnProperty('status')) {
                if (req.body.status===null) {
                    req.body.status=true
                } 
            }
            const newProduct = {
                title: title, 
                description: description,
                code: code, 
                price: price, 
                stock: stock,
                status: status,
                category: category
            };

            const process=await controller.add(newProduct);
            const listProducts=await controller.get(); // Actualizo listProducts
            
            const socketServer=req.app.get('socketServer');
            socketServer.emit('new_product', {listProducts, state: 'created'});// Notifico a todos los clientes conectados que se ha agregado un nuevo producto
            
            res.status(200).send({data:process});
        }else{
            res.status(400).send({error:'Faltan datos'});
        }
    }else{
        res.status(400).send({error:'Faltan propiedades'});
    }
})

router.put('/:pid',async(req,res)=>{
    const { pid } = req.params;
    const { title, description, code, price, stock, category, status } = req.body;
    const filter = { _id: pid };
    const updated = {
                        title: title, 
                        description: description,
                        code: code, 
                        price: price, 
                        stock: stock,
                        status: status,
                        category: category
                    };
    const options = { new: true };

    const process = await controller.update(filter, updated, options);

    if (process) {
        const listProducts=await controller.get(); // Actualizo listProducts
        const socketServer=req.app.get('socketServer');
        socketServer.emit('new_product', {listProducts, state: 'updated'});// Notifico a todos los clientes conectados que se ha modificado un producto
        res.status(200).send({ error: null, data: process });
    } else {
        res.status(404).send({ error: 'No se encuentra el producto', data: [] });
    }

})

router.delete('/:pid',async(req,res)=>{
    const { pid } = req.params;
    const filter = { _id: pid };
    const options = {};
    const process = await controller.delete(filter, options);
    if (process) {

        const listProducts=await controller.get(); // Actualizo listProducts
        const socketServer=req.app.get('socketServer');
        socketServer.emit('new_product', {listProducts, state: 'delete'});// Notifico a todos los clientes conectados que se ha eliminado un producto
        
        res.status(200).send({ error: null, data: 'Producto borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el Producto', data: [] });
    }
})

export default router;