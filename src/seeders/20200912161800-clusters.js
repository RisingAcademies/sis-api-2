

module.exports = {
	up: async queryInterface =>
		queryInterface.bulkInsert(
			'Clusters',
			[
				{
					id: 1,
					name: 'Cluster 1',
					spm: 'spm',
					countryId: 1,
				},
				{
					id: 2,
					name: 'Cluster 2',
					spm: 'spm',
					countryId: 2,
				},
			],
			{},
		),

	down: async queryInterface =>
		queryInterface.bulkDelete('Clusters', null, {}),
};
