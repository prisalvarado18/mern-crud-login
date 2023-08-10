import dotenv from 'dotenv';
dotenv.config();
export const SECRET_TOKEN = process.env.SECRET_TOKEN || 'secret';
export const MONGODB_URI = process.env.MONGODB_URI;
export const FRONT_URL = process.env.FRONT_URL || 'http://localhost:5173';
export const PORT = process.env.PORT || 4500;

//console.log(process.env.MONGODB_URI);
//console.log(PORT);