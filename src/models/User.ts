export interface User {
    uuid: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
}

export interface UserCreationRequest {
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
}

export interface UserUpdateRequest {
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
}