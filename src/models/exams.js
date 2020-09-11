module.exports = (sequelize, DataTypes) => {
	const Exams = sequelize.define(
		'Exams',
		{
			name: {
				allowNull: false,
				type: DataTypes.STRING(50),
			},
			grade: {
				allowNull: false,
				type: DataTypes.DECIMAL(5, 2),
			},
			recordId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'StudentRecords',
					key: 'id',
				},
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
			maxGrade: {
				type: DataTypes.DECIMAL(5, 2),
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
	Exams.associate = (models) => {
		Exams.belongsTo(models.StudentRecords, {
			as: 'StudentRecords',
			foreignKey: 'recordId',
		});
	};
	return Exams;
};
