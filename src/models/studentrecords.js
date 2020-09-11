module.exports = (sequelize, DataTypes) => {
	const StudentRecords = sequelize.define(
		'StudentRecords',
		{
			studentId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'Students',
					key: 'uid',
				},
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
			termId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Terms',
					key: 'id',
				},
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
			grade: {
				type: DataTypes.STRING(25),
			},
			schoolId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Schools',
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
	StudentRecords.associate = (models) => {
		// associations can be defined here
		StudentRecords.belongsTo(models.Students, {
			foreignKey: 'studentId',
			targetKey: 'uid',
		});
		StudentRecords.belongsTo(models.Terms, {
			foreignKey: 'termId',
			targetKey: 'id',
		});
		StudentRecords.belongsTo(models.Schools, {
			foreignKey: 'schoolId',
			targetKey: 'id',
		});
		StudentRecords.hasMany(models.Courses, {
			as: 'Courses',
			foreignKey: 'recordId',
		});
		StudentRecords.hasMany(models.Exams, {
			as: 'Exams',
			foreignKey: 'recordId',
		});
	};
	return StudentRecords;
};
