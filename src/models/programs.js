module.exports = (sequelize, DataTypes) => {
  const Programs = sequelize.define(
    "Programs",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Countries",
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
  Programs.associate = models => {
    // associations can be defined here
    Programs.belongsTo(models.Countries, {
      foreignKey: "countryId",
      targetKey: "id",
    });
    Programs.hasMany(models.Schools, {
      as: "Schools",
      foreignKey: "programId",
    });
  };
  return Programs;
};
