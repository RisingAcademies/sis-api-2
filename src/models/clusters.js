module.exports = (sequelize, DataTypes) => {
  const Clusters = sequelize.define(
    "Clusters",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      spm: {
        type: DataTypes.STRING(100),
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
  Clusters.associate = models => {
    // associations can be defined here
    Clusters.belongsTo(models.Countries, {
      foreignKey: "countryId",
      targetKey: "id",
    });
    Clusters.hasMany(models.Schools, {
      as: "Schools",
      foreignKey: "clusterId",
    });
  };
  return Clusters;
};
