import express from 'express';
import { protectedRoutes } from '../middlewares/protectedroutes.js';
import { createOrderHandler, deleteOrderHandler, getAllOrdersHandler, getMyOrdersHandler, getOrderHandler } from '../controllers/order_controllers.js';

// all the routes for orders

const orderRouter = express.Router();

orderRouter.post('/createorder', protectedRoutes, createOrderHandler);

orderRouter.get('/getallorders', protectedRoutes, getAllOrdersHandler);
orderRouter.get('/getmyorders', protectedRoutes, getMyOrdersHandler);
orderRouter.get('/getorder/:id', protectedRoutes, getOrderHandler);


orderRouter.delete('/deleteorder/:id', protectedRoutes, deleteOrderHandler);

export default orderRouter; 