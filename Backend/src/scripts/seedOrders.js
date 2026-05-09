const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const Order = require('../models/order.model');
const OrderItem = require('../models/orderItems.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Address = require('../models/address.model');

const createAddress = async (user) => {
    let address = await Address.findOne({ user: user._id });
    if (!address) {
        address = await Address.create({
            firstName: user.firstName,
            lastName: user.lastName,
            streetAddress: "123 Diamond Avenue",
            city: "Mumbai",
            state: "Maharashtra",
            zipCode: "400001",
            user: user._id,
            mobile: "9876543210"
        });
        user.address.push(address);
        await user.save();
    }
    return address;
};

const run = async () => {
    try {
        await connectDB();
        console.log('Connected to DB');

        // Delete all existing orders and order items
        await Order.deleteMany({});
        await OrderItem.deleteMany({});
        console.log('Deleted all existing orders and items');

        let users = await User.find({});
        if (users.length === 0) {
            const user = await User.create({
                firstName: "Guest",
                lastName: "User",
                email: "guest@example.com",
                password: "password123",
                role: "CUSTOMER",
                address: [],
                paymentInformation: [],
                ratings: [],
                reviews: []
            });
            users = [user];
        }

        const products = await Product.find({}).limit(15);
        if (products.length === 0) {
            console.log("No products available to create orders.");
            process.exit(1);
        }

        const statuses = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];

        // Create 15 new orders
        for (let i = 0; i < 15; i++) {
            const user = users[i % users.length];
            const address = await createAddress(user);

            const numItems = Math.floor(Math.random() * 3) + 1;
            const newOrderItems = [];
            let totalPrice = 0;
            let totalDiscountedPrice = 0;
            let totalItem = 0;

            for (let j = 0; j < numItems; j++) {
                const product = products[Math.floor(Math.random() * products.length)];
                const quantity = Math.floor(Math.random() * 2) + 1;
                const price = product.price * quantity || 1000 * quantity;
                const discountedPrice = product.discountedPrice * quantity || 800 * quantity;

                const orderItem = await OrderItem.create({
                    product: product._id,
                    weight: "5g",
                    size: "Standard",
                    quantity,
                    price,
                    discountedPrice,
                    userId: user._id
                });
                newOrderItems.push(orderItem._id);
                totalPrice += price;
                totalDiscountedPrice += discountedPrice;
                totalItem += quantity;
            }

            const discount = ((totalPrice - totalDiscountedPrice) / totalPrice) * 100;
            const orderStatus = statuses[Math.floor(Math.random() * statuses.length)];

            await Order.create({
                user: user._id,
                orderItems: newOrderItems,
                orderDate: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000), // random past date
                shippingAddress: address._id,
                paymentDetails: {
                    paymentMethod: i % 2 === 0 ? "CARD" : "UPI",
                    paymentStatus: orderStatus === "DELIVERED" ? "COMPLETED" : "PENDING",
                },
                totalPrice,
                totalDiscountedPrice,
                discount: Math.round(discount) || 0,
                orderStatus,
                totalItem
            });
        }

        console.log("Successfully seeded 15 new orders!");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

run();
