import { JSONSchemaType } from 'ajv';
import { Router, Request, Response } from 'express';
import { MessageCreationRequest } from '../models/Message';
import MessageService from '../services/MessageService';
import SchemaValidator from '../utils/SchemaValidator';
import MessageCreationRequestSchema from '../schemas/MessageCreationRequestSchema';

export default class MessageController {
    public path = '/messages';
    public router = Router();
    public messageService: MessageService;
    public validator = new SchemaValidator();
    // TODO: fix AJV to allow 'Date' class
    // public mcrs: JSONSchemaType<MessageCreationRequest> = MessageCreationRequestSchema;

    constructor() {
        this.intializeRoutes();
        this.messageService = new MessageService();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllMessages);
        this.router.get(`${this.path}/:uuid`, this.getMessageById);
        this.router.get(`${this.path}/user/:user_uuid`, this.getMessagesByUserId);
        // this.router.post(this.path, this.validator.validateBody(this.messageCreationRequestSchema), this.createMessage);
        this.router.delete(`${this.path}/:uuid`, this.deleteMessage);
    }
    
    // GET
    public getAllMessages = async (request: Request, response: Response) => {
        this.messageService.getAllMessages().then((messages) => {
            response.send(messages);
        });
    }

    public getMessageById = async (request: Request, response: Response) => {
        const uuid: number = parseInt(request.params.uuid);
        this.messageService.getMessageById(uuid).then((message) => {
            if(message === undefined) {
                response.status(404).send(`No message with uuid ${uuid} was found.`)
            }
            response.send(message);
        })
    }

    public getMessagesByUserId = async (request: Request, response: Response) => {
        // Specify values to fetch from request query
        interface Query {
            page: string;
            per_page: string;
         };         
        const query = request.query as unknown as Query;

        const user_uuid: number = parseInt(request.params.user_uuid);
        const page: number | undefined = isNaN(parseInt(query.page)) ? undefined : parseInt(query.page);
        const per_page: number | undefined = isNaN(parseInt(query.per_page)) ? undefined : parseInt(query.per_page);

        this.messageService.getMessagesByUserId(user_uuid, page, per_page).then((messages) => {
            if(messages === undefined) {
                response.status(404).send(`No user with uuid ${user_uuid} was found.`)
            }
            response.send(messages);
        })

    }
    
    // POST
    public createMessage = async (request: Request, response: Response) => {
        const messageCreationRequest: MessageCreationRequest = request.body;
        this.messageService.createMessage(messageCreationRequest).then((message) => {
            response.status(201).send(message);
        });
    }

    // DELETE
    public deleteMessage = async (request: Request, response: Response) => {
        const uuid: number = parseInt(request.params.uuid);
        this.messageService.deleteMessage(uuid).then((message) => {
            if(message === undefined) {
                response.status(204);
            }
            response.send(message);
        })
    }
}