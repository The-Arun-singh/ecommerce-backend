import mongoose from "mongoose";

//  schema for the orders

const orderSchema = mongoose.Schema({
    orderDate: {
        type: Date,
        default: Date.now(),
    },
    cart: [{
        id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
        },

    }],
    totalQuantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "not delivered",
    },
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    paymentMethod: {
        type: String,
        default: "Cash on Delivery",
    }
})

orderSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.orderDate = doc.orderDate.toLocaleDateString();
        return ret;
    }
})

const order = mongoose.model('Order', orderSchema);

export default order;