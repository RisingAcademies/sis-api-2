import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import path from 'path';
/*eslint-disable*/
import {
  Students,
  StudentRecords,
  Schools,
  Countries,
  sequelize,
  Sequelize,
} from "../../models";
/* eslint-enable */
import { successResponse, errorResponse } from '../../helpers';

export const addStudent = async (req, res) => {
	const t = await sequelize.transaction();

	try {
		const school = await Schools.findOne({
			attributes: ['id', [Sequelize.col('Country.code'), 'countryCode']],
			where: {
				id: req.body.schoolId,
			},
			include: {
				model: Countries,
				attributes: [],
			},
			raw: true,
		});

		// Creating unique uid
		req.body.uid = `${school.countryCode}-${req.body.schoolId}-${
			req.body.num
		}-${new Date().getFullYear()}`;

		// Appending student records table data
		req.body.StudentRecords = {
			schoolId: req.body.schoolId,
			grade: req.body.grade,
		};

		const student = await Students.create(req.body, {
			include: [StudentRecords],
			transaction: t,
		});

		await t.commit();

		return successResponse(req, res, student);
	} catch (error) {
		console.error('addStudent -> error', error);
		await t.rollback();
		return errorResponse(req, res, error.message);
	}
};

export const editStudent = async (req, res) => {
	try {
		const student = Students.update(req.body, {
			where: {
				id: req.body.id,
			},
		});
		const attendance = StudentRecords.update(
			{
				grade: req.body.grade,
			},
			{
				where: {
					id: req.body.recordId,
				},
			},
		);
		await Promise.all([student, attendance]);
		return successResponse(req, res);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const getExportStudents = async (req, res) => {
	try {
		const csvHeader = [
			{ id: 'num', title: 'Student ID' },
			{ id: 'firstname', title: 'FIRST NAME' },
			{ id: 'lastname', title: 'LAST NAME' },
			{ id: 'middlename', title: 'MIDDLE NAME' },
			{ id: 'grade', title: 'GRADE' },
			{ id: 'gender', title: 'GENDER' },
			{ id: 'dateofbirth', title: 'DATE OF BIRTH' },
			{ id: 'previousSchool', title: 'PREVIOUS SCHOOL' },
			{ id: 'previousType', title: 'PREVIOUS TYPE' },
			{ id: 'npseYear', title: 'NPSE YEAR' },
			{ id: 'npseScore', title: 'NPSE SCORE' },
			{ id: 'beceYear', title: 'BECE YEAR' },
			{ id: 'beceScore', title: 'BECE SCORE' },
			{ id: 'caregiverFirst', title: "CAREGIVER'S FIRST NAME" },
			{ id: 'caregiverLast', title: "CAREGIVER'S LAST NAME" },
			{ id: 'contactnumber', title: 'CONTACT NUMBER' },
			{ id: 'contactnumber2', title: 'CONTACT NUMBER 2' },
			{ id: 'registeredDate', title: 'REGISTERED DATE' },
		];

		const csvWriter = createCsvWriter({
			path: path.join(__dirname, './../../assets/Csv/students.csv'),
			header: csvHeader,
			alwaysQuote: true,
		});

		const whereCondition = [];

		if (req.query.keyword && req.query.value) {
			if (req.query.keyword === 'createdAt') {
				whereCondition.push(
					Sequelize.where(
						Sequelize.fn('YEAR', Sequelize.col('Students.createdAt')),
						{
							[Sequelize.Op.like]: `%${req.query.value}%`,
						},
					),
				);
			} else {
				whereCondition.push({
					[req.query.keyword]: {
						[Sequelize.Op.like]: `%${req.query.value}%`,
					},
				});
			}
		}

		const students = await Students.findAll({
			attributes: {
				exclude: ['deletedAt', 'updatedAt'],
				include: ['StudentRecords.grade'],
			},
			distinct: true,
			where: whereCondition,
			include: [
				{
					model: StudentRecords,
					attributes: [],
					where: { schoolId: req.params.schoolId },
				},
			],
			order: [[Sequelize.col('StudentRecords.createdAt'), 'ASC']],
			// group: [Sequelize.col('StudentRecords.studentId')],
			raw: true,
			subQuery: false,
		});

		/*


		*/
		// const latestRecords = await StudentRecords.findAll({
		//   attributes: [
		//     Sequelize.fn("max", Sequelize.col("StudentRecords.id")),
		//     "id",
		//   ],
		//   where: { schoolId: req.params.schoolId },
		//   group: ["studentId"],
		//   raw: true,
		// });
		// const latestRecordIds = latestRecords.map((records) => records.id);
		// console.log("getExportStudents -> latestRecordIds", latestRecordIds);
		// // console.log("getExportStudents -> latestRecordIds", latestRecordIds);
		// const students = await StudentRecords.findAll({
		//   attributes: [
		//     "id",
		//     "grade",
		//     "Student.num",
		//     "Student.firstname",
		//     "Student.lastname",
		//     "Student.middlename",
		//   ],
		//   where: {
		//     id: {
		//       [Sequelize.Op.in]: latestRecordIds,
		//     },
		//   },
		//   include: [
		//     {
		//       model: Students,
		//       attributes: [],
		//       where: whereCondition,
		//     },
		//   ],
		//   order: [[Sequelize.col("studentrecords.createdAt"), "DESC"]],
		//   raw: true,
		// });

		await csvWriter.writeRecords(students);
		return successResponse(req, res, {
			// eslint-disable-next-line
      csv_url: `http://${req.headers["host"]}/src/assets/Csv/students.csv`,
		});
	} catch (error) {
		console.error('getExportStudents -> error', error);
		return errorResponse(req, res, error.message);
	}
};

export const registerStudent = async (req, res) => {
	try {
		await Students.update(
			{
				registeredDate: new Date(),
			},
			{
				where: {
					id: req.params.id,
				},
			},
		);
		return successResponse(req, res);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const unregisterStudent = async (req, res) => {
	try {
		await Students.update(
			{
				registeredDate: null,
			},
			{
				where: {
					id: req.params.id,
				},
			},
		);
		return successResponse(req, res);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const deleteStudent = async (req, res) => {
	try {
		await Students.destroy({
			where: {
				id: req.params.id,
			},
		});
		return successResponse(req, res);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};
