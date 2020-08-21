module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define(
    "Students",
    {
      num: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phone: DataTypes.NUMBER,
      address: DataTypes.STRING,
      age: DataTypes.STRING,
      mother: DataTypes.STRING,
      father: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      paranoid: true,
    }
  );
  Students.associate = (models) => {
    // associations can be defined here
    Students.belongsToMany(models.Schools, {
      through: "Attendances",
      as: "Schools",
      foreignKey: "studentId",
      otherKey: "schoolId",
    });
  };
  return Students;
};
