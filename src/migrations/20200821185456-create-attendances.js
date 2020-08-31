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
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
			schoolId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Schools',
					key: 'id',
				},
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
			grade: {
				type: Sequelize.STRING,
			},
			percentage: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
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
