import { Message, MessageCreationRequest, MessageLikeRequest, MessageUndoLikeRequest } from "../models/Message";

export default interface IDatabaseConnection {
    getAllMessages (): Promise<Array<Message>>;
    getMessageById (uuid: number): Promise<Message | undefined>;
    getMessagesByUserId (user_uuid: number, page: number, per_page: number): Promise<Array<Message> | undefined>;
    createMessage (message: MessageCreationRequest): Promise<Message>;
    likeMessage (uuid: number, user: MessageLikeRequest): Promise<Message | undefined>;
    undoLikeMessage (uuid: number, user: MessageUndoLikeRequest): Promise<Message | undefined>;
    deleteMessage (uuid: number): Promise<Message | undefined>;
}