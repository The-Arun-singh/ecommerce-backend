import mongoose from "mongoose";

// schema for the products

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    category: {
        for: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    productImg: {
        type: String,
        required: true,
    },
    stockStatus: {
        type: Number,
        required: true,
    },
    seller: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        sellerName: {
            type: String,
            ref: "User",
        }
    },
    rating: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            value: {
                type: Number,
                default: 0,
            }
        }
    ],
    comments: [
        {
            commentText: String,
            commentedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        }
    ]
});

const product = mongoose.model('Product', productSchema);

export default product;