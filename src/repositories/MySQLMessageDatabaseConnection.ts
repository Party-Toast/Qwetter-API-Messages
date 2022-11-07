import { Message, MessageCreationRequest, MessageLikeRequest, MessageUndoLikeRequest } from "../models/Message";
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
        timestamp: new Date().toISOString(),
        liked_user_uuids: [
            1
        ]
    },
    {
        uuid: 1,
        user_uuid: 1,
        firstName: 'Sytse',
        lastName: 'Walraven',
        username: 'SytseWalraven',
        avatar: 'INSERT_AVATAR',
        content: 'Goodbye world',
        timestamp: new Date().toISOString(),
        liked_user_uuids: [
            0
        ]
    },
    {
        uuid: 2,
        user_uuid: 0,
        firstName: 'John',
        lastName: 'Doe',
        username: 'JDoe',
        avatar: 'INSERT_AVATAR',
        content: 'Hello again',
        timestamp: new Date().toISOString(),
        liked_user_uuids: []
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
            liked_user_uuids: []
        }
        messages.push(newMessage);
        return newMessage;
    } 

    public likeMessage = async (uuid: number, user: MessageLikeRequest): Promise<Message | undefined> => {
        // If there exists no message with the provided UUID, return undefined
        const index = messages.findIndex(message => message.uuid === uuid);
        if(index === -1) {
            return undefined;
        }

        // If the message has already been liked by the user, just return the message
        const message = messages[index];
        const user_uuid = user.user_uuid;
        if(message.liked_user_uuids.includes(user_uuid)) {
            return message;
        }

        // Else add the user's UUID to the array of user UUIDs that liked the message, then return the message
        message.liked_user_uuids.push(user_uuid);
        return message;
    }
    
    public undoLikeMessage = async (uuid: number, user: MessageUndoLikeRequest): Promise<Message | undefined> => {
        // If there exists no message with the provided UUID, return undefined
        const messageIndex = messages.findIndex(message => message.uuid === uuid);
        if(messageIndex === -1) {
            return undefined;
        }

        // If the message has not been like by the user yet, just return the message
        const message = messages[messageIndex];
        const user_uuid = user.user_uuid;
        const userIndex = message.liked_user_uuids.indexOf(user_uuid);
        if(userIndex === -1) {
            return message;
        }

        // Else remove the user's UUID from the array of user UUIDs that liked the message, then return the message
        message.liked_user_uuids.splice(userIndex, 1);
        return message;
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