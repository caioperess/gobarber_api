const { Model, DataTypes } = require('sequelize');

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        modelName: 'users',
      }
    );
  }

  static associate(models) {}
}

module.exports = Users;
