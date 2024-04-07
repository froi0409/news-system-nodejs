import { allNews, deleteNewById, newNew, newsByCategories as newsByCategory, newsById } from "../services/newService.js";

export const createNew = async (req, res) => {
    try {
        const newData = {
            title: req.body.title,
            image: req.file,
            description: req.body.description,
            body: req.body.body,
            author: req.body.author,
            publishDate: new Date(req.body.publishDate),
            categories: req.body.categories,
            status: req.body.status
        }
        console.log(newData);

        const newSaved = await newNew(newData);

        return res.status(201).json(newSaved);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const getAllNews = async (req, res) => {
    try {
        const news = await allNews();
        return res.status(200).json(news);
    } catch (error) {
        console.error(error)
        return res.status(500).json(error);
    }
}

export const getAllByCategory = async (req, res) => {
    try {
        const news = await newsByCategory(req.params.category);
        return res.status(200).json(news);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const getById = async (req, res) => {
    try {
        const news = await newsById(req.params.id);
        return res.status(200).json(news);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const deleteById = async (req, res) => {
    try {
        const newToDelete = await deleteNewById(req.params.id);
        if (!newToDelete) {
            return res.status(404).json({ message: 'New was not found' });
        }
        return res.status(200).json(newToDelete);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

