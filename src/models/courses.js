module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define(
    "Courses",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      grade: {
        type: DataTypes.STRING(25),
      },
      termId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Terms",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      recordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "StudentRecords",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      deletedAt: DataTypes.DATE,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
      updatedAt: DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );
  Courses.associate = models => {
    // associations can be defined here
    Courses.belongsTo(models.Terms, {
      as: "Terms",
      foreignKey: "termId",
    });
    Courses.belongsTo(models.StudentRecords, {
      as: "StudentRecords",
      foreignKey: "recordId",
    });
  };
  return Courses;
};
