/*eslint-disable*/
import Promise from "bluebird";
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

const { join } = Promise;

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
    // const page = req.params.page || 1;
    // const limit = 10;
    const whereCondition = [];

    /* eslint-disable no-mixed-spaces-and-tabs */
    let order =
      req.query.orderKeyword && req.query.sort
        ? [[req.query.orderKeyword, req.query.sort]]
        : [["lastname", "ASC"]];
    /* eslint-enable no-mixed-spaces-and-tabs */

    if (req.query.orderKeyword === "grade") {
      order = [[Sequelize.literal("grade"), req.query.sort]];
    } else if (
      req.query.orderKeyword === "lastname" &&
      req.query.sort === "ASC"
    ) {
      order = [
        [Sequelize.literal("registeredDate IS NULL DESC")],
        ["lastname", req.query.sort],
      ];
    }

    if (req.query.searchKeyword && req.query.value) {
      // Search details
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

    const getSchoolDetails = Schools.findOne({
      attributes: [
        "id",
        "name",
        [Sequelize.col("Country.name"), "countryName"],
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

    const getStudents = Students.findAndCountAll({
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
      distinct: true,
      include: {
        model: StudentRecords,
        attributes: [],
        where: { schoolId: req.params.schoolId },
        include: {
          model: Grades,
          attributes: [],
        },
      },
      order,
      // offset: (page - 1) * limit,
      // limit,
    });

    return join(getSchoolDetails, getStudents, (schoolDetails, students) =>
      successResponse(req, res, {
        school: schoolDetails,
        students,
      })
    );
  } catch (error) {
    console.error("getStudsBySchlId -> error", error);
    return errorResponse(req, res, error.message);
  }
};
