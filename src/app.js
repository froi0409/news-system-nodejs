import express, { urlencoded } from 'express';
import { startConnection } from './configs/database.config.js';
import cors from 'cors';

// Routes
import UserRoutes from './routes/user.routes.js';
import NewRoutes from './routes/new.routes.js';

startConnection();

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

app.use('/v1/user', UserRoutes);
app.use('/v1/new', NewRoutes);

export { app }


