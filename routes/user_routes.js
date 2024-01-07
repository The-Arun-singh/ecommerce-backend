import express from 'express';

import { deleteUserHandler, getUserHandler, getUsersHandler, loginHandler, signupHandler, updateUserDataHandler } from '../controllers/user_controllers.js';
import { checkAuth, protectedRoutes } from '../middlewares/protectedroutes.js';

const userRouter = express.Router();

// all the routes for user authentication and user data manipulation

userRouter.post("/signup", signupHandler);
userRouter.post("/login", loginHandler);

userRouter.get('/getusers', protectedRoutes, checkAuth, getUsersHandler) //admin
userRouter.get('/getuser/:id', protectedRoutes, checkAuth, getUserHandler)
userRouter.put('/updateuserdata/:id', protectedRoutes, checkAuth, updateUserDataHandler)
userRouter.delete('/deleteuser/:id', protectedRoutes, checkAuth, deleteUserHandler)


export default userRouter; 