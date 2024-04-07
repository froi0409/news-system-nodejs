import  NewModel  from '../models/New.js';

export const newNew = async (newData) => {
    try {
        const newNew = new NewModel(newData);

        const newSaved = await newNew.save();
        return newSaved;
    } catch (error) {
        throw error;
    }
}