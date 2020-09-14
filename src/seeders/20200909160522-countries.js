module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert(
			'Countries',
			[
				{
					id: 1,
					name: 'Sierra Leone',
					code: 'SL',
				},
				{
					id: 2,
					name: 'Liberia',
					code: 'LR',
				},
			],
			{},
		),

	down: async queryInterface =>
		queryInterface.bulkDelete('Countries', null, {}),
};
