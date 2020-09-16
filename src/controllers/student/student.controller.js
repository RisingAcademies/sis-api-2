import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import path from "path";
/*eslint-disable*/
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
import { successResponse, errorResponse } from "../../helpers";
import padToNumber from "../../helpers/utils";

export const addStudent = async (req, res) => {
  // const t = await sequelize.transaction();

  try {
    const school = Schools.findOne({
      attributes: [
        "id",
        [Sequelize.col("Country.code"), "countryCode"],
        [Sequelize.col("Country.id"), "countryId"],
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
      attributes: ["id"],
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    const getStudentByNum = Students.findOne({
      attributes: ["id"],
      where: {
        num: req.body.num,
      },
      raw: true,
    });

    const studentsData = await Promise.all([
      school,
      getLastRecord,
      getStudentByNum,
    ]);

    if (studentsData[2] !== null) {
      return successResponse(
        req,
        res,
        { message: "Student Id is already exist!" },
        409
      );
    }

    const getProgram = Programs.findOne({
      attributes: ["id"],
      where: {
        countryId: studentsData[0].countryId,
      },
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    const getCluster = Clusters.findOne({
      attributes: ["id"],
      where: {
        countryId: studentsData[0].countryId,
      },
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    const getIds = await Promise.all([getProgram, getCluster]);

    // Creating student unique id : 01200001 = schoolid + registration year + autoincrementing
    req.body.num =
      padToNumber(req.body.schoolId, 2) +
      new Date().getFullYear().toString().substr(-2) +
      padToNumber(studentsData[1].id + 1, 4);

    // Creating unique uid :  SL01200001 =  SL+ program id + cluster id + num
    req.body.uid =
      studentsData[0].countryCode +
      padToNumber(getIds[0].id, 2) +
      padToNumber(getIds[1].id, 3) +
      req.body.num;

    // Appending student records table data
    req.body.StudentRecords = {
      schoolId: req.body.schoolId,
      gradeId: req.body.grade,
    };

    const student = await Students.create(req.body, {
      include: [StudentRecords],
    });

    // await t.commit();

    return successResponse(req, res, student);
  } catch (error) {
    console.error("addStudent -> error", error);
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
      }
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
      { id: "num", title: "Student ID" },
      { id: "firstname", title: "FIRST NAME" },
      { id: "lastname", title: "LAST NAME" },
      { id: "middlename", title: "MIDDLE NAME" },
      { id: "grade", title: "GRADE" },
      { id: "gender", title: "GENDER" },
      { id: "dateofbirth", title: "DATE OF BIRTH" },
      { id: "previousSchool", title: "PREVIOUS SCHOOL" },
      { id: "previousType", title: "PREVIOUS TYPE" },
      { id: "npseYear", title: "NPSE YEAR" },
      { id: "npseScore", title: "NPSE SCORE" },
      { id: "beceYear", title: "BECE YEAR" },
      { id: "beceScore", title: "BECE SCORE" },
      { id: "caregiverFirst", title: "CAREGIVER'S FIRST NAME" },
      { id: "caregiverLast", title: "CAREGIVER'S LAST NAME" },
      { id: "contactnumber", title: "CONTACT NUMBER" },
      { id: "contactnumber2", title: "CONTACT NUMBER 2" },
      { id: "registeredDate", title: "REGISTERED DATE" },
    ];

    const csvWriter = createCsvWriter({
      path: path.join(__dirname, "./../../assets/Csv/students.csv"),
      header: csvHeader,
      alwaysQuote: true,
    });

    const whereCondition = [];

    if (req.query.keyword && req.query.value) {
      if (req.query.keyword === "createdAt") {
        whereCondition.push(
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("Students.createdAt")),
            {
              [Sequelize.Op.like]: `%${req.query.value}%`,
            }
          )
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
        exclude: ["deletedAt", "updatedAt"],
        include: ["StudentRecords.grade"],
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
      order: [[Sequelize.col("StudentRecords.createdAt"), "ASC"]],
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
    console.error("getExportStudents -> error", error);
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
      }
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
      }
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
      attributes: ["id"],
      order: [["createdAt", "DESC"]],
      raw: true,
    });
    return successResponse(req, res, getLastRecord);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
