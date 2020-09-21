module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define(
    "Students",
    {
      uid: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      num: {
        allowNull: false,
        type: DataTypes.STRING(25),
      },
      firstname: {
        allowNull: false,
        type: DataTypes.STRING(75),
      },
      middlename: {
        allowNull: false,
        type: DataTypes.STRING(75),
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING(75),
      },
      gender: DataTypes.STRING(25),
      dateofbirth: DataTypes.DATEONLY,
      previousSchool: DataTypes.STRING(80),
      previousType: DataTypes.STRING(80),
      npseYear: DataTypes.INTEGER,
      npseScore: DataTypes.INTEGER,
      beceYear: DataTypes.INTEGER,
      beceScore: DataTypes.INTEGER,
      caregiverFirst: DataTypes.STRING(75),
      caregiverLast: DataTypes.STRING(75),
      contactnumber: DataTypes.STRING(30),
      contactnumber2: DataTypes.STRING(30),
      registeredDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
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
      indexes: [
        {
          unique: false,
          fields: ["lastname"],
        },
      ],
    }
  );
  Students.associate = (models) => {
    // associations can be defined here
    // Students.belongsToMany(models.Schools, {
    //   through: "Attendances",
    //   as: "Schools",
    //   foreignKey: "studentId",
    //   otherKey: "schoolId",
    // });
    Students.hasMany(models.StudentRecords, {
      foreignKey: "studentId",
    });
  };
  return Students;
};
