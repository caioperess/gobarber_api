import AppError from '../erros/AppError';

const Appointments = require('../models/Appointments');

module.exports = {
  async execute({ date, provider_id }) {
    const findAppointmentInSameDate = await Appointments.findOne({
      where: { date },
    });

    if (findAppointmentInSameDate) {
      throw new AppError('Appointment already exist in this date!');
    }

    const Appointment = await Appointments.create({ date, provider_id });

    return Appointment;
  },
};
