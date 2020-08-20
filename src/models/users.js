module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define(
		'Users',
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			deletedAt: DataTypes.DATE,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{},
	);
	// eslint-disable-next-line
  Users.associate = function (models) {
		console.log('Users.associate -> models', models);
		// associations can be defined here
	};
	return Users;
};
