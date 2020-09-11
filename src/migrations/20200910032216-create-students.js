module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('Students', {
			uid: {
				primaryKey: true,
				allowNull: false,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			num: {
				allowNull: false,
				type: Sequelize.STRING(25),
			},
			firstname: {
				allowNull: false,
				type: Sequelize.STRING(75),
			},
			middlename: {
				allowNull: false,
				type: Sequelize.STRING(75),
			},
			lastname: {
				allowNull: false,
				type: Sequelize.STRING(75),
			},
			gender: {
				type: Sequelize.STRING(25),
			},
			dateofbirth: {
				type: Sequelize.DATEONLY,
			},
			previousSchool: {
				type: Sequelize.STRING(80),
			},
			previousType: {
				type: Sequelize.STRING(80),
			},
			npseYear: {
				type: Sequelize.INTEGER,
			},
			npseScore: {
				type: Sequelize.INTEGER,
			},
			beceYear: {
				type: Sequelize.INTEGER,
			},
			beceScore: {
				type: Sequelize.INTEGER,
			},
			caregiverFirst: {
				type: Sequelize.STRING(75),
			},
			caregiverLast: {
				type: Sequelize.STRING(75),
			},
			contactnumber: {
				type: Sequelize.STRING(30),
			},
			contactnumber2: {
				type: Sequelize.STRING(30),
			},
			registeredDate: {
				type: Sequelize.DATE,
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
		queryInterface.dropTable('Students'),
};
