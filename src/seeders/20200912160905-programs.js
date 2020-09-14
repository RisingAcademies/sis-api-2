

module.exports = {
	up: async queryInterface =>
		queryInterface.bulkInsert(
			'Programs',
			[
				{
					id: 1,
					name: 'Program 1',
					countryId: 1,
				},
				{
					id: 2,
					name: 'Program 2',
					countryId: 2,
				},
			],
			{},
		),

	down: async queryInterface =>
		queryInterface.bulkDelete('Programs', null, {}),
};
