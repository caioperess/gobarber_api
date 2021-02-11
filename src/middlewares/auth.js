import jwt from 'jsonwebtoken';
import AppError from '../erros/AppError';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token not provided', 401);
  }

  try {
    const [, token] = authHeader.split(' ');

    const decoded = jwt.verify(token, process.env.APP_SECRET);

    req.user = {
      id: decoded.sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid Token', 401);
  }
};
