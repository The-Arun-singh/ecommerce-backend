import mongoose from "mongoose";

// schema for the user/customer

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        fullName: {
            type: String,
        },
        userAddress: {
            type: String,
        },
        city: {
            type: String,
        },
        postalCode: {
            type: Number,
        },
        country: {
            type: String,
        },
    },
    role: {
        type: String,
        required: true,
        default: 'user',
    },
    sellerName: {
        type: String,
        default: function () {
            return this.fullName;
        }
    }
})

const user = mongoose.model('User', userSchema);

export default user;