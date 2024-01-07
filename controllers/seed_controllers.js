import User from "../models/user_model.js";
import Product from "../models/product_model.js";
import bcrypt from 'bcrypt';


// here are all the functional logic needed for the backend routes for seed users and seed products

export const seedUserHandler = async (req, res) => {
    try {
        const userExists = await User.findOne({
            email: 'arunadmin@gmail.com' || "arun@gmail.com",
        })

        if (userExists) return res.status(500).json({ message: "User already exists" });

        const newAdminUser = await User.create({
            fullName: "Arun Admin",
            email: "arunadmin@gmail.com",
            password: bcrypt.hash("admin@123"),
            role: "admin",

        });
        const newUser = await User.create({
            ullName: "Arun",
            email: "arun@gmail.com",
            password: bcrypt.hash("user@123"),
            role: "admin",
        });

        res.status(200).json({
            newAdminUser: {
                fullName: newAdminUser.fullName,
                _id: newAdminUser._id,
                email: newAdminUser.email,
                role: newAdminUser.role
            },
            newUser: {
                fullName: newUser.fullName,
                _id: newUser._id,
                email: newUser.email,
                role: newUser.role
            },
            message: "User successfully registered"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const seedProductsHandler = async (req, res) => {
    try {
        const products = await Product.create([
            {
                "productName": "black dress",
                "category": {
                    "for": "women",
                    "type": "dresses"
                },
                "description": "gorgeous dress",
                "price": 400,
                "productImg": "http://localhost:8000/files/blackDress.jpg",
                "stockStatus": "4",
                "rating": [
                    {
                        "_id": {
                            "$oid": "659397e38952ea15048750af"
                        },
                        "value": 4
                    },
                    {
                        "_id": {
                            "$oid": "659397e38952ea15048750af"
                        },
                        "value": 5
                    }
                ],
                "comments": [
                    {
                        "commentText": "very comfortable fabric , definetly a buy :)",
                        "commentedBy": {
                            "$oid": "659397e38952ea15048750af"
                        },
                        "_id": {
                            "$oid": "65953ed7e4df09c8560bd4ad"
                        }
                    },
                    {
                        "commentText": "fashionable",
                        "commentedBy": {
                            "$oid": "659397e38952ea15048750af"
                        },
                        "_id": {
                            "$oid": "6595407962d52812251ac0dc"
                        }
                    }
                ],
                "__v": 0,
                "seller": {
                    "sellerName": "Arun"
                }
            },
            {
                "_id": {
                    "$oid": "65940f9e63741a3ddd7259df"
                },
                "productName": "women's jeans",
                "category": {
                    "for": "women",
                    "type": "pants"
                },
                "description": "denim jeans",
                "price": 300,
                "productImg": "http://localhost:8000/files/jeans.jpg",
                "stockStatus": "40",
                "rating": [],
                "comments": [],
                "__v": 0
            },
            {
                "_id": {
                    "$oid": "65940fc963741a3ddd7259e4"
                },
                "productName": "pink pants",
                "category": {
                    "for": "women",
                    "type": "pants"
                },
                "description": "designer and fashionable pants",
                "price": 400,
                "productImg": "http://localhost:8000/files/pinkPants.jpg",
                "stockStatus": "50",
                "rating": [],
                "comments": [],
                "__v": 0
            },
            {
                "_id": {
                    "$oid": "6594102963741a3ddd7259ee"
                },
                "productName": "blue skirt",
                "category": {
                    "for": "women",
                    "type": "skirts"
                },
                "description": "fashionable blue skirt for women",
                "price": 400,
                "productImg": "http://localhost:8000/files/blueSkirt.jpg",
                "stockStatus": "40",
                "rating": [],
                "comments": [],
                "__v": 0
            },
            {
                "_id": {
                    "$oid": "659410ce63741a3ddd7259fb"
                },
                "productName": "black hoodie",
                "category": {
                    "for": "men",
                    "type": "hoodies"
                },
                "description": "hoodie for boys",
                "price": 300,
                "productImg": "http://localhost:8000/files/blackHoodie.jpg",
                "stockStatus": "40",
                "rating": [],
                "comments": [],
                "__v": 0
            },
            {
                "_id": {
                    "$oid": "65941abc2213f94ec1504dc9"
                },
                "productName": "grey skirt",
                "category": {
                    "for": "women",
                    "type": "skirts"
                },
                "description": "women's skirts",
                "price": 300,
                "productImg": "http://localhost:8000/files/greySkirt.jpg",
                "stockStatus": "40",
                "rating": [],
                "comments": [],
                "__v": 0
            },
            {
                "_id": {
                    "$oid": "65941ae82213f94ec1504dd2"
                },
                "productName": "orange dress",
                "category": {
                    "for": "women",
                    "type": "dresses"
                },
                "description": "beautiful dress",
                "price": 400,
                "productImg": "http://localhost:8000/files/orangeDress.jpg",
                "stockStatus": "5",
                "rating": [],
                "comments": [],
                "__v": 0
            },
            {
                "_id": {
                    "$oid": "65981656aa472e3572847ca1"
                },
                "productName": "black dress",
                "category": {
                    "for": "women",
                    "type": "dresses"
                },
                "description": "gorgeous dress",
                "price": 400,
                "productImg": "http://localhost:8000/files/blackDress.jpg",
                "stockStatus": "4",
                "rating": [
                    {
                        "_id": {
                            "$oid": "659397e38952ea15048750af"
                        },
                        "value": 4
                    },
                    {
                        "_id": {
                            "$oid": "659397e38952ea15048750af"
                        },
                        "value": 5
                    }
                ],
                "comments": [
                    {
                        "commentText": "very comfortable fabric , definetly a buy :)",
                        "commentedBy": {
                            "$oid": "659397e38952ea15048750af"
                        },
                        "_id": {
                            "$oid": "65953ed7e4df09c8560bd4ad"
                        }
                    },
                    {
                        "commentText": "fashionable",
                        "commentedBy": {
                            "$oid": "659397e38952ea15048750af"
                        },
                        "_id": {
                            "$oid": "6595407962d52812251ac0dc"
                        }
                    }
                ],
                "__v": 0,
                "seller": {
                    "sellerName": "Arun"
                }
            }
        ])

        res.status(200).json({ message: "seed product created", products: products })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

