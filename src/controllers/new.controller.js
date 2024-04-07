import { newNew } from "../services/newService.js";

export const createNew = async (req, res) => {
    try {
        const newData = {
            title: req.body.title,
            imagePath: req.body.imagePath,
            description: req.body.description,
            body: req.body.body,
            author: req.body.author,
            publishDate: new Date(req.body.publishDate),
            categories: req.body.categories,
            status: req.body.status
        }

        const newSaved = await newNew(newData);

        return res.status(201).json(newSaved);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

