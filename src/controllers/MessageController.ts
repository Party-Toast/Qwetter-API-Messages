import { JSONSchemaType } from 'ajv';
import { Router, Request, Response } from 'express';
import { MessageCreationRequest, MessageLikeRequest, MessageUndoLikeRequest } from '../models/Message';
import MessageService from '../services/MessageService';
import SchemaValidator from '../utils/SchemaValidator';
import { Message } from '../models/Message';
import MessageCreationRequestSchema from '../schemas/MessageCreationRequestSchema';
import MessageLikeRequestSchema from '../schemas/MessageLikeRequestSchema';
import MessageUndoLikeRequestSchema from '../schemas/MessageUndoLikeRequestSchema';
import { Route, Get, Query, Path, Post, Body, Delete } from 'tsoa'

@Route("/messages")
export default class MessageController {
    public path = '/messages';
    public router = Router();
    public messageService: MessageService;
    public validator: SchemaValidator;
    public messageCreationRequestSchema: JSONSchemaType<MessageCreationRequest> = MessageCreationRequestSchema;
    public messageLikeRequestSchema: JSONSchemaType<MessageLikeRequest> = MessageLikeRequestSchema;
    public messageUndoLikeRequestSchema: JSONSchemaType<MessageUndoLikeRequest> = MessageUndoLikeRequestSchema;

    constructor() {
        this.validator = new SchemaValidator();
        this.messageService = new MessageService();
        this.intializeRoutes();
    }

    public intializeRoutes() {
        // this.router.get(this.path, async(req, res) => {
        //     const messages = await this.getAllMessages();
        //     return res.send(messages);
        // });
        // this.router.get(`${this.path}/:uuid`, this.getMessageById);
        // this.router.get(`${this.path}/user/:user_uuid`, this.getMessagesByUserId);
        // this.router.post(this.path, this.validator.validateBody(this.messageCreationRequestSchema), this.createMessage);
        // this.router.post(`${this.path}/like/:uuid`, this.validator.validateBody(this.messageLikeRequestSchema), this.likeMessage);
        // this.router.post(`${this.path}/undo_like/:uuid`, this.validator.validateBody(this.messageUndoLikeRequestSchema), this.undoLikeMessage);
        this.router.delete(`${this.path}/:uuid`, this.deleteMessage);
    }
    
    @Get("")
    public async getAllMessages(): Promise<Array<Message>> {
        return await this.messageService.getAllMessages();
    }

    @Get("/:uuid")
    public async getMessageById(
        @Path() uuid: string
    ): Promise<Message | undefined> {
        return await this.messageService.getMessageById(uuid);
    }

    @Get("/user/:user_uuid")
    public async getMessagesByUserId(
        @Path() user_uuid: string, 
        @Query() page?: number, 
        @Query() per_page?: number
    ): Promise<Array<Message> | undefined> {
        return await this.messageService.getMessagesByUserId(user_uuid, page, per_page);
    }
    
    @Post("")
    public async createMessage(
        @Body() messageCreationRequest: MessageCreationRequest
    ): Promise<Message> {
        return await this.messageService.createMessage(messageCreationRequest);
    }

    @Post("/like/:uuid")
    public async likeMessage(
        @Path() uuid: string, 
        @Body() messageLikeRequest: MessageLikeRequest
    ): Promise<Message | undefined> {
        return await this.messageService.likeMessage(uuid, messageLikeRequest);
    }
    
    @Post("/undo_like/:uuid")
    public async undoLikeMessage (
        @Path() uuid: string,
        @Body() messageUndoLikeRequest: MessageUndoLikeRequest
    ): Promise<Message | undefined> {
        return await this.messageService.undoLikeMessage(uuid, messageUndoLikeRequest);
    }

    @Delete("/:uuid")
    public async deleteMessage(
        @Path() uuid: string
    ): Promise<Message | undefined> {
        return await this.messageService.deleteMessage(uuid);
    }
}