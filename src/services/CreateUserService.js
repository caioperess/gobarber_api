import { hash } from 'bcryptjs';
import AppError from '../erros/AppError';

const User = require('../models/User');

module.exports = {
  async execute({ nome, email, password }) {
    const checkUserExist = await User.findOne({ where: { email } });

    if (checkUserExist) {
      throw new AppError('Email address already used!');
    }

    const hashedpassword = await hash(password, 8);

    const user = await User.create({ nome, email, password: hashedpassword });

    return user;
  },
};
