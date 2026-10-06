// entry file for express
// express related logic

import express from 'express';
import cors from "cors";
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { apiRouter } from './routes';



export function createApp(){
    const app = express();

    app.use(cors());
    app.use(express.json());
    // Middleware to parse incoming HTML form submission
    app.use(express.urlencoded({extended: true}))

// /api -> prefix
    app.use("/api", apiRouter);


    app.use(notFound);
    app.use(errorHandler);

    return app;

}