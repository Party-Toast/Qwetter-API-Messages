import { JSONSchemaType } from 'ajv';
import { Router, Request, Response } from 'express';
import { BaseUser, User } from '../models/User';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../services/UserService'
import SchemaValidator from '../utils/SchemaValidator';
import BaseUserSchema from '../schemas/BaseUserSchema';

class UserController {
    public path = '/users';
    public router = Router();
    public validator = new SchemaValidator();
    public baseUserSchema: JSONSchemaType<BaseUser> = BaseUserSchema;

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.get(`${this.path}/:uuid`, this.getUserByUuid);
        this.router.post(this.path, this.validator.validateBody(this.baseUserSchema), this.createUser);
        this.router.put(`${this.path}/:uuid`, this.validator.validateBody(this.baseUserSchema), this.updateUser);
        this.router.delete(`${this.path}/:uuid`, this.deleteUser);
    }

    getAllUsers = async (request: Request, response: Response) => {
        getAllUsers().then((users) => {
            response.send(users);
        });
    }

    getUserByUuid = async (request: Request, response: Response) => {
        const uuid: number = parseInt(request.params.uuid);
        getUserById(uuid).then((user) => {
            if(user === undefined) {
                response.status(404).send(`No user with uuid ${uuid} was found.`)
            }
            response.send(user)
        })
    }
    
    createUser = async (request: Request, response: Response) => {
        const baseUser: BaseUser = request.body;
        createUser(baseUser).then((user) => {
            response.status(201).send(user);
        });
    }

    updateUser = async (request: Request, response: Response) => {
        const uuid: number = parseInt(request.params.uuid);
        const baseUser: BaseUser = request.body;
        updateUser(uuid, baseUser).then((user) => {
            if(user === undefined) {
                response.status(404).send(`No user with uuid ${uuid} was found.`);
            }
            response.send(user);
        })
    }

    deleteUser = async (request: Request, response: Response) => {
        const uuid: number = parseInt(request.params.uuid);
        deleteUser(uuid).then((user) => {
            if(user === undefined) {
                response.status(404).send(`No user with uuid ${uuid} was found.`);
            }
            response.send(user);
        })
    }
}

export default UserController;