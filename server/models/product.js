'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    sku: DataTypes.STRING,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    barcode: DataTypes.STRING,
    product_unit: DataTypes.NUMBER,
    sale_unit: DataTypes.NUMBER,
    purchase_unit: DataTypes.STRING,
    quantity: DataTypes.NUMBER,
    notes: DataTypes.STRING,
    status: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};