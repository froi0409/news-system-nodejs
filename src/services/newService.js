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
        const news = await NewModel.find({ status: true });
        return news;
    } catch (error) {
        throw error;
    }
}

export const allDeletedNews = async () => {
    try {
        const news = await NewModel.find({ status: false })
    } catch (error) {
        throw error;
    }
}

export const newsByCategories = async (category) => {
    try {
        const news = await NewModel.find({ categories: category, status: true });

        for (const newEntity of news) {
            try {
                const image = await getImage(newEntity);
                if (image) {
                    newEntity.imagePath = image;
                }
            } catch (error) { }
        }

        return news;
    } catch (error) {
        throw error;
    }
}

export const newsById = async (newId) => {
    try {
        const news = await NewModel.findOne({ _id: newId, status: true });
        try {
            const image = await getImage(news);
            if (image) {
                news.imagePath = image;
                console.log(news);
            }
        } catch (error) {}

        return news;
    } catch (error) {
        throw error;
    }
}

export const deleteNewById = async (newId) => {
    try {
        const newToDelete = await NewModel.updateOne({ _id: newId }, { $set: { 'status': false } });
        return newToDelete;
    } catch (error) {
        throw error;
    }
}

export const deleteReportedNewById = async (newId, report) => {
    try {
        const newToDelete = await NewModel.updateOne({ _id: newId }, { $set: { 'status': false, report: report } });
        return newToDelete;
    } catch (error) {
        throw error;
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

const getImage = (newData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const imagePath = `public/images/${newData.imagePath}`;

            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    console.error(err);
                    reject();
                } else {
                    const imageBase64 = data.toString('base64');
                    resolve(imageBase64);
                }
            });
        } catch (error) {
            console.error(error);
            reject();
        }

    });
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

