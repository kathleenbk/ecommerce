const Order = require("../models/order.model");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();


// CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder)

    } catch (err) {
        res.status(500).json(err)
    }

})


// UPDATE ORDER
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        return res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
});


// DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json("Order has been deleted.")
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const Orders = await Order.findOne({ userId: req.params.userId });
        return res.status(200).json(Orders)
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders)

    } catch (err) {
        res.status(500).json(err)
    }

});

// GET ORDER STATS
// MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        return res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router
