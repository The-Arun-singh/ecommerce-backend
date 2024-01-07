import Product from "../models/product_model.js"

// here are all the functional logic needed for the backend routes for products


export const createProductHandler = async (req, res) => {
    try {
        const { productName, description, category, image, price, stock } = req.body;
        if (!productName || !description || !category || !price || !image || !stock) return res.status(404).json({ message: "one or more fields required are empty!" });

        req.user.password = undefined;
        const postObj = await Product.create({
            productName: productName,
            category: category,
            description: description,
            price: price,
            productImg: image,
            stockStatus: stock,
            seller: { _id: req.user._id, sellerName: req.user.sellerName },
        });

        res.status(200).json({ post: postObj, message: "success" });

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}


export const allProductHandler = async (req, res) => {
    try {
        const allProducts = await Product.find().populate('comments.commentedBy', "_id fullName");

        res.status(200).json({ products: allProducts });

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}
export const getForAllProductsHandler = async (req, res) => {
    try {
        const category = req.params;
        // console.log(category);
        const products = await Product.find({ 'category.for': category.for })

        res.status(200).json({ message: "success", products });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}
export const getForProductsHandler = async (req, res) => {
    try {
        const category = req.params;
        // console.log(category);
        const products = await Product.find({ category: category })

        res.status(200).json({ message: "success", products });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}

export const getProductHandler = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id })

        res.status(200).json({ message: "success", product });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}



export const editProductHandler = async (req, res) => {
    try {
        const updateData = req.body;
        const filter = { _id: req.params.id };
        // console.log(updateData, filter);
        const product = await Product.updateOne(filter, { $set: updateData });

        res.status(200).json({ message: 'Updated successfully', product: product });

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}

export const ratingHandler = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            $push: {
                rating: {
                    _id: req.user.id,
                    value: req.body.rating,
                }
            }
        }, {
            new: true,
        });

        res.status(200).json({ message: 'rated successfully', product: product });

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }

};
export const commentHandler = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            $push: {
                comments: {
                    commentText: req.body.comment,
                    commentedBy: req.user.id,
                }
            }
        }, {
            new: true,
        })

        res.status(200).json({ message: "commented successfully", product: product });

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
};



export const deleteProductHandler = async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.params.id });

        res.status(200).json({ message: "successfully deleted " });

    } catch (error) {
        console.error(error);
        res.status(404).json({ error: error.message });
    }
}