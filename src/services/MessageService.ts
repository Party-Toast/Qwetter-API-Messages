import MySQLMessageDatabaseConnection from "../repositories/MySQLMessageDatabaseConnection";
import { Message, MessageCreationRequest, MessageLikeRequest, MessageUndoLikeRequest } from "../models/Message";

export default class MessageService {
    public databaseConnection: MySQLMessageDatabaseConnection;

    constructor() {
        this.databaseConnection = new MySQLMessageDatabaseConnection();
    }

    public getAllMessages = async (): Promise<Array<Message>> => {
        return this.databaseConnection.getAllMessages();
    };
    
    public getMessageById = async (uuid: number): Promise<Message | undefined> => {
        return this.databaseConnection.getMessageById(uuid);
    }

    public getMessagesByUserId = async (user_uuid: number, page: number | undefined, per_page: number | undefined): Promise<Array<Message> | undefined> => {
        const DEFAULT_PAGE = 1;
        const DEFAULT_PER_PAGE = 20; 
        
        if(!page) {
            page = DEFAULT_PAGE;
        }
        if(!per_page) {
            per_page = DEFAULT_PER_PAGE;
        }
        return this.databaseConnection.getMessagesByUserId(user_uuid, page, per_page);
    }

    public createMessage = async (message: MessageCreationRequest): Promise<Message> => {
        return this.databaseConnection.createMessage(message);
    };  

    public likeMessage = async (uuid: number, user: MessageLikeRequest): Promise<Message | undefined> => {
        return this.databaseConnection.likeMessage(uuid, user);
    }
    
    public undoLikeMessage = async (uuid: number, user: MessageUndoLikeRequest): Promise<Message | undefined> => {
        return this.databaseConnection.undoLikeMessage(uuid, user);
    }

    public deleteMessage = async (uuid: number): Promise<Message | undefined> => {
        return this.databaseConnection.deleteMessage(uuid);  
    };
}
