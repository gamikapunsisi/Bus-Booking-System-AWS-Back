const Schedule = require('../models/Schedule');

// Get all schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json({
      success: true,
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching schedules',
      error: error.message
    });
  }
};

// Add new schedule
const addSchedule = async (req, res) => {
  try {
    const newSchedule = await Schedule.create(req.body);
    res.status(201).json({
      success: true,
      data: newSchedule
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding schedule',
      error: error.message
    });
  }
};

// Delete schedule
const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOneAndDelete({ scheduleId: req.params.scheduleId });
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }
    res.status(200).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting schedule',
      error: error.message
    });
  }
};

// Get schedules by route
const getSchedulesByRoute = async (req, res) => {
  try {
    const { route } = req.params;
    const schedules = await Schedule.find({ route });
    res.status(200).json({
      success: true,
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching schedules by route',
      error: error.message
    });
  }
};

module.exports = {
  getAllSchedules,
  addSchedule,
  deleteSchedule,
  getSchedulesByRoute
}; 