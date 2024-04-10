const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isValidYear(year) {
          if (year < 1991 || year > Date.getFullYear()) {
            throw new Error("Invalid year")
          }
        }
      }
    },
  },
  {
    sequelize,
    modelName: "blog",
  }
);

module.exports = Blog