module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      "Schools",
      [
        {
          id: 1,
          name: "School GHI",
          country: "USA",
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 2,
          name: "School GHI 2",
          country: "USA",
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 3,
          name: "School GHI 3",
          country: "USA",
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 4,
          name: "School GHI 4",
          country: "USA",
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
        {
          id: 5,
          name: "School GHI 5",
          country: "USA",
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete("Schools", null, {}),
};
