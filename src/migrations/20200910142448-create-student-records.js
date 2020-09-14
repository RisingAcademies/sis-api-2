module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('StudentRecords', {
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
				references: {
					model: 'Terms',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			grade: {
				type: Sequelize.STRING(25),
			},
			schoolId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Schools',
					key: 'id',
				},
				onDelete: 'CASCADE',
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
		});
	},
	down: async queryInterface =>
		queryInterface.sequelize
			.query('SET FOREIGN_KEY_CHECKS = 0')
			.then(() =>
				queryInterface.dropTable('StudentRecords')),
	// await queryInterface.dropTable("StudentRecords");
};
