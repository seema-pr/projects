// usersController.ts
import { Request, Response } from 'express';
import { getUsers, User } from '../models/users';
import { v4 as uuidv4 } from 'uuid';

const validate = require('uuid-validate');
const users = getUsers();
const getAllUsers = (req: Request, res: Response) => {
    res.status(200).json(users);
};

const validateUUID = (userId: string): boolean => {
    const isValidUUID = validate(userId);
    return isValidUUID;
};

const validateRequestBody = (req: Request): string[] => {
    const { username, age, hobbies } = req.body;
    const missingFields = [];

    if (!username) {
        missingFields.push('username');
    }

    if (!age) {
        missingFields.push('age');
    }

    if (!hobbies) {
        missingFields.push('hobbies');
    }

    return missingFields;
};

const getUserById = (req: Request, res: Response) => {
    const userId = req.params.userId.replace(/[{}]/g, '');  // Remove curly braces

    const isValidUUID = validateUUID(userId);

    if (isValidUUID) {
        const user = users.find((u: User) => u.id === userId);

        if (!user) {
            res.status(404).json({
                status_code: 404,
                Message: "User doesn't exist",
            });
            return;
        } else {
            res.status(200).json(user);
        }
    } else {
        res.status(400).json({
            status_code: 400,
            Message: "Invalid UUID",
        });
        return;
    }
};

const createUser = (req: Request, res: Response) => {
    const missingFields = validateRequestBody(req);

    if (missingFields.length > 0) {
        res.status(400).json({
            status_code: 400,
            error_message: `Missing required fields in the request body: ${missingFields.join(', ')}`,
        });
        return;
    }

    const newUser: User = {
        id: uuidv4(),
        ...req.body,
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

const updateUser = (req: Request, res: Response) => {
    const userId = req.params.userId.replace(/[{}]/g, '');  // Remove curly braces
    const isValidUUID = validateUUID(userId);

    if (isValidUUID) {
        const missingFields = validateRequestBody(req);

        if (missingFields.length > 0) {
            res.status(400).json({
                status_code: 400,
                error_message: `Missing required fields in the request body: ${missingFields.join(', ')}`,
            });
            return;
        }

        const userIndex = users.findIndex((u: User) => u.id === userId);

        if (userIndex === -1) {
            res.status(404).json({
                status_code: 404,
                Message: "User doesn't exist",
            });
            return;
        } else {
            // Update user details
            users[userIndex] = {
                ...users[userIndex],
                ...req.body,
            };

            res.status(200).json(users[userIndex]);
        }
    } else {
        res.status(400).json({
            status_code: 400,
            Message: "Invalid UUID",
        });
        return;
    }
};

const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.userId.replace(/[{}]/g, '');  // Remove curly braces

    const isValidUUID = validateUUID(userId);

    if (!isValidUUID) {
        res.status(400).json({
            status_code: 400,
            Message: "Invalid UUID",
        });
        return;
    }

    const userIndex = users.findIndex((u: User) => u.id === userId);

    if (userIndex === -1) {
        res.status(404).json({
            status_code: 404,
            Message: "User doesn't exist",
        });
        return;
    }

    // Remove the user from the array
    const updatedUsers = users.splice(userIndex, 1);
    const deletedMsg = { message: "User got deleted" }
    res.status(204).json(deletedMsg);

};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
