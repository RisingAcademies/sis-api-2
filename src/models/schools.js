module.exports = (sequelize, DataTypes) => {
	const Schools = sequelize.define(
		'Schools',
		{
			name: DataTypes.STRING,
			countryId: {
				type: DataTypes.NUMBER,
				allowNull: false,
				references: {
					model: 'Counties',
					key: 'id',
				},
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
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
	Schools.associate = (models) => {
		// associations can be defined here
		Schools.belongsToMany(models.Students, {
			through: 'Attendances',
			as: 'Students',
			foreignKey: 'schoolId',
			otherKey: 'studentId',
		});
		Schools.belongsTo(models.Countries, {
			foreignKey: 'countryId',
			targetKey: 'id',
		});
	};
	return Schools;
};
