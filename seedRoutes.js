const connectDB = require('./config/db');
const Route = require('./models/Route');


// Connect to MongoDB
connectDB();

const seedRoutes = async () => {
  const routes = [
    { routeId: '22-2', routeName: 'Main Highway Route', distance: 120, estimatedTime: '2 hours' },
    { routeId: '15-3', routeName: 'City Center Route', distance: 45, estimatedTime: '50 minutes' },
  ];

  try {
    await Route.insertMany(routes);
    console.log('Routes seeded successfully!');
  } catch (error) {
    console.error('Error seeding routes:', error.message);
  } finally {
    process.exit(); // Exit the script
  }
};

seedRoutes();
