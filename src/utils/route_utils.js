const { BusRoute } = require('../models/schemas');

async function get_route(start, end) {
    console.log('Getting route from', start, 'to', end);
    
    try {
        const routes = await BusRoute.find({
            'stops.townName': { 
                $all: [start, end] 
            }
        });

        if (routes.length === 0) {
            return {
                error: "No direct route found between these towns"
            };
        }

        for (let route of routes) {
            const stops = route.stops;
            const startIndex = stops.findIndex(stop => stop.townName === start);
            const endIndex = stops.findIndex(stop => stop.townName === end);

            if (startIndex < endIndex) {
                // Forward direction
                const routeStops = stops
                    .slice(startIndex, endIndex + 1)
                    .map(stop => stop.townName);

                return {
                    route: route.routeName,
                    stops: routeStops,
                    numberOfStops: routeStops.length - 1
                };
            }
        }

        // Check reverse direction
        for (let route of routes) {
            const stops = route.stops;
            const startIndex = stops.findIndex(stop => stop.townName === start);
            const endIndex = stops.findIndex(stop => stop.townName === end);

            if (startIndex > endIndex) {
                // Reverse direction
                const routeStops = stops
                    .slice(endIndex, startIndex + 1)
                    .reverse()
                    .map(stop => stop.townName);

                return {
                    route: route.routeName + ' (Reverse Direction)',
                    stops: routeStops,
                    numberOfStops: routeStops.length - 1
                };
            }
        }

        return {
            error: "No direct route found between these towns"
        };
    } catch (err) {
        console.error('Error in get_route:', err);
        throw err;
    }
}

async function list_routes() {
    try {
        const routes = await BusRoute.find({}, 'routeName stops');
        return routes.map(route => ({
            routeName: route.routeName,
            stops: route.stops.map(stop => stop.townName)
        }));
    } catch (err) {
        console.error('Error in list_routes:', err);
        throw err;
    }
}
async function get_route_stops(routeName) {
    try {
        const route = await BusRoute.findOne({ routeName });
        if (!route) {
            throw new Error('Route not found');
        }
        
        return route.stops
            .sort((a, b) => a.stopOrder - b.stopOrder)
            .map(stop => stop.townName);
    } catch (err) {
        console.error('Error in get_route_stops:', err);
        throw err;
    }
}

async function add_route(routeName, stops) {
    try {
        const stopsWithOrder = stops.map((townName, index) => ({
            townName,
            stopOrder: index
        }));

        const route = await BusRoute.create({
            routeName,
            stops: stopsWithOrder
        });

        return {
            message: "Route added successfully",
            routeId: route._id
        };
    } catch (err) {
        console.error('Error in add_route:', err);
        throw err;
    }
}

module.exports = {
    get_route,
    list_routes,
    get_route_stops,
    add_route
};