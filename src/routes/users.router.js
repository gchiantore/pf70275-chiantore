import { Router } from 'express';
import { uploader } from '../uploader.js';
import UserController from '../dao/users.controller.js';


const router = Router();
const controller = new UserController();

const auth = (req, res, next) => {
    console.log('Ejecuta el middleware de autenticación de usuario');
    next();
}

// Este endpoint queda "abierto", cualquier usuario conociendo la ruta, puede solicitarlo



router.get('/', async(req, res) => {
    const dataUsers = await controller.get();
    res.status(200).send({ error: null, data: dataUsers });
});

// router.post('/', auth, uploader.array('thumbnail', 3), (req, res) => { // gestión de múltiples archivos
router.post('/', auth, uploader.single('thumbnail'), async(req, res) => { // gestión de archivo único
    const { firstName, lastName, email } = req.body; // desestructuramos (extraemos) las ppdades que nos interesan del body

    if (firstName != '' && lastName != '') {
        const newUser = {
            firstName: firstName, 
            lastName: lastName, 
            email:email 
        };
        const process=await controller.add(newUser);
      
        res.status(200).send({ error: null, data: process, file: req.file });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

router.put('/:id', auth, async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const filter = { _id: id };
    const updated = { firstName: firstName, lastName: lastName, email:email };
    const options = { new: true };

    const process = await controller.update(filter, updated, options);
    
    if (process) {
        res.status(200).send({ error: null, data: process });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

router.delete('/:id', auth, async(req, res) => {
    const { id } = req.params;
    const filter = { _id: id };
    const options = {};
    const process = await controller.delete(filter, options);
    if (process) {
        res.status(200).send({ error: null, data: 'Usuario borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});


export default router;
