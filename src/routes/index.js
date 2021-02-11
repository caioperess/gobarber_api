import { Router } from 'express';

import UserRoutes from './user_routes';
import AppointmentRoutes from './appointments_routes';
import SessionRoutes from './sessions_routes';

const routes = Router();

routes.use('/appointments', AppointmentRoutes);
routes.use('/users', UserRoutes);
routes.use('/sessions', SessionRoutes);

export default routes;
