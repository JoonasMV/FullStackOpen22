const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "token",
  }
);

module.exports = Token;
