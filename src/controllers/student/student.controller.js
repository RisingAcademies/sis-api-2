import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import path from "path";
// eslint-disable-next-line
import { Students, Attendances, Schools, sequelize } from "../../models";
import { successResponse, errorResponse } from "../../helpers";

export const getStudentById = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["deletedAt"] },
      include: [
        {
          model: Schools,
          as: "Schools",
          attributes: ["id", "name"],
        },
      ],
    });
    return successResponse(req, res, student);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addStudent = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const student = await Students.create(req.body, { transaction: t });
    const attendances = await Attendances.create(
      {
        schoolId: req.body.schoolId,
        studentId: student.id,
      },
      { transaction: t }
    );
    await t.commit();

    return successResponse(req, res, attendances);
  } catch (error) {
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
    const attendance = Attendances.update(
      {
        grade: req.body.grade,
      },
      {
        where: {
          id: req.body.attendanceId,
        },
      }
    );
    await Promise.all([student, attendance]);
    return successResponse(req, res);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getSearchStudents = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const whereCondition = [];

  if (req.query.keyword === "createdAt") {
    whereCondition.push(
      sequelize.where(
        sequelize.fn("YEAR", sequelize.col("Students.createdAt")),
        req.query.value
      )
    );
  } else {
    whereCondition.push({
      [req.query.keyword]: {
        [sequelize.Op.like]: `%${req.query.value}%`,
      },
    });
  }

  try {
    const students = await Students.findAndCountAll({
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      where: whereCondition,
      include: [
        {
          model: Schools,
          as: "Schools",
          attributes: ["id", "name"],
          where: { id: req.query.schoolId },
        },
      ],
      order: [["createdAt", "DESC"]],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, students);
  } catch (error) {
    console.log("getSearchStudents -> error", error);
    return errorResponse(req, res, error.message);
  }
};

export const getExportStudents = async (req, res) => {
  try {
    const csvHeader = [
      { id: "num", title: "NUMBER" },
      { id: "firstname", title: "FIRST NAME" },
      { id: "lastname", title: "LAST NAME" },
      { id: "phone", title: "PHONE NUMBER" },
      { id: "address", title: "ADDRESS" },
      { id: "age", title: "AGE" },
      { id: "mother", title: "MOTHER" },
      { id: "father", title: "FATHER" },
    ];

    const csvWriter = createCsvWriter({
      path: path.join(__dirname, "./../../assets/Csv/students.csv"),
      header: csvHeader,
      alwaysQuote: true,
    });

    const whereCondition = [];
    if (req.query.keyword && req.query.value) {
      whereCondition.push({
        [req.query.keyword]: {
          [sequelize.Op.like]: `%${req.query.value}%`,
        },
      });
    }

    const students = await Students.findAll({
      attributes: { exclude: ["deletedAt", "updatedAt"] },
      where: whereCondition,
      include: [
        {
          model: Schools,
          as: "Schools",
          attributes: ["id", "name"],
          where: { id: req.params.schoolId },
        },
      ],
    });

    await csvWriter.writeRecords(students);
    console.log("getExportStudents -> req", req.headers.origin);
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
