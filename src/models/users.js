module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
      updatedAt: DataTypes.DATE,
    },
    {
      paranoid: true,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withSecretColumns: {
          attributes: { include: ["password"] },
        },
      },
    }
  );
  // eslint-disable-next-line
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
