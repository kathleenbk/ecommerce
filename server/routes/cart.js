const Cart = require("../models/cart.model");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();


// CREATE CART
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)

    try{
        const savedCart = await newCart.save();
        return res.status(200).json(savedCart)

    }catch(err){
        res.status(500).json(err)
    }

})


// UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (req,res) => {

    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        return res.status(200).json(updatedCart)
    }catch (err){
        res.status(500).json(err)
    }
});


// DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) =>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        return res.status(200).json("Cart has been deleted.")
    }catch(err){
        res.status(500).json(err)
    }
})


// GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) =>{
    try{
        const Cart = await Cart.findOne({userId: req.params.userId});
        return res.status(200).json(Cart)
    }catch(err){
        res.status(500).json(err)
    }
});

// GET ALL CARTS
router.get("/", verifyTokenAndAdmin, async (req, res) =>{
    try{
        const carts = await Cart.find();
        return res.status(200).json(carts)

    }catch(err){
        res.status(500).json(err)
    }
    
});




module.exports = router
