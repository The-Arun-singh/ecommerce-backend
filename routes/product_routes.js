import express from 'express';

// import { protectedRoutes } from '../middlewares/protectedroutes.js';
import { allProductHandler, commentHandler, createProductHandler, deleteProductHandler, editProductHandler, getForAllProductsHandler, getForProductsHandler, getProductHandler, ratingHandler } from '../controllers/product_controllers.js';
import { checkAdminAuth, protectedRoutes } from '../middlewares/protectedroutes.js';

const productsRouter = express.Router();

// all the product routes 

productsRouter.get('/getproduct/:id', getProductHandler);
productsRouter.get('/products/:for', getForAllProductsHandler)
productsRouter.get('/products/:for/:type', getForProductsHandler)
productsRouter.get("/allproducts", allProductHandler);


productsRouter.post('/createproduct', protectedRoutes, checkAdminAuth, createProductHandler); //admin

productsRouter.put('/editproduct/:id', protectedRoutes, checkAdminAuth, editProductHandler); //admin                           

productsRouter.put('/rating/:id', protectedRoutes, ratingHandler);
productsRouter.put('/comment/:id', protectedRoutes, commentHandler);

productsRouter.delete('/deleteproduct/:id', protectedRoutes, checkAdminAuth, deleteProductHandler); //admin


export default productsRouter; 