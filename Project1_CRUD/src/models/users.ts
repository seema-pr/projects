
import { v4 as uuidv4 } from 'uuid';

export interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

const data = [
    {
        id: "d735e853-a5ff-4e56-9575-e7614c2745fb",
        username: "john_doe",
        age: 25,
        hobbies: ["reading", "coding", "traveling"],
    },
    {
        id: "bb0549d1-b556-44c8-8363-1c506df9694f",
        username: "jane_smith",
        age: 30,
        hobbies: ["painting", "gardening", "yoga"],
    }
]
const users: User[] = [];



export const getUsers = (): User[] => users;

export const createUser = (username: string, age: number, hobbies: string[]): User => {
    const newUser: User = {
        id: uuidv4(),
        username,
        age,
        hobbies,
    };

    users.push(newUser);

    return newUser;
};
