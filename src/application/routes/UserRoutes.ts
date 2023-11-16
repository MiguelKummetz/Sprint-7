import * as express from 'express';
import {
  create
  // findById,
  // findAll,
  // update,
  // delete
} from '../controllers/UserControllers';

export const userRouter = express.Router();

userRouter.post('/', create);
// userRouter.get('/', findAll);
// userRouter.put('/', update);
// userRouter.delete('/', delete);
