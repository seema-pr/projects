import { Request, Response } from 'express';

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

export {
    validateUUID,
    validateRequestBody,
};