const Order = require('../models/OrderModel');
const Cart = require("../models/CartModel");


// get all the orders of specific user
const getUserOrders = async (req, res) => {
    const username = req.session.username;
    try {
        const orders = await Order.find({ username: username }).populate('products.productId').lean();
        if (!orders || orders.length === 0)
            return res.json({ orders: [] });

        return res.json({ orders: orders });
    }
    catch (error) {
        console.error('Failed to find orders:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// get all the orders of everyone, only for admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('products.productId').lean();
        if (!orders || orders.length === 0)
            return res.json({ orders: [] });

        return res.json({ orders: orders });
    }
    catch (error) {
        console.error('Failed to find orders:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const completeOrder = async (req, res) => {
    const username = req.session.username;
    try {
        const cart = await Cart.findOne({ username: username }).populate('products.productId').lean();
        if (!cart)
            return res.json({ message: "cart not created" });

        if (cart.products.length === 0)
            return res.json({ message: "there is no items in the cart" });

        const newOrder = new Order({
            username: username,
            products: cart.products,
            totalPrice: cart.totalPrice
        })
        await newOrder.save();
        // delete the cart after completing and order
        await Cart.deleteOne({ username: username });
        const order = await newOrder.populate('products.productId');
        return res.status(200).json({ order: order, message: 'Item added to cart successfully' });
    }
    catch (error) {
        console.log('Failed to find orders:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getDailyIncome = async (req, res) => {
    try {
        const dailyIncome = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    },
                    totalIncome: { $sum: "$totalPrice" }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                    "_id.day": 1
                }
            }
        ]);
        return res.status(200).json({ dailyIncome: dailyIncome });
    }
    catch (error) {
        console.log('Failed to find orders:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getDailySurfboardsSales = async (req, res) => {
    try {
        const dailySurfboardsSales = await Order.aggregate([
            {
                $unwind: "$products" // Split array field into separate documents
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" },
                        surfboard: "$products.productId"
                    },
                    totalQuantity: { $sum: "$products.quantity" }
                }
            },
            {
                $lookup: {
                    from: "surfboards",
                    localField: "_id.surfboard",
                    foreignField: "_id",
                    as: "surfboardDetails"
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    day: "$_id.day",
                    surfboard: {
                        $arrayElemAt: ["$surfboardDetails.model", 0]
                    },
                    totalQuantity: 1
                }
            },
            {
                $sort: {
                    year: 1,
                    month: 1,
                    day: 1
                }
            }
        ]);

        return res.status(200).json({ dailySurfboardsSales: dailySurfboardsSales });
    }
    catch (error) {
        console.log('Failed to find orders:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getUserOrders,
    getAllOrders,
    completeOrder,
    getDailyIncome,
    getDailySurfboardsSales
};
