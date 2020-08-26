import Joi from "joi";

export const getStudentById = {
  params: {
    id: Joi.number().required(),
  },
};

export const newValidation = {
  body: {
    userId: Joi.number().required(),
  },
};

export const addStudent = {
  body: {
    num: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    age: Joi.number().required(),
    mother: Joi.string().required(),
    father: Joi.string().required(),
  },
};

export const editStudent = {
  body: {
    id: Joi.number().required(),
    attendanceId: Joi.number().required(),
  },
};
