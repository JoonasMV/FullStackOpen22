const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("tokens",   {
      id: {
        type: DataTypes.TEXT,
        primaryKey: true,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },)
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("tokens")
  },
};
