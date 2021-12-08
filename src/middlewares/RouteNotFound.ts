import { Request, Response, NextFunction } from 'express';
import ResponseHandler from '../utils/HttpUtil';

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    return new ResponseHandler(null, 404, "not found").send(res);
}

export default routeNotFound; 