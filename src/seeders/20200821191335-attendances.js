module.exports = {
  up: queryInterface =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    queryInterface.bulkInsert(
      "Attendances",
      [
        {
          id: 1,
          studentId: 1,
          schoolId: 1,
          grade: "A",
          percentage: 95,
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 2,
          studentId: 2,
          schoolId: 1,
          grade: "A",
          percentage: 95,
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 3,
          studentId: 2,
          schoolId: 1,
          grade: "A",
          percentage: 95,
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 4,
          studentId: 2,
          schoolId: 1,
          grade: "A",
          percentage: 95,
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      ],
      {}
    ),

  down: queryInterface =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    queryInterface.bulkDelete("Attendances", null, {}),
};
