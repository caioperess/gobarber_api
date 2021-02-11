import { Router } from 'express';
import multer from 'multer';
import auth from '../middlewares/auth';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateUserAvatarService';

const upload = multer(uploadConfig);
const UsersRouter = Router();

UsersRouter.post('/', async (req, res) => {
  const { nome, email, password } = req.body;

  const user = await CreateUserService.execute({ nome, email, password });

  return res.send(user);
});

UsersRouter.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const user_updated = await UpdateAvatarService.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.json(user_updated);
  }
);

export default UsersRouter;
