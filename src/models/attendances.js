module.exports = (sequelize, DataTypes) => {
	const Attendances = sequelize.define(
		'Attendances',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
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
				type: DataTypes.NUMBER,
				allowNull: false,
				references: {
					model: 'Terms',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			attended: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
			deletedAt: DataTypes.DATE,
		},
		{
			paranoid: true,
		},
	);
	Attendances.associate = (models) => {
		// associations can be defined here
		Attendances.belongsTo(models.Students, {
			foreignKey: 'studentId',
			targetKey: 'id',
		});
		Attendances.belongsTo(models.Terms, {
			foreignKey: 'termId',
			targetKey: 'id',
		});
	};
	return Attendances;
};
