import { User } from '../models';
import { UserQuery } from '../types/user.type';

export async function findUsers(query: UserQuery) {
    const users = await User.find(query).select('-password -__v');
    return users;
}
export async function createUser(data: any) {
    const user = new User(data);
    return await user.save();
}