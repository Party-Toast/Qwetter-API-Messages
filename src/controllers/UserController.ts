import { JSONSchemaType } from 'ajv';
import { Router, Request, Response } from 'express';
import { UserCreationRequest, UserUpdateRequest } from '../models/User';
import UserService from '../services/UserService';
import SchemaValidator from '../utils/SchemaValidator';
import UserCreationRequestSchema from '../schemas/UserCreationRequestSchema';
import UserUpdateRequestSchema from '../schemas/UserUpdateRequestSchema';

export default class UserController {
    public path = '/users';
    public router = Router();
    public userService: UserService;
    public validator = new SchemaValidator();
    public userCreationRequestSchema: JSONSchemaType<UserCreationRequest> = UserCreationRequestSchema;
    public userUpdateRequestSchema: JSONSchemaType<UserUpdateRequest> = UserUpdateRequestSchema;

    constructor() {
        this.intializeRoutes();
        this.userService = new UserService();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.get(`${this.path}/:uuid`, this.getUserByUuid);
        this.router.post(this.path, this.validator.validateBody(this.userCreationRequestSchema), this.createUser);
        this.router.put(`${this.path}/:uuid`, this.validator.validateBody(this.userUpdateRequestSchema), this.updateUser);
        this.router.delete(`${this.path}/:uuid`, this.deleteUser);
    }
    
    // GET
    public getAllUsers = async (request: Request, response: Response) => {
        this.userService.getAllUsers().then((users) => {
            response.send(users);
        });
    }

    public getUserByUuid = async (request: Request, response: Response) => {
        const uuid: number = parseInt(request.params.uuid);
        this.userService.getUserById(uuid).then((user) => {
            if(user === undefined) {
                response.status(404).send(`No user with uuid ${uuid} was found.`)
            }
            response.send(user);
        })
    }
    
    // POST
    public createUser = async (request: Request, response: Response) => {
        const userCreationRequest: UserCreationRequest = request.body;
        this.userService.createUser(userCreationRequest).then((user) => {
            // TODO: catch responses for duplicate username/email registration
            response.status(201).send(user);
        });
    }

    // PUT
    public updateUser = async (request: Request, response: Response) => {
        const uuid: number = parseInt(request.params.uuid);
        const userUpdateRequest: UserUpdateRequest = request.body;
        this.userService.updateUser(uuid, userUpdateRequest).then((user) => {
            if(user === undefined) {
                response.status(404).send(`No user with uuid ${uuid} was found.`);
            }
            response.send(user);
        })
    }

    // DELETE
    public deleteUser = async (request: Request, response: Response) => {
        const uuid: number = parseInt(request.params.uuid);
        this.userService.deleteUser(uuid).then((user) => {
            if(user === undefined) {
                response.status(204);
            }
            response.send(user);
        })
    }
}