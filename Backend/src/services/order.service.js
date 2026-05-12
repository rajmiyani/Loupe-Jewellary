const mongoose = require('mongoose');
const Address = require('../models/address.model.js');
const Order = require('../models/order.model.js');
const OrderItem = require('../models/orderItems.model.js');
const cartService = require('../services/cart.service.js');

async function createOrder(user, shippAddress) {
    let address;

    if (shippAddress._id) {
        let existAddress = await Address.findById(shippAddress._id);
        address = existAddress;
    }
    else {
        // Deduplication logic: Check if an identical address already exists for this user in memory
        console.log("Checking for existing address among user's saved addresses. Count:", user.address?.length);

        const shippAddr = {
            firstName: shippAddress.firstName?.trim(),
            lastName: shippAddress.lastName?.trim(),
            streetAddress: shippAddress.streetAddress?.trim(),
            city: shippAddress.city?.trim(),
            state: shippAddress.state?.trim(),
            zipCode: String(shippAddress.zipCode || '').trim(),
            mobile: String(shippAddress.mobile || '').trim()
        };

        let existingAddress = user.address.find(addr =>
            addr.firstName?.trim() === shippAddr.firstName &&
            addr.lastName?.trim() === shippAddr.lastName &&
            addr.streetAddress?.trim() === shippAddr.streetAddress &&
            addr.city?.trim() === shippAddr.city &&
            addr.state?.trim() === shippAddr.state &&
            String(addr.zipCode || '').trim() === shippAddr.zipCode &&
            String(addr.mobile || '').trim() === shippAddr.mobile
        );

        if (existingAddress) {
            console.log("Found existing address in memory:", existingAddress._id);
            address = existingAddress;
        } else {
            console.log("No existing address found in memory. Creating new one.");
            address = new Address(shippAddress);
            address.user = user;
            await address.save();

            user.address.push(address);
            await user.save();
        }
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (let item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            weight: item.weight,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice,
        })

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
        user: user._id,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippingAddress: address,
    })

    const savedOrder = await createdOrder.save();

    return savedOrder;
}


// Below methods are for admin
async function placeOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.paymentDetails.paymentStatus = "COMPLETED";

    return await order.save();
}

async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    return await order.save();
}

async function shippedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    return await order.save();
}

async function deliveredOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "DELIVERED";

    return await order.save();
}

async function cancelledOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELED";

    return await order.save();
}

async function findOrderById(orderId) {
    const order = Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")

    return order;
}

async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: new mongoose.Types.ObjectId(userId) })
            .populate({ path: "orderItems", populate: { path: "product" } }).sort({ createdAt: -1 }).lean();

        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllOrders() {
    try {
        return await Order.find()
            .populate({ path: "orderItems", populate: { path: "product" } })
            .populate('user')
            .sort({ createdAt: -1 })
            .lean();
    } catch (error) {
        throw new Error(error);
    }
}

async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shippedOrder,
    deliveredOrder,
    cancelledOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder
}
