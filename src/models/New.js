import mongoose, { Schema } from 'mongoose';

const model = mongoose.model;

const newScheema = new Schema({
    title: String,
    imagePath: String,
    description: String,
    body: String,
    author: String,
    publishDate: Date,
    categories: Array,
    status: Boolean,
    deletedDate: Date,
    report: String
}, {
    versionKey: false
})

export default model('new', newScheema);

