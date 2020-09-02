const { convertToBcrypt } = require('../config/encrypt');

module.exports = {
	up: queryInterface =>
	/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
		queryInterface.bulkInsert(
			'Users',
			[
				{
					id: 1,
					username: 'admin',
					password: convertToBcrypt('Password1!'),
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
				},
			],
			{},
		),

	down: queryInterface =>
	/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
		queryInterface.bulkDelete('Users', null, {}),
};
