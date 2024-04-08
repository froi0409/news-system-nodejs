import { decodeJwt } from "../configs/auth.cjs";
import { allDeletedNews, allNews, deleteNewById, newNew, newsByCategories as newsByCategory, newsById, deleteReportedNewById, getTodayDate } from "../services/newService.js";

export const createNew = async (req, res) => {
    try {
        const jwtParams = await decodeJwt(req.headers.authorization);
        const date = getTodayDate();
        
        console.log(jwtParams);

        const newData = {
            title: req.body.title,
            image: req.file,
            description: req.body.description,
            body: req.body.body.replace(/\n/g, '<br>'),
            author: jwtParams.username,
            publishDate: new Date(date),
            categories: req.body.categories,
            status: true
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

export const getAllDeletedNews = async (req, res) => {
    try {
        const news = await allDeletedNews();
        return res.status(200).json(news);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const getAllByCategory = async (req, res) => {
    try {
        const news = await newsByCategory(req.params.category, req.params.id);
        return res.status(200).json(news);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const getById = async (req, res) => {
    try {
        const news = await newsById(req.params.id);

        if (!news) {
            res.status(404).json({ message: 'new not found or delted' })
        }

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

export const deleteReportedById = async (req, res) => {
    try {
        const newToDelete = await deleteReportedNewById(req.params.id, req.params.report);
        if (!newToDelete) {
            return res.status(404).json({ message: 'New was not found' });
        }
        return res.status(200).json(newToDelete);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);       
    }
}