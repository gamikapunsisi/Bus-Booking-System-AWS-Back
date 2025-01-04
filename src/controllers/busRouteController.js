const BusRoute = require('../utils/route_utils');
const { BusRoute: BusRouteModel } = require('../models/schemas');

const getRoute = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const route = await BusRoute.get_route(req.params.start, req.params.end);
        
        console.log('Route result:', route);

        if (route.error) {
            return res.status(404).json({
                error: route.error,
                message: `No route found between ${req.params.start} and ${req.params.end}`
            });
        }

        res.json({
            route: route.route,
            stops: route.stops,
            numberOfStops: route.stops.length
        });
    } catch (error) {
        console.error('Route error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
};

const listRoutes = async (req, res) => {
    try {
        const routes = await BusRoute.list_routes();
        console.log(routes);
        res.json({ routes });
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
};

const getRouteStops = async (req, res) => {
    try {
        const stops = await BusRoute.get_route_stops(req.params.routeName);
        res.json({ stops });
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
};

const addRoute = async (req, res) => {
    try {
        const { routeName, stops } = req.body;
        
        // Check if route already exists
        const existingRoute = await BusRouteModel.findOne({ routeName });
        if (existingRoute) {
            return res.status(409).json({
                error: 'Route already exists',
                message: `A route with name ${routeName} already exists`
            });
        }

        const result = await BusRoute.add_route(routeName, stops);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
};

module.exports = {
    getRoute,
    listRoutes,
    getRouteStops,
    addRoute
};