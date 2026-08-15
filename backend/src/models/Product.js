import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      comment: "Array of image URLs",
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    materials: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "e.g. 22K Gold, Sterling Silver, Pearl",
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

export default Product;
