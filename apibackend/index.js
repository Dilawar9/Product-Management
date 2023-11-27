
const express = require('express');
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const Product=require("./moduls/Product");
const port =3030;


// media uplaod image
 const fs= require("fs")
 const multer=require("multer")
 const upload=multer({dest:"uploads/"})



 
// middleware
app.use(cors());
app.use(express.json());



app.post("/uploading", upload.single('image'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    try {
        const extension = req.file.mimetype.split("/")[1];
        if (extension == "png" || extension == "jpg" || extension == "jpeg") {
            const fileNmae = req.file.filename + "." + extension;
            console.log(fileNmae);

            fs.rename(req.file.path, `uploads/${fileNmae}`, () => {
                console.log("\nFile Renamed!\n");
            });
            return res.json({
                message: "uploaded"
            })
        } else {

            fs.unlink(req.file.path, () => console.log("file deleted"))
            return res.json({
                message: "only images are accepted"
            })
        }

        
    } catch (error) {

    }
});

app.get('/', (req, res) => {

    res.status(200).json({
        message: "hello from node"
    })
})

// get all product
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            status: true,
            products: products
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message
        })
    }
})

// find by id
app.get("/products/:id", async (req, res) => {

    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        return res.status(200).json({
            status: true,
            product: product
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: "Product not found"
        })
    }
})

// create product
app.post("/products", async (req, res) => {

    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            status: true,
            newProduct: newProduct,
            message: "product created"
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = {};
            for (const field in error.errors) {
              errors[field] = error.errors[field].message;
            }
            res.status(200).json({ 
                status: false,
                errors: errors 
            });
          } else {
            // Other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }
});

// update product
app.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        });
        return res.status(200).json({
            status: true,
            updatedProduct: updatedProduct,
            message: "product succesfully updated"
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = {};
            for (const field in error.errors) {
              errors[field] = error.errors[field].message;
            }
            res.status(422).json({ errors });
          } else {
            // Other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }
});

// delete by id
app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: "product succesfully deleted"
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: "something went wrong"
        })
    }
});


mongoose.connect("mongodb://127.0.0.1:27017/produt").then(() => {
    app.listen(port, () => {
        console.log("db connected and server is up now");
    })
})



