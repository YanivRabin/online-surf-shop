const Cart = require('../models/CartModel');
const Surfboard = require('../models/SurfboardModel');


const addToCart = async (req, res) => {

    const username = req.session.username;
    const { surfboardId, surfboardPrice } = req.body;

    try {

        const cart = await Cart.findOne({ username: username });
        // console.log(cart)

        if (!cart) {

            // If the cart doesn't exist, create a new one and add the first product
            const newCart = new Cart({
                username: username,
                products: [{
                    productId: surfboardId,
                    price: surfboardPrice
                }],
                totalPrice: surfboardPrice
            });
            // save new cart
            await newCart.save();
        }
        else {

            // If the cart exists, check if the product already exists in the cart
            const existingProduct = cart.products.find(product => product.productId.toString() === surfboardId);
            if (existingProduct) {

                // If the product already exists, update its quantity
                await Cart.findOneAndUpdate(
                    { username: username, 'products.productId': surfboardId },
                    { $inc: { 'products.$.quantity': 1 } },
                    { new: true }
                );
            }
            else {

                // If the product doesn't exist, add it to the cart
                cart.products.push({
                    productId: surfboardId,
                    price: Number(surfboardPrice)
                });
                await cart.save();
            }
            // update the price and total price
            await updatePrice(username);
        }

        res.status(200).json({ cart: cart, message: 'Item added to cart successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding item to cart' });
    }
}

const getCartItems = async (req, res) => {

    const username = req.session.username;

    try {
        const cart = await Cart.findOne({ username: username }).populate('products.productId').lean();
        if (!cart)
            return res.json({ products: [] });

        return res.json({ products: cart.products, totalPrice: cart.totalPrice });
    }
    catch (error) {
        console.error('Failed to find items:', error);
        return res.send('Internal Server Error');
    }
}

const removeCartItem = async (req, res) => {

    const username = req.session.username;
    const { productId } = req.body;

    try {

        const updatedCart = await Cart.findOneAndUpdate(
            { username: username },
            { $pull: { products: { productId: productId } } },
            { new: true }
        );

        if (!updatedCart)
            return res.json({ message: "Problem with cart or cart item"});

        await updatePrice(username);
        return res.json({ message: 'Product deleted successfully from cart' });
    }
    catch (error) {
        console.error('Failed to find items:', error);
        return res.send('Internal Server Error');
    }
}

const updateCartItem = async (req, res) => {

    const username = req.session.username;
    const { productId, quantity, surfboardPrice } = req.body;

    // delete if quantity is 0
    if (Number(quantity) === 0) {

        return removeCartItem(req, res);
    }
    else {

        try {

            const updatedCartProduct = await Cart.findOneAndUpdate(
                { username: username, 'products.productId': productId },
                { $set: {
                            'products.$.quantity': Number(quantity),
                            'products.$.price': Number(surfboardPrice),
                        }},
                { new: true }
            );

            if(!updatedCartProduct)
                return res.json({ message:"Problem with cart or cart item"});

            await updatePrice(username);
            return res.json({ message: 'Product quantity update successfully' });
        }
        catch (error) {
            console.error('Failed to find item', error);
            return res.send('Internal Server Error');
        }
    }
}

async function updatePrice(username) {

    const cart = await Cart.findOne({username: username});
    cart.totalPrice = 0;
    if (cart.products.length !== 0)
        cart.products.forEach(product => cart.totalPrice += (Number(product.price) * Number(product.quantity)));

    await cart.save();
}

module.exports = {

    addToCart,
    updateCartItem,
    removeCartItem,
    getCartItems
};
