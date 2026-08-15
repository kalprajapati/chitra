import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "paid", "failed", "refunded"),
      defaultValue: "pending",
    },
    orderStatus: {
      type: DataTypes.ENUM(
        "placed",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled"
      ),
      defaultValue: "placed",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
