

module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert(
			'Schools',
			[
				{
					name: 'School GHI',
					country: 'USA',
					createdAt: new Date(),
					updatedAt: null,
					deletedAt: null,
				},
				{
					name: 'School GHI 2',
					country: 'USA',
					createdAt: new Date(),
					updatedAt: null,
					deletedAt: null,
				},
				{
					name: 'School GHI 3',
					country: 'USA',
					createdAt: new Date(),
					updatedAt: null,
					deletedAt: null,
				},
				{
					name: 'School GHI 4',
					country: 'USA',
					createdAt: new Date(),
					updatedAt: null,
					deletedAt: null,
				},
				{
					name: 'School GHI 5',
					country: 'USA',
					createdAt: new Date(),
					updatedAt: null,
					deletedAt: null,
				},
			],
			{},
		),

	down: queryInterface =>
		queryInterface.bulkDelete('Schools', null, {}),
};
