// TODO: add favorites property (array of user_uuids)

export interface Message {
    uuid: number;
    user_uuid: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    content: string;
    timestamp: string;
}

export interface MessageCreationRequest {
    user_uuid: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    content: string;
    timestamp: string;
}

