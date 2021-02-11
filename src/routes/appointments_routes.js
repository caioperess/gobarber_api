import { Router } from 'express';
import CreateAppointmentService from '../services/CreateAppointmentsService';

import Appointments from '../models/Appointments';
import auth from '../middlewares/auth';

const AppointmentsRouter = Router();

AppointmentsRouter.use(auth);

AppointmentsRouter.get('/', async (req, res) => {
  const appointments = await Appointments.findAll();
  res.send(appointments);
});

AppointmentsRouter.post('/', async (req, res) => {
  const { date, provider_id } = req.body;

  const appointment = await CreateAppointmentService.execute({
    date,
    provider_id,
  });

  res.send(appointment);
});

export default AppointmentsRouter;
