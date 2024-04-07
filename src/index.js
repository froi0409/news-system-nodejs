import { config } from 'dotenv';
import { app } from './app.js';

config();

const port = process.env.PORT_APP;
const server = app.listen(port, () => {
    console.log(`Listen in port ${port}`);
})
