module.exports = (sequelize, DataTypes) => {
	const Grades = sequelize.define(
		'Grades',
		{
			name: {
				allowNull: false,
				type: DataTypes.STRING(50),
			},
			countryId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Countries',
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
	Grades.associate = (models) => {
		// associations can be defined here
		Grades.belongsTo(models.Countries, {
			foreignKey: 'countryId',
		});
		Grades.hasMany(models.StudentRecords, {
			foreignKey: 'gradeId',
		});
		Grades.hasMany(models.Courses, {
			foreignKey: 'gradeId',
		});
		Grades.hasMany(models.Exams, {
			foreignKey: 'gradeId',
		});
	};
	return Grades;
};
