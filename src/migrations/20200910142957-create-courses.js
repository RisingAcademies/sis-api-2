module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      grade: {
        type: Sequelize.STRING(25),
      },
      termId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Terms",
          key: "id",
        },
        onDelete: "restrict",
        onUpdate: "CASCADE",
      },
      recordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "StudentRecords",
          key: "id",
        },
        onDelete: "restrict",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Courses");
  },
};
