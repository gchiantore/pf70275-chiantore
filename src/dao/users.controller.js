import userModel from './models/user.model.js';

/**
* GET: userModel. find(). Lean() -> Lean permite "Limpiar" la consulta y obtener un objeto plano Javascript (POJO) POST: userModel. create ()
* POST: userModel. create ()
* PUT: userModel. findOneAndUpdate ( )
* DELETE: userModel.findOneAndDelete ()
*/
class UserController {
    constructor() {}

    get = async () => {
        try{
            return await userModel.find().lean();
        } catch (error) {
            return error.message;
        }      
    }

    add = async (data) => {
        try{
            return await userModel.create(data);
        } catch (error) {
            return error.message;
        }    
    }

    update = async (filter, updated, options) => {
        try{
            return await userModel.findByIdAndUpdate(filter, updated, options);
        } catch (error) {
            return error.message;
        }    
    }

    delete = async (filter, options) => {
        try{
            return await userModel.findByIdAndDelete(filter, options);
        } catch (error) {
            return error.message;
        }    
    }
}

export default UserController;