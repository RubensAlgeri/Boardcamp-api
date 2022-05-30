import express from 'express';
import cors from "cors"
import router from './routes/index.js';

const app = express();
app.use(cors())
app.use(express.json());

app.use(router);
const porta = process.env.PORT || 4000;
app.listen(porta, () => {
    console.log(`Server is listening on port ${porta}.`);
});