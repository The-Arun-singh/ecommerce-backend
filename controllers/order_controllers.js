import Order from "../models/Order_model.js";

// here are all the functional logic needed for the backend routes for orders 

export const createOrderHandler = async (req, res) => {
    try {
        const order = await Order.create({
            ...req.body,
            customerId: req.user._id
        })
        res.status(200).json({ message: 'Order created successfully', order: order })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export const getAllOrdersHandler = async (req, res) => {
    try {
        const orders = await Order.find({}).populate({
            path: 'cart',
            populate: {
                path: 'id',
                select: ['productName', 'price', 'productImg']
            }
        });;

        res.status(200).json({
            message: "All orders found",
            allOrders: orders
        });

    } catch (error) {
        console.error(error);
    }
}
export const getMyOrdersHandler = async (req, res) => {
    try {
        // console.log(req.user.id);
        const myOrders = await Order.find({ customerId: req.user.id }).populate({
            path: 'cart',
            populate: {
                path: 'id',
                select: ['productName', 'price', 'productImg']
            }
        });;

        res.status(200).json({
            message: 'my orders found',
            myOrders: myOrders
        });

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}
export const getOrderHandler = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id }).populate({
            path: 'cart',
            populate: {
                path: 'id',
                select: ['productName', 'price', 'productImg']
            }
        });

        res.status(200).json({
            message: 'order found',
            order: order
        });

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}


export const deleteOrderHandler = async (req, res) => {
    try {
        await Order.findOneAndDelete({
            _id: req.params.id,
        });
        res.status(200).send({ message: 'Order deleted successfully' });

    } catch (error) {
        console.error(error);
    }
}