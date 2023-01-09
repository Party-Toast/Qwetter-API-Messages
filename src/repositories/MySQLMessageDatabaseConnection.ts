import { Message, MessageCreationRequest, MessageLikeRequest, MessageUndoLikeRequest } from "../models/Message";
import IDatabaseConnection from "./IMessageDatabaseConnection";
import mysql from 'mysql';

// const messages: Array<Message> = [
//     {
//         uuid: '0',
//         user_uuid: '0',
//         firstName: 'John',
//         lastName: 'Doe',
//         username: 'jdoe',
//         avatar: 'INSERT_AVATAR',
//         content: 'Tagging test: @jdoe and @sytsewalraven are #firstusers! #prettycool and #stuff. Thanks @team! Visit www.google.com',
//         timestamp: new Date().toISOString(),
//         liked_user_uuids: [
//             '1'
//         ]
//     },
//     {
//         uuid: '1',
//         user_uuid: '1',
//         firstName: 'Sytse',
//         lastName: 'Walraven',
//         username: 'sytsewalraven',
//         avatar: 'INSERT_AVATAR',
//         content: 'Advanced test: @user123 @123user @ #@test @#test test@mail.com test#test',
//         timestamp: new Date('2022-11-07').toISOString(),
//         liked_user_uuids: [
//             '0'
//         ]
//     },
//     {
//         uuid: '2',
//         user_uuid: '0',
//         firstName: 'John',
//         lastName: 'Doe',
//         username: 'jdoe',
//         avatar: 'INSERT_AVATAR',
//         content: 'Hello again',
//         timestamp: new Date('2022-10-01').toISOString(),
//         liked_user_uuids: []
//     },
// ]

export default class MySQLMessageDatabaseConnection implements IDatabaseConnection {
    public connection;

    constructor() {
        // temporary hard-coded values, should use .env file but there are some issues with .env files and constructors
        this.connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
    }

    private executeQuery = async(query: string):  Promise<any> => {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                console.log('should fire first');
                resolve(rows);
            })
        });
    }

    public getAllMessages = async (): Promise<Array<Message>> => {
        let messages: Array<Message> = [];
        const query = 'SELECT * FROM messages';
        const rows = await this.executeQuery(query);
        console.log('should fire second');
        rows.forEach((row: any) => {
            let message: Message = {
                uuid: row.uuid ?? null,
                user_uuid: row.user_uuid ?? null,
                firstName: row.firstName ?? null,
                lastName: row.lastName ?? null,
                username: row.username ?? null,
                avatar: row.avatar ?? null,
                content: row.content ?? null,
                timestamp: row.timestamp ?? null,
                liked_user_uuids: row.liked_user_uuids ?? null
            }
            messages.push(message);
        });
        return messages;
    }

    public getMessageById = async (uuid: string): Promise<Message | undefined> => {
        return undefined;
        // return messages.find(message => message.uuid === uuid);
    }

    public getMessagesByUserId = async (user_uuid: string, page: number, per_page: number): Promise<Array<Message> | undefined> => {
        return undefined;
        
        // // TODO: implement pagination
        
        // // TODO: verify if user exists through user service
        // if (!messages.find(message => message.user_uuid === user_uuid)) {
        //     return undefined;
        // }
        // return messages.filter(message => message.user_uuid === user_uuid);
    }

    public createMessage = async (message: MessageCreationRequest): Promise<Message> => {
        // TODO: improve UUID generation
        const newMessage: Message = {
            uuid: "test_uuid",
            user_uuid: message.user_uuid,
            firstName: message.firstName,
            lastName: message.lastName,
            username: message.username,
            avatar: message.avatar,
            content: message.content,
            timestamp: message.timestamp,
            liked_user_uuids: []
        }
        // messages.push(newMessage);
        return newMessage;
    } 

    public likeMessage = async (uuid: string, user: MessageLikeRequest): Promise<Message | undefined> => {
        return undefined;
        // // If there exists no message with the provided UUID, return undefined
        // const index = messages.findIndex(message => message.uuid === uuid);
        // if(index === -1) {
        //     return undefined;
        // }

        // // If the message has already been liked by the user, just return the message
        // const message = messages[index];
        // const user_uuid = user.user_uuid;
        // if(message.liked_user_uuids.includes(user_uuid)) {
        //     return message;
        // }

        // // Else add the user's UUID to the array of user UUIDs that liked the message, then return the message
        // message.liked_user_uuids.push(user_uuid);
        // return message;
    }
    
    public undoLikeMessage = async (uuid: string, user: MessageUndoLikeRequest): Promise<Message | undefined> => {
        return undefined;
        // // If there exists no message with the provided UUID, return undefined
        // const messageIndex = messages.findIndex(message => message.uuid === uuid);
        // if(messageIndex === -1) {
        //     return undefined;
        // }

        // // If the message has not been like by the user yet, just return the message
        // const message = messages[messageIndex];
        // const user_uuid = user.user_uuid;
        // const userIndex = message.liked_user_uuids.indexOf(user_uuid);
        // if(userIndex === -1) {
        //     return message;
        // }

        // // Else remove the user's UUID from the array of user UUIDs that liked the message, then return the message
        // message.liked_user_uuids.splice(userIndex, 1);
        // return message;
    }
    
    public deleteMessage = async (uuid: string): Promise<Message | undefined> => {
        return undefined;
        // const index = messages.findIndex(message => message.uuid === uuid);
        // if(index === -1) {
        //     return undefined;
        // }
        // const message = messages[index];
        // messages.splice(index, 1);
        // return message;    
    }
}