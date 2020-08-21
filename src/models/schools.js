module.exports = (sequelize, DataTypes) => {
	const Schools = sequelize.define(
		'Schools',
		{
			name: DataTypes.STRING,
			country: DataTypes.STRING,
			deletedAt: DataTypes.DATE,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{},
	);
	Schools.associate = (models) => {
		Schools.belongsToMany(models.Students, {
			through: 'Attendances',
			as: 'Students',
			foreignKey: 'schoolId',
			otherKey: 'studentId',
		});
		// associations can be defined here
	};
	return Schools;
};
