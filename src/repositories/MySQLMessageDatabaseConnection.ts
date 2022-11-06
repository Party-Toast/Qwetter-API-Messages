import { Message, MessageCreationRequest } from "../models/Message";
import IDatabaseConnection from "./IMessageDatabaseConnection";
import mysql from 'mysql';

const messages: Array<Message> = [
    {
        uuid: 0,
        user_uuid: 0,
        firstName: 'John',
        lastName: 'Doe',
        username: 'JDoe',
        avatar: 'INSERT_AVATAR',
        content: 'Hello world',
        timestamp: new Date()
    },
    {
        uuid: 1,
        user_uuid: 1,
        firstName: 'Sytse',
        lastName: 'Walraven',
        username: 'SytseWalraven',
        avatar: 'INSERT_AVATAR',
        content: 'Goodbye world',
        timestamp: new Date()
    },
    {
        uuid: 2,
        user_uuid: 0,
        firstName: 'John',
        lastName: 'Doe',
        username: 'JDoe',
        avatar: 'INSERT_AVATAR',
        content: 'Hello again',
        timestamp: new Date()
    },
]

export default class MySQLMessageDatabaseConnection implements IDatabaseConnection {
    public connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
    }

    private executeQuery = async(query: string):  Promise<any> => {
        try {
            this.connection.query(query, (err, rows, fields) => {
                if (err) {
                    throw err;
                }
                return rows;
            })
        }
        catch(e) {
            throw e;
        }
    }

    // TODO: implement MySQL queries
    public getAllMessages = async (): Promise<Array<Message>> => {
        return messages;
    }

    public getMessageById = async (uuid: number): Promise<Message | undefined> => {
        return messages.find(message => message.uuid === uuid);
    }

    public getMessagesByUserId = async (user_uuid: number, page: number, per_page: number): Promise<Array<Message> | undefined> => {
        // TODO: implement pagination
        console.log({page, per_page})
        return messages.filter(message => message.user_uuid === user_uuid);
    }

    public createMessage = async (message: MessageCreationRequest): Promise<Message> => {
        // TODO: improve UUID generation
        const nextUuid = messages.length;
        const newMessage: Message = {
            uuid: nextUuid,
            user_uuid: message.user_uuid,
            firstName: message.firstName,
            lastName: message.lastName,
            username: message.username,
            avatar: message.avatar,
            content: message.content,
            timestamp: message.timestamp,
        }
        messages.push(newMessage);
        return newMessage;
    } 

    public deleteMessage = async (uuid: number): Promise<Message | undefined> => {
        const index = messages.findIndex(message => message.uuid === uuid);
        if(index === -1) {
            return undefined;
        }
        const message = messages[index];
        messages.splice(index, 1);
        return message;    
    }
}