module.exports = {
	up: queryInterface =>
		queryInterface.bulkInsert(
			'Terms',
			[
				{
					id: 1,
					name: 'Term 1',
					academicYear: 2020,
				},
			],
			{},
		),

	down: async queryInterface =>
		queryInterface.bulkDelete('Terms', null, {}),
};
