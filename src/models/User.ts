export interface BaseUser {
    username: string;
    roles: string[];
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
}

export interface User extends BaseUser {
    uuid: number;
}