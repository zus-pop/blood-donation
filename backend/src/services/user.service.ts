import { User } from '../models';
import { UserInput, UserQuery } from '../types/user.type';

export async function findUsers(query: UserQuery) {
    const users = await User.find(query).select('-password');
    return users;
}
export async function createUser(data: UserInput) {
    const user = new User(data);
    return await user.save();
}
export async function findUserById(id: string) {
    const user = await User.findById(id).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}
export async function updateUser(id: string, data: Partial<UserInput>) {
    const user = await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}
export async function deleteUser(id: string) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}