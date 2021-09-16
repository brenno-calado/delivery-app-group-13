const isValidEmail = require('./emailValidate');
const { User } = require('../../../database/models');
const isValidPassword = require('./passwordValidate');
const { BadRequest, Conflict } = require('../../utils/httpStatus');

const validRoles = {
  administrator: 'administrator',
  seller: 'seller',
  customer: 'customer',
};

const isValidName = (name) => {
  if (name === '') {
    const error = { type: BadRequest, message: '"name" is not allowed to be empty' };
    throw error;
  }

  if (!name) {
    const error = { type: BadRequest, message: '"name" is required' };
    throw error;
  }

  if (name.length < 12) {
    const error = { 
      type: BadRequest,
      message: '"Name" length must be at least 12 characters long',
    };
    throw error;
  }
  return true;
};

const isValidRole = (role) => {
  if (role === '') {
    const error = { type: BadRequest, message: '"role" is not allowed to be empty' };
    throw error;
  }

  if (!role) {
    const error = { type: BadRequest, message: '"name" is required' };
    throw error;
  }

  if (!validRoles[role]) {
    const error = { type: BadRequest, message: 'invalid role' };
    throw error;
  }
  return true;
};

const isValidUser = async (email) => {
  const emailExists = await User.findOne({ where: { email } });

  if (emailExists) {
    const error = { type: Conflict, message: 'this email is already registered' };
    throw error;
  } 
  return emailExists;
};

const isValidUserFields = async (fields) => {
  isValidName(fields.name);
  isValidEmail(fields.email);
  isValidPassword(fields.password);
  isValidRole(fields.role);
  await isValidUser(fields.email);
};

module.exports = {
  isValidUserFields,
};
