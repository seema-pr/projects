// usersController.ts
import { Request, Response } from 'express';
import { getUsers, User } from '../models/users';
import { v4 as uuidv4 } from 'uuid';

// Import UUID validation library
const validate = require('uuid-validate');

// Function to validate a UUID
const validateUUID = (userId: string): boolean => {
    const isValidUUID = validate(userId);
    return isValidUUID;
};

// Function to validate the required fields in the request body
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

// Get the users data 
const users = getUsers();

// Controller function to get all users
const getAllUsers = (req: Request, res: Response) => {
    res.status(200).json(users);
};

// Function to get a user by ID
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


// Function to create a new user
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


// Function to update a user by ID
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

// Function to delete a user by ID
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
    // send response messeage 
    //res.status(200).json({ message: "User got deleted" });
    // send response with no content
    res.status(204).json();

};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
