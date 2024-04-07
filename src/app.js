import express, { urlencoded } from 'express';
import cors from 'cors';

const app = express();

const corsOptions = {};
app.use(cors(corsOptions));
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({
        message: 'News System'
    })
});

export { app }


