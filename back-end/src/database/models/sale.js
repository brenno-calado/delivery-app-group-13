module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    total_price: DataTypes.DOUBLE,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    status: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    updated_At: DataTypes.DATE,
  }, { timestamp: false });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'user_id'});
    Sale.belongsTo(models.User, { as: 'seller', foreignKey: 'seller_id'});
  };
  
  return Sale;
};
