const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      }
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
