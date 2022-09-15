

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Product.associate = (models) => {
    Product.belongsTo(models.User, { onDelete: "cascade" });
  };

  return Product;
};
