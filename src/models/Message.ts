export interface Message {
    uuid: number;
    user_uuid: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    content: string;
    timestamp: string;
    liked_user_uuids: Array<number>; // Array of user UUIDs
}

export interface MessageCreationRequest {
    user_uuid: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    content: string;
    timestamp: string;
    liked_user_uuids: string;
}

export interface MessageLikeRequest {
    user_uuid: number;
}

export interface MessageUndoLikeRequest {
    user_uuid: number;
}
