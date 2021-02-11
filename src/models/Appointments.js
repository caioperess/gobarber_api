const { Model, DataTypes } = require('sequelize');

class Appointments extends Model {
  static init(sequelize) {
    super.init(
      {
        appointment_id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        modelName: 'appointments',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.users, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  }
}

module.exports = Appointments;
