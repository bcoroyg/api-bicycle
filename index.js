import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routerAPI from './routes/index.js';
import connectionDB from './config/database.js';

const app = express();
const port = process.env.PORT;

const connectDB = async () => {
    await connectionDB();
}
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

routerAPI(app);

app.listen(port, () => {
    console.log(`Server started on port`);
});