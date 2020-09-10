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
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'Students',
					key: 'uid',
				},
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
			termId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Terms',
					key: 'id',
				},
				onDelete: 'restrict',
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
				onDelete: 'restrict',
				onUpdate: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			deletedAt: {
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('StudentRecords');
	},
};
