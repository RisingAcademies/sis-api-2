module.exports = (sequelize, DataTypes) => {
	const Attendances = sequelize.define(
		'Attendances',
		{
			studentId: {
				type: DataTypes.NUMBER,
				allowNull: false,
				references: {
					model: 'Students',
					key: 'id',
				},
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
			schoolId: {
				type: DataTypes.NUMBER,
				allowNull: false,
				references: {
					model: 'Schools',
					key: 'id',
				},
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
			grade: DataTypes.STRING,
			percentage: DataTypes.NUMBER,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
			deletedAt: DataTypes.DATE,
		},
		{},
	);
	Attendances.associate = (models) => {
		// associations can be defined here
		Attendances.belongsTo(models.Students, {
			foreignKey: 'studentId',
			targetKey: 'id',
		});
		Attendances.belongsTo(models.Schools, {
			foreignKey: 'schoolId',
			targetKey: 'id',
		});
	};
	return Attendances;
};
