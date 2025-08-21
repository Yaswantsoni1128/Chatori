import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";

export const cartController = {
  addToCart: async (req, res) => {
    try {
      const { userId, foodId, quantity } = req.body;
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({
          userId: userId,
          items: [{ foodId, quantity }],
        });
      } else {
        const itemIndex = cart.items.findIndex(
          (item) => item.foodId.toString() === foodId.toString()
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ foodId, quantity });
        }
      }

      await cart.save();
      res.status(200).json({
        success: true,
        message: "Item added to cart",
        data: cart,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  getCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ userId }).populate("items.foodId");

      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json({
        success: true,
        message: "Cart Fetched successfully",
        data: cart,
      });
    } catch (error) {
      console.error("Error retrieving cart:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  removeFromCart: async (req, res) => {
    try {
      const { userId, foodId, quantity } = req.body;

      const cart = await Cart.findOne({ userId });

      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
      }

      const itemIndex = cart.items.findIndex(
        (item) => item.foodId.toString() === foodId.toString()
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
      } else {
        cart.items.splice(itemIndex, 1); 
      }
      await cart.save();

      res.status(200).json({
        success: true,
        message: "Item removed from cart",
        data: cart,
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  clearCart: async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.items = [];
      await cart.save();

      res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
        data: cart,
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  getBillSummary: async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await Cart.findOne({ userId }).populate("items.foodId");

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const billSummary = cart.items.map((item) => {
        const food = item.foodId;
        const price = food.price;
        const totalPrice = price * item.quantity;

        return {
          name: food.name,
          quantity: item.quantity,
          price: price,
          totalPrice: totalPrice,
        };
      });

      const grandTotal = billSummary.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );

      res.status(200).json({
        success: true,
        message: "Bill summary fetched successfully",
        data: {
          items: billSummary,
          grandTotal: grandTotal,
        },
      });
    } catch (error) {
      console.error("Error fetching bill summary:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
};
