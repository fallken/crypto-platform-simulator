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
import { CORS_ORIGINS } from './config';


const app: Application = express();

app.use(morgan("tiny"));
// support application/json type post data
app.use(bodyParser.json());
// support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
//using cors package
app.use(cors({ origin: CORS_ORIGINS }));

//routes 
app.use("/api/favorite" , favoriteRouter);

app.use("/api/user" , userRouter);

app.use("/api/simulator" , simulatorRouter);

//if not routes were found
app.use(routeNotFound);

//handle errors thrown in th application
app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next));

export default app;