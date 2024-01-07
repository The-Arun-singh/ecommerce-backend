import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config.js'
import User from "../models/user_model.js";


// here are all the functional logic needed for the backend routes for users


export const signupHandler = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) return res.status(400).json({ message: "username or password is missing" });

        const userExists = await User.findOne({
            email: email,
        })

        if (userExists) return res.status(500).json({ message: "User already exists" });

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName: fullName,
            email: email,
            password: hashedpassword,
        });

        res.status(200).json({ user: { fullName: user.fullName, _id: user._id, email: user.email }, message: "User successfully signedUp" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "username or password is missing" });

        const user = await User.findOne({ email: email });

        if (!user) return res.status(401).json({ message: "Invalid Credentials" });

        const verified = await bcrypt.compare(password, user.password);

        if (!verified) return res.status(401).json({ message: "password is incorrect" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });


        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                address: user.address,
                role: user.role,
                sellerName: user.sellerName,
            },
            token: token,
            message: "User successfully logedIn"
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const getUsersHandler = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            message: "users found",
            users: users
        });

    } catch (error) {
        console.error(error);
    }
}
export const getUserHandler = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        res.status(200).json({
            message: 'user found',
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                address: user.address,
                role: user.role,
                sellerName: user.sellerName,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}

export const updateUserDataHandler = async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        // console.log(req.body.address);
        if (req.body.hasOwnProperty('sellerName')) {
            await User.updateOne(filter, {
                $set: {
                    sellerName: req.body.sellerName,
                }
            }, {
                new: true,
            });
        } else if (req.body.hasOwnProperty('password')) {
            const hashedpassword = await bcrypt.hash(req.body.password, 10);
            await User.updateOne(filter, {
                $set: {
                    password: hashedpassword,
                }
            });
        } else if (req.body.hasOwnProperty('address')) {
            const user = await User.findByIdAndUpdate(req.user._id, {
                $set: {
                    address: req.body.address,
                }
            }, {
                new: true,
            });
            return res.status(200).json({
                message: 'address added',
                user: {
                    fullName: user.fullName,
                    email: user.email,
                    address: user.address,
                    role: user.role,
                    sellerName: user.sellerName,
                }
            })

        } else {
            return res.status(404).json({ message: error.message });
        }

        return res.status(200).json({ message: 'Updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}

export const deleteUserHandler = async (req, res) => {
    try {
        await User.findOneAndDelete({
            _id: req.params.id,
        });
        res.status(200).send({ message: 'User deleted successfully' });

    } catch (error) {
        console.error(error);
    }
}



