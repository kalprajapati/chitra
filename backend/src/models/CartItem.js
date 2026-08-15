import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
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
  },
  {
    tableName: "cart_items",
    timestamps: false,
  }
);

export default CartItem;
