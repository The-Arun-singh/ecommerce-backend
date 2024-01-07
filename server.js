
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import portfinder from 'portfinder';
import mongoose from 'mongoose';
import { dirname } from "path";
import { fileURLToPath } from 'url';
import userRouter from './routes/user_routes.js';
import productsRouter from './routes/product_routes.js';
import orderRouter from './routes/order_routes.js';
import fileRouter from './routes/file_route.js';


global.__basedir = dirname(fileURLToPath(import.meta.url));

const app = express();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to mongodb'))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(productsRouter);
app.use(orderRouter);
app.use(fileRouter);


portfinder.getPort((err, port) => {
    if (err) throw err;
    app.listen(port, () => console.log(`listening on : http://localhost:${port}`));
})