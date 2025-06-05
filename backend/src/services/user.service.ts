import { User } from '../models';
import { UserInput, UserQuery } from '../types/user.type';

export async function findUsers(query: UserQuery) {
    const users = await User.find(query).select('-password -__v');
    return users;
}
export async function createUser(data: UserInput) {
    const user = new User(data);
    return await user.save();
}