const connectDB = require('./config/db');
const Route = require('./models/Route');

// Connect to MongoDB
connectDB();

const main = async () => {
  try {
    // CREATE: Add a new route
    const newRoute = await Route.create({
      routeId: '30-1',
      routeName: 'Coastal Route',
      distance: 200,
      estimatedTime: '3.5 hours',
    });
    console.log('New Route Added:', newRoute);

    // READ: Fetch all routes
    const routes = await Route.find();
    console.log('All Routes:', routes);

    // UPDATE: Update a route
    const updatedRoute = await Route.findOneAndUpdate(
      { routeId: '30-1' },
      { routeName: 'Updated Coastal Route' },
      { new: true } // Return the updated document
    );
    console.log('Updated Route:', updatedRoute);

    // DELETE: Delete a route
    const deletedRoute = await Route.findOneAndDelete({ routeId: '15-3' });
    console.log('Deleted Route:', deletedRoute);
  } catch (error) {
    console.error('Error performing CRUD operations:', error.message);
  } finally {
    process.exit(); // Exit the script
  }
};

main();
