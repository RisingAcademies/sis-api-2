import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import path from 'path';
/*eslint-disable*/
import Promise from "bluebird";
import {
  Students,
  StudentRecords,
  Schools,
  Clusters,
  Programs,
  Countries,
  Sequelize,
} from "../../models";
/* eslint-enable */
import { successResponse, errorResponse } from '../../helpers';
import padToNumber from '../../helpers/utils';

const { join } = Promise;

export const addStudent = async (req, res) => {
	try {
		const getSchoolDetails = Schools.findOne({
			attributes: [
				'id',
				[Sequelize.col('Country.code'), 'countryCode'],
				[Sequelize.col('Country.id'), 'countryId'],
			],
			where: {
				id: req.body.schoolId,
			},
			include: {
				model: Countries,
				attributes: [],
			},
			raw: true,
		});

		const getLastRecord = Students.findOne({
			attributes: ['id'],
			order: [['createdAt', 'DESC']],
			raw: true,
		});

		const getStudentByNum = Students.findOne({
			attributes: ['id'],
			where: {
				num: req.body.num,
			},
			raw: true,
		});

		return join(
			getSchoolDetails,
			getLastRecord,
			getStudentByNum,
			(school, lastRecord, studentByNum) => {
				if (studentByNum !== null) {
					return successResponse(
						req,
						res,
						{ message: 'Student Id is already exist!' },
						409,
					);
				}

				const getProgram = Programs.findOne({
					attributes: ['id'],
					where: {
						countryId: school.countryId,
					},
					order: [['createdAt', 'DESC']],
					raw: true,
				});

				const getCluster = Clusters.findOne({
					attributes: ['id'],
					where: {
						countryId: school.countryId,
					},
					order: [['createdAt', 'DESC']],
					raw: true,
				});

				return join(getProgram, getCluster, async (programs, clusters) => {
					// Creating student unique id : 01200001 = schoolid + registration year + autoincrementing
					if (!req.body.num) {
						req.body.num = padToNumber(req.body.schoolId, 2)
              + new Date().getFullYear().toString().substr(-2)
              + padToNumber(lastRecord.id + 1, 4);
					}

					// Creating unique uid :  SL01200001 =  SL+ program id + cluster id + num
					req.body.uid = school.countryCode
            + padToNumber(programs.id, 2)
            + padToNumber(clusters.id, 3)
            + req.body.num;

					// Appending student records table data
					req.body.StudentRecords = {
						schoolId: req.body.schoolId,
						gradeId: req.body.grade,
					};

					const student = await Students.create(req.body, {
						include: [StudentRecords],
					});

					return successResponse(req, res, student);
				});
			},
		);
	} catch (error) {
		console.error('addStudent -> error', error);
		// await t.rollback();
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
				gradeId: req.body.grade,
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
				include: [
					[
						Sequelize.literal(`(
            SELECT 
              name 
            FROM 
              StudentRecords 
            JOIN 
              Grades 
            ON 
              Grades.id = StudentRecords.gradeId 
            WHERE 
              StudentRecords.studentId = Students.id 
            ORDER BY 
              StudentRecords.createdAt DESC LIMIT 1
          )`),
						'latestGrade',
					],
				],
				exclude: ['deletedAt', 'updatedAt'],
			},
			where: whereCondition,
			include: [
				{
					model: StudentRecords,
					attributes: [],
					where: { schoolId: req.params.schoolId },
				},
			],
		});

		students.map((student) => {
			student.grade = student.dataValues.latestGrade;
			return student;
		});

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

export const getStudentLastId = async (req, res) => {
	try {
		const getLastRecord = await Students.findOne({
			attributes: ['id'],
			order: [['id', 'DESC']],
			raw: true,
		});
		console.log('getStudentLastId -> getLastRecord', getLastRecord);
		return successResponse(req, res, getLastRecord);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};
