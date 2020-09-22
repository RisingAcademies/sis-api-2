module.exports = (sequelize, DataTypes) => {
	const Schools = sequelize.define(
		'Schools',
		{
			name: {
				allowNull: false,
				type: DataTypes.STRING(75),
			},
			countryId: {
				type: DataTypes.NUMBER,
				allowNull: false,
				references: {
					model: 'Counties',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			code: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			programId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Programs',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			clusterId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Clusters',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			latitude: {
				type: DataTypes.DECIMAL(10, 8),
			},
			longitude: {
				type: DataTypes.DECIMAL(11, 8),
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
			indexes: [
				{
					unique: false,
					fields: ['name'],
				},
			],
		},
	);
	Schools.associate = (models) => {
		// associations can be defined here
		// Schools.belongsToMany(models.Students, {
		//   through: "Attendances",
		//   as: "Students",
		//   foreignKey: "schoolId",
		//   otherKey: "studentId",
		// });
		Schools.belongsTo(models.Countries, {
			foreignKey: 'countryId',
			targetKey: 'id',
		});
		Schools.belongsTo(models.Programs, {
			foreignKey: 'programId',
			targetKey: 'id',
		});
		Schools.belongsTo(models.Clusters, {
			foreignKey: 'clusterId',
			targetKey: 'id',
		});
		Schools.hasMany(models.StudentRecords, {
			foreignKey: 'schoolId',
		});
	};
	return Schools;
};
