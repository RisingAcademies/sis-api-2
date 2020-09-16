module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Exams', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			gradeId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Grades',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			recordId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'StudentRecords',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			maxGrade: {
				type: Sequelize.DECIMAL(5, 2),
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
	down: async (queryInterface) => {
		await queryInterface.dropTable('exams');
	},
};
