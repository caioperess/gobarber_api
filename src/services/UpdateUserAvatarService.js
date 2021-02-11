import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import AppError from '../erros/AppError';

const User = require('../models/User');

module.exports = {
  async execute({ user_id, avatarFileName }) {
    const user = await User.findByPk(user_id);

    if (!user) {
      throw new AppError('User not Found!', 404);
    }

    if (user.avatar) {
      // Deletar avatar existente
      const UserAvatarPath = path.join(uploadConfig.directory, user.avatar);
      const AvatarExists = await fs.promises.stat(UserAvatarPath);
      if (AvatarExists) {
        await fs.promises.unlink(UserAvatarPath);
      }
    }

    user.avatar = avatarFileName;

    await user.save();

    return user;
  },
};
