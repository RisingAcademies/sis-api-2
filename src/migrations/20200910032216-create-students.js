module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Students", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uid: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      num: {
        allowNull: false,
        type: Sequelize.STRING(25),
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING(75),
      },
      middlename: {
        type: Sequelize.STRING(75),
        defaultValue: "",
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING(75),
      },
      gender: {
        type: Sequelize.STRING(25),
      },
      dateofbirth: {
        type: Sequelize.DATEONLY,
      },
      previousSchool: {
        type: Sequelize.STRING(80),
      },
      previousType: {
        type: Sequelize.STRING(80),
      },
      npseYear: {
        type: Sequelize.INTEGER,
      },
      npseScore: {
        type: Sequelize.INTEGER,
      },
      beceYear: {
        type: Sequelize.INTEGER,
      },
      beceScore: {
        type: Sequelize.INTEGER,
      },
      caregiverFirst: {
        type: Sequelize.STRING(75),
        defaultValue: "",
      },
      caregiverLast: {
        type: Sequelize.STRING(75),
        defaultValue: "",
      },
      contactnumber: {
        type: Sequelize.STRING(30),
        defaultValue: "",
      },
      contactnumber2: {
        type: Sequelize.STRING(30),
        defaultValue: "",
      },
      registeredDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable("Students"),
};
