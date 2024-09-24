const { ProductModel } = require("../models/productModel");

const cloudinary = require("cloudinary").v2

//add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        // Accessing uploaded files
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        const imagesURL = await Promise.all(
            images.map(async (item) => {
                let response = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return response.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            image: imagesURL,
            date: Date.now()
        }

        const newProduct = new ProductModel(productData)
        await newProduct.save()

        console.log("Product Details:", name, description, price, category, subCategory, sizes, bestSeller);
        console.log("Uploaded Images:", image1, image2, image3, image4);
        console.log("Filtered Images:", images);
        console.log("productData:", productData);

        res.status(200).json({ success: true, message: 'Product Added Successfully!!' });

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message || 'Something went wrong..' });
    }
};

//list all product
const listProduct = async () => {

}

//remove product
const removeProduct = async () => {

}

//single product
const singleProduct = async () => {

}

module.exports = {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct
}