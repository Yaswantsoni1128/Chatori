import {Orders} from "../models/orders.model.js";
import {Cart} from "../models/cart.model.js";

export const ordersController = {
  placeOrder: async (req, res) => {
    try {
      const { userId, paymentMethod, deliveryAddress } = req.body;

      // fetch user's cart
      const cart = await Cart.findOne({ userId }).populate("items.foodId");

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
      }

      // prepare items for order
      const orderItems = cart.items.map((item) => ({
        foodId: item.foodId._id,
        quantity: item.quantity,
        price: item.foodId.price,
      }));

      // calculate total
      const totalAmount = orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // create order
      const newOrder = new Orders({
        userId,
        items: orderItems,
        paymentMethod,
        deliveryAddress,
        totalAmount,
        status: "pending",
      });

      await newOrder.save();

      // clear cart
      cart.items = [];
      await cart.save();

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: newOrder,
      });
    } catch (error) {
      res.status(500).json({ message: "Error placing order", error: error.message });
    }
  },

  getOrdersByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await Orders.find({ userId })
        .populate("items.foodId")
        .sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user orders", error: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Orders.find()
        .populate("items.foodId")
        .populate("userId", "name email")
        .sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      res.status(500).json({ message: "Error fetching all orders", error: error.message });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await Orders.findByIdAndUpdate(orderId, { status }, { new: true });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ success: true, message: "Order updated", data: order });
    } catch (error) {
      res.status(500).json({ message: "Error updating order", error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Orders.findById(orderId)
        .populate("userId", "name email")
        .populate("items.foodId");
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ success: true, message: "Order fetched", data: order });
    } catch (error) {
      res.status(500).json({ message: "Error fetching order", error: error.message });
    }
  },
};
