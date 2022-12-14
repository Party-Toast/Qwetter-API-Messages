import MySQLMessageDatabaseConnection from "../repositories/MySQLMessageDatabaseConnection";
import MongoDBMessageDatabaseConnection from "../repositories/MongoDBMessageDatabaseConnection";
import { Message, MessageCreationRequest, MessageLikeRequest, MessageUndoLikeRequest } from "../models/Message";
import CloudAMQPEventBroker from "../broker/CloudAMQPEventBroker";

export default class MessageService {
    private databaseConnection;
    private eventBroker;

    private DEFAULT_PAGE = 1;
    private DEFAULT_PER_PAGE = 20; 

    constructor() {
        // this.databaseConnection = new MySQLMessageDatabaseConnection();
        this.databaseConnection = new MongoDBMessageDatabaseConnection();
        this.eventBroker = new CloudAMQPEventBroker("messages", "qwetter-messages");
        this.eventBroker.connect();
    }

    public getAllMessages = async (): Promise<Array<Message>> => {
        return this.databaseConnection.getAllMessages();
    };
    
    public getMessageById = async (uuid: string): Promise<Message | undefined> => {
        return this.databaseConnection.getMessageById(uuid);
    }

    public getMessagesByUserId = async (user_uuid: string, page: number | undefined = this.DEFAULT_PAGE, per_page: number | undefined = this.DEFAULT_PER_PAGE): Promise<Array<Message> | undefined> => {
        return this.databaseConnection.getMessagesByUserId(user_uuid, page, per_page);
    }

    public createMessage = async (message: MessageCreationRequest): Promise<Message> => {
        const createdMessagePromise = this.databaseConnection.createMessage(message);
        this.eventBroker.send(createdMessagePromise);
        return createdMessagePromise;
    };  

    public likeMessage = async (uuid: string, user: MessageLikeRequest): Promise<Message | undefined> => {
        return this.databaseConnection.likeMessage(uuid, user);
    }
    
    public undoLikeMessage = async (uuid: string, user: MessageUndoLikeRequest): Promise<Message | undefined> => {
        return this.databaseConnection.undoLikeMessage(uuid, user);
    }

    public deleteMessage = async (uuid: string): Promise<Message | undefined> => {
        return this.databaseConnection.deleteMessage(uuid);  
    };
}
