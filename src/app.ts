import express, { Application } from 'express';
import { router as favoriteRouter } from "./routes/favorite.router";
import { router as userRouter } from "./routes/user.router";
import { router as simulatorRouter } from "./routes/simulator.router";
import routeNotFound from "./middlewares/RouteNotFound";
import morgan from "morgan";
import * as bodyParser from "body-parser";
import cors = require('cors');
import { errorHandler } from './middlewares/ErrorHandler';
import { ExpressError } from './interfaces';
import {  NextFunction, Response ,Request} from "express";
import { CORS_ORIGINS, DBURL, ENVIRONMENT } from './config';
import mongoose from "mongoose";

mongoose
  .connect(`${DBURL}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to DB ${DBURL}`);
  }).catch(err=>{
    console.log(`Error connecting ${DBURL}`);
    throw(err);
 });

const app: Application = express();

app.use(morgan(ENVIRONMENT));
// support application/json type post data
app.use(bodyParser.json());
// support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
//using cors package
app.use(cors({ origin: CORS_ORIGINS }));

//routes 
app.use(favoriteRouter);

app.use(userRouter);

app.use(simulatorRouter);

//if not routes were found
app.use(routeNotFound);

//handle errors thrown in th application
app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next));

export default app;