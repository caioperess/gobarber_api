import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const SessionRouter = Router();

SessionRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const session = await AuthenticateUserService.execute({
    email,
    password,
  });

  return res.json(session);
});

export default SessionRouter;
