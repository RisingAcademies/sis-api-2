module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert(
			'Countries',
			[
				{
					id: 1,
					name: 'Sierra Leone',
				},
				{
					id: 2,
					name: 'Liberia',
				},
			],
			{},
		),

	down: async queryInterface =>
		queryInterface.bulkDelete('Countries', null, {}),
};
