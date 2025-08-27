import dotenv from 'dotenv';
dotenv.config();

if (!process.env.FIXA_USERNAME || !process.env.FIXA_PASSWORD) {
    throw new Error('Missing required environment variables. Please check your .env file');
}

export const authConfig = {
    username: process.env.FIXA_USERNAME,
    password: process.env.FIXA_PASSWORD
};
