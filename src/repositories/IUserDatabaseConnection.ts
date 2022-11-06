import { User, UserCreationRequest, UserUpdateRequest } from "../models/User";

export default interface IDatabaseConnection {
    getAllUsers (): Promise<Array<User>>;
    getUserById (uuid: number): Promise<User | undefined>;
    createUser (user: UserCreationRequest): Promise<User>;
    updateUser (uuid: number, user: UserUpdateRequest): Promise<User | undefined>;
    deleteUser (uuid: number): Promise<User | undefined>;
}
