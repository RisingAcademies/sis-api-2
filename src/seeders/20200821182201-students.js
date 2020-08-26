module.exports = {
	up: queryInterface =>
	/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		queryInterface.bulkInsert(
			'Students',
			[
				{
					num: 'A001',
					firstname: 'John1',
					lastname: 'Duke1',
					phone: '999999999',
					address: 'S3 and Some streets, some address',
					age: 42,
					mother: 'Mother name',
					father: 'Father name',
					createdAt: new Date(),
					updatedAt: null,
					deletedAt: null,
				},
				{
					num: 'A002',
					firstname: 'John2',
					lastname: 'Duke2',
					phone: '999999999',
					address: 'S3 and Some streets, some address',
					age: 42,
					mother: 'Mother name',
					father: 'Father name',
					createdAt: new Date(),
					updatedAt: null,
					deletedAt: null,
				},
				{
					num: 'A003',
					firstname: 'John3',
					lastname: 'Duke3',
					phone: '999999999',
					address: 'S3 and Some streets, some address',
					age: 42,
					mother: 'Mother name',
					father: 'Father name',
					createdAt: new Date(),
					updatedAt: null,
					deletedAt: null,
				},
				{
					num: 'A004',
					firstname: 'John4',
					lastname: 'Duke4',
					phone: '999999999',
					address: 'S3 and Some streets, some address',
					age: 42,
					mother: 'Mother name',
					father: 'Father name',
					createdAt: new Date(),
					updatedAt: null,
					deletedAt: null,
				},
				{
					num: 'A005',
					firstname: 'John5',
					lastname: 'Duke5',
					phone: '999999999',
					address: 'S3 and Some streets, some address',
					age: 42,
					mother: 'Mother name',
					father: 'Father name',
					createdAt: new Date(),
					updatedAt: null,
					deletedAt: null,
				},
			],
			{},
		),

	down: queryInterface =>
	/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		queryInterface.bulkDelete('Students', null, {}),
};