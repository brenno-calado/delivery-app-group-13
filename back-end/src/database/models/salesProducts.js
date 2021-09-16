module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', 
  {
    quantity: DataTypes.INTEGER,
  },
  { underscored: true, timestamps: false, tableName: 'salesProducts' });
  
  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      through: SaleProduct, as: 'sales', foreignKey: 'productId', otherKey: 'saleId',
    });

    models.Sale.belongsToMany(models.Product, {
      through: SaleProduct, as: 'products', foreignKey: 'saleId', otherKey: 'productId',
    });
  };

  return SaleProduct;
};