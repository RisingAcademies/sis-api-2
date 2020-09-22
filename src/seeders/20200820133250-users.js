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
					password: convertToBcrypt('!yNzK&xWTm'),
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
				},
				{
					id: 2,
					username: 'Amos',
					password: convertToBcrypt('Lr!-?^Q!+F'),
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
				},
				{
					id: 3,
					username: 'Kanu',
					password: convertToBcrypt('*zkcHgXTNG'),
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
				},
				{
					id: 4,
					username: 'Rufus',
					password: convertToBcrypt('#&hwgcGQqC'),
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
