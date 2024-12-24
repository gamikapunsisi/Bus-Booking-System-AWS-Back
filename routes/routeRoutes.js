// routes/routes.js
const express = require('express');
const routeController = require('../controllers/routeController');
const router = express.Router();

// GET: Fetch all routes
router.get('/', routeController.getAllRoutes);

// GET: Fetch a specific route by ID
router.get('/:id', routeController.getRouteById);

// POST: Create a new route
router.post('/', routeController.createRoute);

// PUT: Update an existing route by ID
router.put('/:id', routeController.updateRoute);

// PATCH: Partially update route details
router.patch('/:id', routeController.updateRoutePartially);

// DELETE: Delete a route by ID
router.delete('/:id', routeController.deleteRoute);

module.exports = router;
