import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

export async function startConnection() {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });
        console.log(`Connected to database: ${db.connection.name}`);
    } catch (error) {
        console.error(error);
    }
}
