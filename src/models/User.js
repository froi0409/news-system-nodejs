import mongoose, { Schema } from 'mongoose';

const model = mongoose.model;

const userSchema = new Schema({
    username: String, 
    password: String,
    firstName: String,
    lastName: String, 
    birthDate: Date,
    role: String,
    email: String,
    phone: String
}, {
    versionKey: false
})

export default model('user', userSchema);

