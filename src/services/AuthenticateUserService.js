import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Users from '../models/User';
import AppError from '../erros/AppError';

module.exports = {
  async execute({ email, password }) {
    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination!', 401);
    }

    const token = sign({}, process.env.APP_SECRET, {
      subject: user.user_id,
      expiresIn: '1d',
    });

    return token;
  },
};
