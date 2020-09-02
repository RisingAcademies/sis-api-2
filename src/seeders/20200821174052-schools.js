module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Schools",
      [
        {
          id: 1,
          name: "Bison bison",
          country: "Capra ibex",
        },
        {
          id: 2,
          name: "Numida meleagris",
          country: "unavailable",
        },
        {
          id: 3,
          name: "Xenaida galapagoensis",
          country: "Dasyurus viverrinus",
        },
        {
          id: 4,
          name: "Pelecans onocratalus",
          country: "unavailable",
        },
        {
          id: 5,
          name: "Anser anser",
          country: "Cervus canadensis",
        },
        {
          id: 6,
          name: "Cacatua tenuirostris",
          country: "Conolophus subcristatus",
        },
        {
          id: 7,
          name: "Odocoileus hemionus",
          country: "Leptoptilos crumeniferus",
        },
        {
          id: 8,
          name: "Ninox superciliaris",
          country: "Aonyx capensis",
        },
        {
          id: 9,
          name: "Panthera pardus",
          country: "Sciurus niger",
        },
        {
          id: 10,
          name: "Francolinus leucoscepus",
          country: "Recurvirostra avosetta",
        },
        {
          id: 11,
          name: "Oreamnos americanus",
          country: "Streptopelia decipiens",
        },
        {
          id: 12,
          name: "Phalaropus lobatus",
          country: "Speothos vanaticus",
        },
        {
          id: 13,
          name: "Dasyurus viverrinus",
          country: "Phalacrocorax carbo",
        },
        {
          id: 14,
          name: "Haliaetus leucogaster",
          country: "Dendrocitta vagabunda",
        },
        {
          id: 15,
          name: "Pelecanus conspicillatus",
          country: "Odocoilenaus virginianus",
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("Schools", null, {}),
};
