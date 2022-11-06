// TODO: add favorites property (array of user_uuids)

export interface Message {
    uuid: number;
    user_uuid: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    content: string;
    timestamp: Date;
}

export interface MessageCreationRequest {
    user_uuid: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    content: string;
    timestamp: Date;
}

