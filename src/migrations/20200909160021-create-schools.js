module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('Schools', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			countryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Countries',
					key: 'id',
				},
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('NOW()'),
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
			deletedAt: {
				type: Sequelize.DATE,
			},
		}),
	down: queryInterface =>
		queryInterface.dropTable('Schools'),
};
