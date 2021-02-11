module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('appointments', {
      appointment_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      provider_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'user_id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('appointments');
  },
};
