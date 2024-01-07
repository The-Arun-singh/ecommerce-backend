import express from 'express';

import { seedProductsHandler, seedUserHandler } from '../controllers/seed_controllers.js';

const seedRouter = express.Router();


// seed routes 

seedRouter.post("/seed/products", seedProductsHandler); // seeds 15 product samples into the database manually from backend to chech the project implementation
seedRouter.post("/seed/users", seedUserHandler); // seeds 1 normal user and 1 admin user into the database manually from backend to chech the project implementation



export default seedRouter;