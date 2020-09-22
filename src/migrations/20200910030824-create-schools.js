module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface
			.createTable('Schools', {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				name: {
					allowNull: false,
					type: Sequelize.STRING(75),
				},
				countryId: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'Countries',
						key: 'id',
					},
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
				code: {
					allowNull: false,
					type: Sequelize.INTEGER,
				},
				programId: {
					type: Sequelize.INTEGER,
					references: {
						model: 'Programs',
						key: 'id',
					},
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
				clusterId: {
					type: Sequelize.INTEGER,
					references: {
						model: 'Clusters',
						key: 'id',
					},
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				},
				latitude: {
					type: Sequelize.DECIMAL(10, 8),
				},
				longitude: {
					type: Sequelize.DECIMAL(11, 8),
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
			})
			.then(() =>
				queryInterface.addIndex('Schools', ['name'])),
	down: queryInterface =>
		queryInterface.dropTable('Schools'),
};
