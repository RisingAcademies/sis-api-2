module.exports = (sequelize, DataTypes) => {
	const Students = sequelize.define(
		'Students',
		{
			num: DataTypes.STRING,
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING,
			phone: DataTypes.STRING,
			address: DataTypes.STRING,
			age: DataTypes.STRING,
			mother: DataTypes.STRING,
			father: DataTypes.STRING,
			registeredDate: DataTypes.DATE,
			deletedAt: DataTypes.DATE,
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal('NOW()'),
			},
			updatedAt: DataTypes.DATE,
		},
		{
			paranoid: true,
		},
	);
	Students.associate = (models) => {
		// associations can be defined here
		Students.belongsToMany(models.Schools, {
			through: 'Attendances',
			as: 'Schools',
			foreignKey: 'studentId',
			otherKey: 'schoolId',
		});
	};
	return Students;
};
