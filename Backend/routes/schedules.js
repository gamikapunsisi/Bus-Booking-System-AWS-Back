const express = require('express');
const router = express.Router();
const {
  getAllSchedules,
  addSchedule,
  deleteSchedule,
  getSchedulesByRoute
} = require('../controllers/scheduleController');

router.get('/', getAllSchedules);
router.post('/', addSchedule);
router.delete('/:scheduleId', deleteSchedule);
router.get('/route/:route', getSchedulesByRoute);

module.exports = router; 