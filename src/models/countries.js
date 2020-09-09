module.exports = (sequelize, DataTypes) => {
	const Countries = sequelize.define(
		'Countries',
		{
			name: DataTypes.STRING,
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
	Countries.associate = (models) => {
		// associations can be defined here
		Countries.hasMany(models.Schools, {
			as: 'Schools',
			foreignKey: 'countryId',
		});
	};
	return Countries;
};
