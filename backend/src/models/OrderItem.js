import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: "Price at time of purchase (snapshot)",
    },
  },
  {
    tableName: "order_items",
    timestamps: false,
  }
);

export default OrderItem;
