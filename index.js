import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import logger from 'morgan';
import createError from 'http-errors';
import cors from 'cors';
import url from 'url';
import swaggerUI from 'swagger-ui-express';
import routerAPI from './routes/index.js';
import connectionDB from './config/database.js';
import openApiConfiguration from './documentation/swagger.js';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const connectDB = async () => {
    await connectionDB();
}
connectDB();

const app = express();
const port = process.env.PORT;

//Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiConfiguration));

routerAPI(app);

//Eror 404 Página no existente
app.use((req, res, next)=> {
    next(createError(404, 'Page not found!.'));
});

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    res.status(status).json({
        status,
        message:err.message
    });
})


app.listen(port, () => {
    console.log(`Server started on port`);
});

export default app;