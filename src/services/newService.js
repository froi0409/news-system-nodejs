import  NewModel  from '../models/New.js';
import path from 'path';
import fs from 'fs';


export const newNew = async (newData) => {
    try {
        const newNew = new NewModel(newData);
        const newSaved = await newNew.save();

        await saveImage(newData, newNew);

        return newSaved;
    } catch (error) {
        throw error;
    }
}

export const allNews = async () => {
    try {
        const news = await NewModel.find({});
        return news;
    } catch (error) {
        throw error;
    }
}

export const newsByCategories = async (category) => {
    try {
        const news = await NewModel.find({ categories: category });
        return news;
    } catch {
        throw error;
    }
}

export const newsById = async (newId) => {
    try {
        const news = await NewModel.findOne({ _id: newId });
        return news;
    } catch (error) {
        throw error;
    }
}

export const deleteNewById = async (newId) => {
    try {
        const newToDelete = await NewModel.deleteOne({ _id: newId });
        return newToDelete;
    } catch (error) {
        
    }
}

const saveImage = async (newData, newNew) => {
    const image = newData.image;
    const extension = getFileExtension(image.originalname);
    const newFileName = `${newNew._id}.${extension}`;

    image.originalname = newFileName;

    const publicPath = path.join('public', 'images', newFileName);
    try {
        fs.writeFileSync(publicPath, image.buffer);
        console.log(`imagen ${newFileName} guardada con éxito`);

        const addImagePath = await NewModel.updateOne({ _id: newNew._id }, { $set: { imagePath: newFileName } });        
        console.log('Path acutalizado en la base de datos con éxito');
    } catch (error) {
        return newSaved;
    }
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

