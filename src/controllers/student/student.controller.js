// eslint-disable-next-line
import { Students } from "../../models";

import { successResponse, errorResponse } from "../../helpers";

export const getStudentById = async (req, res) => {
  try {
    const student = await Students.findAndCountAll({
      where: { id: req.params.id },
      attributes: { exclude: ["deletedAt", "updatedAt"] },
    });
    return successResponse(req, res, student);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const addStudent = async (req, res) => {
  console.log("addStudent -> req, res", req, res);
};
