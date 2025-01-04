// Route
class RouteDto {
    constructor(id, routeNumber, origin, destination, distance, estimatedDuration, fareAmount, intermediateStops, status) {
        this.id = id;
        this.routeNumber = routeNumber;
        this.origin = origin;
        this.destination = destination;
        this.distance = distance;
        this.estimatedDuration = estimatedDuration;
        this.fareAmount = fareAmount;
        this.intermediateStops = intermediateStops;
        this.status = status; // 'ACTIVE', 'INACTIVE'
    }
}

class StopDto {
    constructor(name, distanceFromOrigin, estimatedTimeFromOrigin) {
        this.name = name;
        this.distanceFromOrigin = distanceFromOrigin;
        this.estimatedTimeFromOrigin = estimatedTimeFromOrigin;
    }
}

class CreateRouteDto {
    constructor(routeNumber, origin, destination, distance, estimatedDuration, fareAmount, intermediateStops) {
        this.routeNumber = routeNumber;
        this.origin = origin;
        this.destination = destination;
        this.distance = distance;
        this.estimatedDuration = estimatedDuration;
        this.fareAmount = fareAmount;
        this.intermediateStops = intermediateStops;
    }
}