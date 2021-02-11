const Appointments = require('../models/Appointments');

module.exports = {
  async findAppointmentByDate(date) {
    const Appointment = await Appointments.findOne({ where: date });

    return Appointment || null;
  },
};
