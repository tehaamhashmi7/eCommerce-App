const Product = require('../models/product')
const User = require('../models/user')
const fetchUser = require('../middleware/fetchUser')
const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()

router.post('/add', fetchUser,
[body("title", "Enter a valid title").isLength({ min: 2 })],
async(req, res) => {
    let success =false
    try {
        const userId = req.user.id
        const user = await User.findById({ _id: userId }).select("-password")

        if(user) {
            const product = new Product({
                title: req.body.title,
                brand: req.body.brand,
                company: req.body.company,
                addedOn: Date.now(),
                addedBy: userId
            })

            const errors = validationResult(req);

            // If the user fails validation
            if (!errors.isEmpty()) {
            console.log(errors.array()[0].msg);
            return res.status(400).json({ errors: errors.array() });
            } else {
                await product.save()
                console.log("Product has been saved");
                console.log(product);
                success = true
                res.status(200).json({success, product});
            }
        }  else {
            res.status(500).json({ error: "Please login" });
          }
        } catch (err) {
          console.log(err.message);
          res.status(500).json({ error: "Internal server error" });
        }

})

// FIND ALL PRODUCTS

router.get('/all', fetchUser, async (req, res) => {
    let success = false
    try {
        const userId = req.user.id;
        const user = await User.findById({ _id: userId }).select("-password");
    
        if (!user) {
          res.status(500).json({ error: "Please login" });
        } else {
          const products = await Product.find({ addedBy: userId });
          if (products) {
            success = true
            res.status(200).json({success, products});
          } else {
            res.status(400).send("No products found");
          }
        }
      }catch(err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
})


// Update a product

router.put('/update/:id', fetchUser, async (req, res) => {
    let success = false
    let {title, brand, company } = req.body

    // Create a new product object

    const newProduct = {}

    if (title) {
        newProduct.title = title
    } 

    if (brand) {
        newProduct.brand = brand
    } 

    if (company) {
        newProduct.company = company
    }

    // Find the product to be updated and update it

    let product = await Product.findById(req.params.id)

    if(!product) {
        res.status(404).json({error: "Not found"})
    } else {
        if (product._id.toString() !== req.params.id) {
            res.status(401).json({id: product._id.toString() ,error: "Request Denied"})
        } else {
            product = await Product.findByIdAndUpdate(req.params.id, {$set: newProduct}, {new: true}).clone()
        }

        res.status(200).json({product})
    }
})


// Delete a product

router.delete('/delete/:id', fetchUser, async (req, res) => {
    let success = false
    try {

        let product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).send("404 Not found");
        }

        if (product._id.toString() !== req.params.id) {
            return res.status(401).json({ status: "request denied" });
        }

        const ops = await Product.findByIdAndDelete(product._id)

        if(ops) {
            res.status(200).json({ message: "Deleted" });
        }
    } catch(err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router