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
					id: 1,
					num: 'A001',
					firstname: 'Brandie',
					lastname: 'Demougeot',
					phone: '0315704993',
					address: '251 Charing Cross Way',
					dob: '2000-02-22',
					mother: 'Gay',
					father: 'Dean',
				},
				{
					id: 2,
					num: 'A002',
					firstname: 'Brenn',
					lastname: 'Churchin',
					phone: '1665804955',
					address: '74 Talmadge Hill',
					dob: '2000-01-22',
					mother: 'Callida',
					father: 'Gilberto',
				},
				{
					id: 3,
					num: 'A003',
					firstname: 'Shanda',
					lastname: 'Landsborough',
					phone: '9351039838',
					address: '5657 Elka Drive',
					dob: '1999-02-22',
					mother: 'Jerrie',
					father: 'Cooper',
				},
				{
					id: 4,
					num: 'A004',
					firstname: 'Fenelia',
					lastname: 'Umbert',
					phone: '2693319048',
					address: '59 East Junction',
					dob: '1995-01-22',
					mother: 'Melanie',
					father: 'Tan',
				},
				{
					id: 5,
					num: 'A005',
					firstname: 'Robers',
					lastname: 'Rowantree',
					phone: '4700703032',
					address: '96369 Fremont Lane',
					dob: '1996-02-22',
					mother: 'Faydra',
					father: 'Abeu',
				},
				{
					id: 6,
					num: 'A006',
					firstname: 'Gracia',
					lastname: 'Lourens',
					phone: '1837981523',
					address: '48 Ronald Regan Way',
					dob: '1998-02-22',
					mother: 'Dorette',
					father: 'Antonino',
				},
				{
					id: 7,
					num: 'A007',
					firstname: 'Sheena',
					lastname: 'Frede',
					phone: '0470049960',
					address: '8 Fieldstone Pass',
					dob: '1998-05-22',
					mother: 'Millicent',
					father: 'Clay',
				},
				{
					id: 8,
					num: 'A008',
					firstname: 'Neile',
					lastname: 'Mattke',
					phone: '7971395337',
					address: '29858 Boyd Trail',
					dob: '1996-03-22',
					mother: 'Petra',
					father: 'Jonathan',
				},
				{
					id: 9,
					num: 'A009',
					firstname: 'Adair',
					lastname: 'Sainter',
					phone: '7195372731',
					address: '61928 Fallview Point',
					dob: '1996-03-25',
					mother: 'Kitty',
					father: 'Linus',
				},
				{
					id: 10,
					num: 'A000',
					firstname: 'Nesta',
					lastname: 'Jost',
					phone: '4389985132',
					address: '4 Shasta Junction',
					dob: '1996-04-22',
					mother: 'Lizette',
					father: 'Mill',
				},
				{
					id: 11,
					num: 'A001',
					firstname: 'Constantine',
					lastname: 'Brumby',
					phone: '6945557995',
					address: '15 Fairfield Hill',
					dob: '1996-03-25',
					mother: 'Madel',
					father: 'Selig',
				},
				{
					id: 12,
					num: 'A002',
					firstname: 'Valeda',
					lastname: 'Romagosa',
					phone: '4879678651',
					address: '98 Old Shore Terrace',
					dob: '1996-05-22',
					mother: 'Alexandrina',
					father: 'Whitaker',
				},
				{
					id: 13,
					num: 'A003',
					firstname: 'Marijo',
					lastname: 'Karmel',
					phone: '3823982605',
					address: '88960 Donald Way',
					dob: '1996-05-22',
					mother: 'Jobi',
					father: 'Sinclare',
				},
				{
					id: 14,
					num: 'A004',
					firstname: 'Kelbee',
					lastname: 'Gawthrop',
					phone: '1961204851',
					address: '25 Pond Lane',
					dob: '1998-03-22',
					mother: 'Morena',
					father: 'Danie',
				},
				{
					id: 15,
					num: 'A005',
					firstname: 'Guntar',
					lastname: 'Fealey',
					phone: '9275108854',
					address: '2806 Carioca Alley',
					dob: '1996-03-26',
					mother: 'Sarene',
					father: 'Paul',
				},
				{
					id: 16,
					num: 'A006',
					firstname: 'Corby',
					lastname: 'Heazel',
					phone: '9564830109',
					address: '894 Tomscot Alley',
					dob: '1996-12-26',
					mother: 'Rosalynd',
					father: 'Scott',
				},
				{
					id: 17,
					num: 'A007',
					firstname: 'Ruttger',
					lastname: 'Farington',
					phone: '3862693341',
					address: '3639 Knutson Pass',
					dob: '1996-12-22',
					mother: 'Bobette',
					father: 'Gino',
				},
				{
					id: 18,
					num: 'A008',
					firstname: 'Filberto',
					lastname: 'Setterfield',
					phone: '2354988303',
					address: '162 Porter Avenue',
					dob: '1996-12-22',
					mother: 'Xena',
					father: 'Eli',
				},
				{
					id: 19,
					num: 'A009',
					firstname: 'Dolley',
					lastname: 'Pleaden',
					phone: '6957119831',
					address: '73875 Roth Road',
					dob: '1996-12-22',
					mother: 'Loutitia',
					father: 'Hewet',
				},
				{
					id: 20,
					num: 'A000',
					firstname: 'Yves',
					lastname: 'Gatheridge',
					phone: '1461663288',
					address: '54321 Acker Alley',
					dob: '1996-12-22',
					mother: 'Emmie',
					father: 'Reginauld',
				},
				{
					id: 21,
					num: 'A001',
					firstname: 'Claribel',
					lastname: 'Toffanelli',
					phone: '2284806953',
					address: '8 Drewry Plaza',
					dob: '1996-03-22',
					mother: 'Lacey',
					father: 'Linoel',
				},
				{
					id: 22,
					num: 'A002',
					firstname: 'Fax',
					lastname: 'Patel',
					phone: '9721643939',
					address: '1837 Emmet Way',
					dob: '1996-11-22',
					mother: 'Darcie',
					father: 'Van',
				},
				{
					id: 23,
					num: 'A003',
					firstname: 'Eachelle',
					lastname: 'Bauldrey',
					phone: '7783702163',
					address: '4 Annamark Way',
					dob: '1996-11-22',
					mother: 'Lane',
					father: 'Wesley',
				},
				{
					id: 24,
					num: 'A004',
					firstname: 'Christi',
					lastname: 'Maven',
					phone: '7099411926',
					address: '0820 Sheridan Terrace',
					dob: '1996-11-22',
					mother: 'Rosita',
					father: 'Brady',
				},
				{
					id: 25,
					num: 'A005',
					firstname: 'Mile',
					lastname: 'Collingwood',
					phone: '0310239044',
					address: '0685 Crescent Oaks Park',
					dob: '1996-10-22',
					mother: 'Harmony',
					father: 'Guss',
				},
				{
					id: 26,
					num: 'A006',
					firstname: 'Carie',
					lastname: 'MacKeever',
					phone: '4288663261',
					address: '398 Ramsey Lane',
					dob: '1996-11-22',
					mother: 'Vere',
					father: 'Aloin',
				},
				{
					id: 27,
					num: 'A007',
					firstname: 'Trumaine',
					lastname: 'Labbez',
					phone: '6801999737',
					address: '30834 Aberg Park',
					dob: '1996-11-22',
					mother: 'Tierney',
					father: 'Giraldo',
				},
				{
					id: 28,
					num: 'A008',
					firstname: 'Lyle',
					lastname: 'Marvell',
					phone: '7249512331',
					address: '294 Hagan Center',
					dob: '1996-02-22',
					mother: 'Isis',
					father: 'Leonhard',
				},
				{
					id: 29,
					num: 'A009',
					firstname: 'Patricia',
					lastname: 'Wharfe',
					phone: '9632529146',
					address: '3045 Brickson Park Avenue',
					dob: '1996-06-22',
					mother: 'Katrinka',
					father: 'Gregorio',
				},
				{
					id: 30,
					num: 'A000',
					firstname: 'Rochell',
					lastname: 'Lauchlan',
					phone: '6577561117',
					address: '3 Dovetail Point',
					dob: '1996-07-22',
					mother: 'Alta',
					father: 'Napoleon',
				},
				{
					id: 31,
					num: 'A001',
					firstname: 'Juieta',
					lastname: 'Rowesby',
					phone: '3759336442',
					address: '9237 Emmet Lane',
					dob: '1996-05-22',
					mother: 'Asia',
					father: 'Dieter',
				},
				{
					id: 32,
					num: 'A002',
					firstname: 'Tiertza',
					lastname: 'Middas',
					phone: '8870220400',
					address: '8 Warner Avenue',
					dob: '1996-09-22',
					mother: 'Shirlee',
					father: 'Scott',
				},
				{
					id: 33,
					num: 'A003',
					firstname: 'Stephana',
					lastname: 'Pacey',
					phone: '3748425929',
					address: '102 Victoria Lane',
					dob: '1996-05-22',
					mother: 'Virgie',
					father: 'Guthrey',
				},
				{
					id: 34,
					num: 'A004',
					firstname: 'Leone',
					lastname: 'Behne',
					phone: '6355219102',
					address: '9 Elgar Avenue',
					dob: '1996-09-22',
					mother: 'Selia',
					father: 'Vachel',
				},
				{
					id: 35,
					num: 'A005',
					firstname: 'Kent',
					lastname: 'Ballinghall',
					phone: '6951613044',
					address: '174 Thierer Park',
					dob: '1996-05-22',
					mother: 'Petronella',
					father: 'Bogart',
				},
				{
					id: 36,
					num: 'A006',
					firstname: 'Torry',
					lastname: 'Lampens',
					phone: '2285757123',
					address: '80404 Manitowish Drive',
					dob: '1996-05-22',
					mother: 'Fawne',
					father: 'Darren',
				},
				{
					id: 37,
					num: 'A007',
					firstname: 'Errick',
					lastname: 'Jumont',
					phone: '3141836361',
					address: '35324 Grayhawk Avenue',
					dob: '1996-03-22',
					mother: 'Jermaine',
					father: 'Kennan',
				},
				{
					id: 38,
					num: 'A008',
					firstname: 'Thaine',
					lastname: 'Weben',
					phone: '2056710579',
					address: '72 Thackeray Trail',
					dob: '1996-03-22',
					mother: 'Dianemarie',
					father: 'Ganny',
				},
				{
					id: 39,
					num: 'A009',
					firstname: 'Harcourt',
					lastname: 'Simonsson',
					phone: '4964860426',
					address: '0 Rockefeller Circle',
					dob: '1996-03-22',
					mother: 'Gilberta',
					father: 'Elisha',
				},
				{
					id: 40,
					num: 'A000',
					firstname: 'Phineas',
					lastname: 'Shirrell',
					phone: '7313799519',
					address: '0640 Mccormick Trail',
					dob: '1996-03-22',
					mother: 'Marillin',
					father: 'Reidar',
				},
				{
					id: 41,
					num: 'A001',
					firstname: 'Sharia',
					lastname: 'Chasmer',
					phone: '3689581583',
					address: '0 Center Plaza',
					dob: '1996-03-22',
					mother: 'Emelia',
					father: 'Aron',
				},
				{
					id: 42,
					num: 'A002',
					firstname: 'Cooper',
					lastname: 'Stuckey',
					phone: '8983768819',
					address: '52032 Steensland Parkway',
					dob: '1996-03-22',
					mother: 'Marlo',
					father: 'Peirce',
				},
				{
					id: 43,
					num: 'A003',
					firstname: 'Barbee',
					lastname: 'Summerill',
					phone: '0570672198',
					address: '5 Weeping Birch Center',
					dob: '1996-03-22',
					mother: 'Valentia',
					father: 'Jedediah',
				},
				{
					id: 44,
					num: 'A004',
					firstname: 'Sinclare',
					lastname: 'Aslott',
					phone: '7918528395',
					address: '55184 Schmedeman Alley',
					dob: '1996-03-22',
					mother: 'Chlo',
					father: 'Claus',
				},
				{
					id: 45,
					num: 'A005',
					firstname: 'Teirtza',
					lastname: 'Krug',
					phone: '2240193077',
					address: '8126 Onsgard Pass',
					dob: '1996-03-22',
					mother: 'Perl',
					father: 'Rogers',
				},
				{
					id: 46,
					num: 'A006',
					firstname: 'Bathsheba',
					lastname: 'Ferriday',
					phone: '8287076374',
					address: '9 Brickson Park Way',
					dob: '1996-03-22',
					mother: 'Laraine',
					father: 'Lazaro',
				},
				{
					id: 47,
					num: 'A007',
					firstname: 'Tera',
					lastname: 'Fossey',
					phone: '1555058019',
					address: '4 Summer Ridge Pass',
					dob: '1996-03-22',
					mother: 'Cyndy',
					father: 'Dionisio',
				},
				{
					id: 48,
					num: 'A008',
					firstname: 'Renaldo',
					lastname: 'Lanktree',
					phone: '7429352200',
					address: '8918 Mockingbird Junction',
					dob: '1996-03-22',
					mother: 'Lauryn',
					father: 'Stavros',
				},
				{
					id: 49,
					num: 'A009',
					firstname: 'Patin',
					lastname: 'Vasenin',
					phone: '8894026752',
					address: '9 High Crossing Road',
					dob: '1996-03-22',
					mother: 'Dela',
					father: 'Walt',
				},
				{
					id: 50,
					num: 'A000',
					firstname: 'Gunner',
					lastname: 'Caudell',
					phone: '1798516225',
					address: '01 Garrison Alley',
					dob: '1996-03-22',
					mother: 'Deeann',
					father: 'Pavel',
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
