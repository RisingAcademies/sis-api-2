module.exports = {
	up: async queryInterface =>
		queryInterface.bulkInsert(
			'Grades',
			[
				{
					id: 1,
					name: 'Nursery',
					countryId: 1,
				},
				{
					id: 2,
					name: 'Class 1',
					countryId: 1,
				},
				{
					id: 3,
					name: 'Class 2',
					countryId: 1,
				},
				{
					id: 4,
					name: 'Class 3',
					countryId: 1,
				},
				{
					id: 5,
					name: 'Class 4',
					countryId: 1,
				},
				{
					id: 6,
					name: 'Class 5',
					countryId: 1,
				},
				{
					id: 7,
					name: 'Class 6',
					countryId: 1,
				},
				{
					id: 8,
					name: 'JSS 1',
					countryId: 1,
				},
				{
					id: 9,
					name: 'JSS 2',
					countryId: 1,
				},
				{
					id: 10,
					name: 'JSS 3',
					countryId: 1,
				},
				{
					id: 11,
					name: 'SSS 1',
					countryId: 1,
				},
				{
					id: 12,
					name: 'SSS 2',
					countryId: 1,
				},
				{
					id: 13,
					name: 'SSS 3',
					countryId: 1,
				},
				{
					id: 14,
					name: 'ABC',
					countryId: 2,
				},
				{
					id: 15,
					name: 'K1',
					countryId: 2,
				},
				{
					id: 16,
					name: 'K2',
					countryId: 2,
				},
				{
					id: 17,
					name: 'Class 1',
					countryId: 2,
				},
				{
					id: 18,
					name: 'Class 2',
					countryId: 2,
				},
				{
					id: 19,
					name: 'Class 3',
					countryId: 2,
				},
				{
					id: 20,
					name: 'Class 4',
					countryId: 2,
				},
				{
					id: 21,
					name: 'Class 5',
					countryId: 2,
				},
				{
					id: 22,
					name: 'Class 6',
					countryId: 2,
				},
				{
					id: 23,
					name: 'JHS 1',
					countryId: 2,
				},
				{
					id: 24,
					name: 'JHS 2',
					countryId: 2,
				},
				{
					id: 25,
					name: 'JHS 3',
					countryId: 2,
				},
				{
					id: 26,
					name: 'SHS 1',
					countryId: 2,
				},
				{
					id: 27,
					name: 'SHS 2',
					countryId: 2,
				},
				{
					id: 28,
					name: 'SHS 3',
					countryId: 2,
				},
			],
			{},
		),

	down: async queryInterface =>
		queryInterface.bulkDelete('Grades', null, {}),
};
