import { Message } from "./Message";

export interface MultipleMessagesforTimelineRequest {
    user_uuid: string;
    messages: Array<Message>;
}