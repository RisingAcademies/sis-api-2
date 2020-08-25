module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('Students', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			num: {
				type: Sequelize.STRING,
			},
			firstname: {
				type: Sequelize.STRING,
			},
			lastname: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.INTEGER,
			},
			address: {
				type: Sequelize.STRING,
			},
			age: {
				type: Sequelize.STRING,
			},
			mother: {
				type: Sequelize.STRING,
			},
			father: {
				type: Sequelize.STRING,
			},
			registeredDate: {
				type: Sequelize.DATE,
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
		queryInterface.dropTable('Students'),
};
