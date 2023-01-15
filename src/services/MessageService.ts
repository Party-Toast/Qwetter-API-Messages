import MySQLMessageDatabaseConnection from "../repositories/MySQLMessageDatabaseConnection";
import MongoDBMessageDatabaseConnection from "../repositories/MongoDBMessageDatabaseConnection";
import { Message, MessageCreationRequest, MessageLikeRequest, MessageUndoLikeRequest } from "../models/Message";
import CloudAMQPEventBroker from "../broker/CloudAMQPEventBroker";

export default class MessageService {
    private databaseConnection;
    private eventBroker;

    constructor() {
        // this.databaseConnection = new MySQLMessageDatabaseConnection();
        this.databaseConnection = new MongoDBMessageDatabaseConnection();
        this.eventBroker = new CloudAMQPEventBroker(this.databaseConnection);
        this.eventBroker.connect();
    }

    public getAllMessages = async (): Promise<Array<Message>> => {
        return this.databaseConnection.getAllMessages();
    };
    
    public getMessageById = async (uuid: string): Promise<Message | undefined> => {
        return this.databaseConnection.getMessageById(uuid);
    }

    public getMessagesByUserId = async (user_uuid: string, page: number | undefined, per_page: number | undefined): Promise<Array<Message> | undefined> => {
        return this.databaseConnection.getMessagesByUserId(user_uuid, page, per_page);
    }

    public createMessage = async (message: MessageCreationRequest): Promise<Message> => {
        const createdMessagePromise = this.databaseConnection.createMessage(message);
        this.eventBroker.createdMessageEvent(createdMessagePromise);
        return createdMessagePromise;
    };  

    public likeMessage = async (uuid: string, user: MessageLikeRequest): Promise<Message | undefined> => {
        return this.databaseConnection.likeMessage(uuid, user);
    }
    
    public undoLikeMessage = async (uuid: string, user: MessageUndoLikeRequest): Promise<Message | undefined> => {
        return this.databaseConnection.undoLikeMessage(uuid, user);
    }

    public deleteMessage = async (uuid: string): Promise<Message | undefined> => {
        const deletedMessagePromise = this.databaseConnection.deleteMessage(uuid);  
        // this.eventBroker.deletedMessageEvent(deletedMessagePromise);
        return deletedMessagePromise;
    };
}
