import productModel from "../models/productModel.js";

export const createProduct = async (req, res) => {
    try {
        const product = new productModel(req.body);
        const data = await product.save();
        res.status(201).json(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
    // try {
    //     const product = await productModel.create(req.body);

    //     res.status(200).json(product);
    //   } catch (error) {
    //     console.log(error);
    //     res.status(400).send(error);
    //   }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({})

        res.status(201).send(products);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await productModel.find({ id: req.params.id })

        res.status(201).send(product);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

export const getMultipleProducts = async (req, res) => {
    try {
        const array=JSON.parse(req.params.userFavourites)
        const products = await productModel.find({ id: { $in: array } });
        console.log(array)
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        console.log(array)
        res.status(400).send(error);
    }
};

export const getProductByIndex = async (req, res) => {
    try {
        const products = await productModel.find();
        const index = parseInt(req.params.index);

        if (index < 0 || index >= products.length) {
            return res.status(404).json({ message: "Product index out of range" });
        }

        const product = products[index];
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.deleteOne({ id: req.params.id })

        res.status(201).send(product);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await productModel.findOneAndUpdate({ id: req.params.id }, { $set: req.body, }, { new: true })

        res.status(201).send(product);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}