module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('Attendances', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			studentId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Students',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			termId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Terms',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			attended: {
				type: Sequelize.DATE,
				allowNull: false,
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
		queryInterface.dropTable('Attendances'),
};
