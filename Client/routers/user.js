
const User = require('../../models/menu');
const Order = require('../../models/order');
const express = require('express');

const router = express.Router();

// *******************************************************

router.get('/allMenu', async (req, res) => {
    try {
        const menu = await User.find({});
        res.status(200).send(menu)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
});

// *******************************************************

router.post('/choose', async (req, res) => {
    try {
        const Name = req.body.name;
        const Numbr_order = req.body.numbr_order;

        const choose_order = await User.findOne({ name: Name });

        if (!choose_order) {
            return res.status(404).send('Not Found Name Order');
        }

        const updatedPrice = choose_order.price * Numbr_order;

        const order = new Order({
            name: choose_order.name,
            description: choose_order.description,
            numbr_order :req.body.numbr_order,
            price: updatedPrice,
            category: choose_order.category
        });
        await order.save();

        res.status(200).send({ order });

    } catch (e) {
        res.status(500).send(e.message);
    }
});

// *******************************************************

router.get('/AllOrder', async (req, res) => {
    try {
        const allOrders = await Order.find({});

        let totalPrice = 0;
        allOrders.forEach(order => {
            totalPrice += order.price;
        });

        res.status(200).send({ allOrders , totalPrice  });
    }
    catch (e) {
        res.status(500).send(e.message)
    }
});


// *******************************************************


module.exports = router;