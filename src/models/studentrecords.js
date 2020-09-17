module.exports = (sequelize, DataTypes) => {
	const StudentRecords = sequelize.define(
		'StudentRecords',
		{
			studentId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Students',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			termId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Terms',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			gradeId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Grades',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			schoolId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Schools',
					key: 'id',
				},
				onDelete: 'CASCADE',
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
			targetKey: 'id',
		});
		StudentRecords.belongsTo(models.Terms, {
			foreignKey: 'termId',
			targetKey: 'id',
		});
		StudentRecords.belongsTo(models.Grades, {
			foreignKey: 'gradeId',
			targetKey: 'id',
		});
		StudentRecords.belongsTo(models.Schools, {
			foreignKey: 'schoolId',
			targetKey: 'id',
		});
		StudentRecords.hasMany(models.Courses, {
			foreignKey: 'recordId',
		});
		StudentRecords.hasMany(models.Exams, {
			foreignKey: 'recordId',
		});
	};
	return StudentRecords;
};
