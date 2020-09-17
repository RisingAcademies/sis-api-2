/*eslint-disable*/
import {
  Schools,
  Students,
  Countries,
  Grades,
  StudentRecords,
  Sequelize,
} from "../../models";
/* eslint-enable */
import { successResponse, errorResponse } from "../../helpers";

export const getStudsDetailsBySchlId = async (req, res) => {
  try {
    const student = await Students.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["deletedAt"] },
      include: [
        {
          model: Schools,
          attributes: ["id", "name"],
          where: {
            id: req.params.schoolId,
          },
        },
      ],
    });
    return successResponse(req, res, student);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getStudsBySchlId = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 10;
    const whereCondition = [];

    /* eslint-disable no-mixed-spaces-and-tabs */
    let order =
      req.query.orderKeyword && req.query.sort
        ? [req.query.orderKeyword, req.query.sort]
        : ["createdAt", "DESC"];
    /* eslint-enable no-mixed-spaces-and-tabs */

    if (req.query.orderKeyword === "grade")
      order = [Sequelize.literal("grade"), req.query.sort];

    // Search details
    if (req.query.searchKeyword && req.query.value) {
      if (req.query.searchKeyword === "createdAt") {
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
          [req.query.searchKeyword]: {
            [Sequelize.Op.like]: `%${req.query.value}%`,
          },
        });
      }
    }

    const schoolDetails = Schools.findOne({
      attributes: [
        "id",
        "name",
        [Sequelize.col("Country.code"), "countryCode"],
        [Sequelize.col("Country.id"), "countryId"],
      ],
      where: {
        id: req.params.schoolId,
      },
      include: {
        model: Countries,
        attributes: [],
      },
      raw: true,
      subQuery: false,
    });

    const students = Students.findAndCountAll({
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
            "grade",
          ],
          [
            Sequelize.literal(`(
              SELECT gradeId FROM StudentRecords WHERE StudentRecords.studentId = Students.id ORDER BY createdAt DESC LIMIT 1
            )`),
            "gradeId",
          ],
          [
            Sequelize.literal(`(
              SELECT id FROM StudentRecords WHERE StudentRecords.studentId = Students.id ORDER BY createdAt DESC LIMIT 1
            )`),
            "recordId",
          ],
        ],
        exclude: ["deletedAt"],
      },
      where: whereCondition,
      include: {
        model: StudentRecords,
        attributes: [],
        where: { schoolId: req.params.schoolId },
        include: {
          model: Grades,
          attributes: [],
        },
      },
      order: [order],

      offset: (page - 1) * limit,
      limit,
    });

    const studentData = await Promise.all([schoolDetails, students]);

    return successResponse(req, res, {
      school: studentData[0],
      students: studentData[1],
    });
  } catch (error) {
    console.error("getStudsBySchlId -> error", error);
    return errorResponse(req, res, error.message);
  }
};
