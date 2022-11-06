import { Message, MessageCreationRequest } from "../models/Message";

export default interface IDatabaseConnection {
    getAllMessages (): Promise<Array<Message>>;
    getMessageById (uuid: number): Promise<Message | undefined>;
    getMessagesByUserId (user_uuid: number, page: number, per_page: number): Promise<Array<Message> | undefined>;
    createMessage (message: MessageCreationRequest): Promise<Message>;
    deleteMessage (uuid: number): Promise<Message | undefined>;
}