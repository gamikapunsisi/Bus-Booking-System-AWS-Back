// Bus DTOs
class BusDto {
    constructor(id, registrationNumber, operatorId, capacity, type, facilities, status) {
        this.id = id;
        this.registrationNumber = registrationNumber;
        this.operatorId = operatorId;
        this.capacity = capacity;
        this.type = type; // 'NORMAL', 'SEMI_LUXURY', 'LUXURY', 'SUPER_LUXURY'
        this.facilities = facilities;
        this.status = status; // 'ACTIVE', 'MAINTENANCE', 'INACTIVE'
    }
}

class CreateBusDto {
    constructor(registrationNumber, capacity, type, facilities) {
        this.registrationNumber = registrationNumber;
        this.capacity = capacity;
        this.type = type; // 'NORMAL', 'SEMI_LUXURY', 'LUXURY', 'SUPER_LUXURY'
        this.facilities = facilities;
    }
}

// Trip DTOs
class TripDto {
    constructor(id, routeId, busId, departureTime, arrivalTime, availableSeats, status, fare) {
        this.id = id;
        this.routeId = routeId;
        this.busId = busId;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.availableSeats = availableSeats;
        this.status = status; // 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'
        this.fare = fare;
    }
}

class FareDto {
    constructor(baseAmount, tax, serviceCharge, totalAmount) {
        this.baseAmount = baseAmount;
        this.tax = tax;
        this.serviceCharge = serviceCharge;
        this.totalAmount = totalAmount;
    }
}

class CreateTripDto {
    constructor(routeId, busId, departureTime, arrivalTime, fare) {
        this.routeId = routeId;
        this.busId = busId;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.fare = fare; // { baseAmount, serviceCharge }
    }
}

// Booking DTOs
class BookingDto {
    constructor(id, tripId, userId, seats, totalAmount, status, paymentStatus, bookingTime) {
        this.id = id;
        this.tripId = tripId;
        this.userId = userId;
        this.seats = seats;
        this.totalAmount = totalAmount;
        this.status = status; // 'PENDING', 'CONFIRMED', 'CANCELLED'
        this.paymentStatus = paymentStatus; // 'PENDING', 'PAID', 'REFUNDED'
        this.bookingTime = bookingTime;
    }
}

class SeatDto {
    constructor(seatNumber, status, price) {
        this.seatNumber = seatNumber;
        this.status = status; // 'AVAILABLE', 'RESERVED', 'BOOKED'
        this.price = price;
    }
}

class CreateBookingDto {
    constructor(tripId, seatNumbers) {
        this.tripId = tripId;
        this.seatNumbers = seatNumbers;
    }
}

// Payment DTOs
class PaymentDto {
    constructor(id, bookingId, amount, status, paymentMethod, transactionId, timestamp) {
        this.id = id;
        this.bookingId = bookingId;
        this.amount = amount;
        this.status = status; // 'PENDING', 'SUCCESS', 'FAILED'
        this.paymentMethod = paymentMethod; // 'CREDIT_CARD', 'DEBIT_CARD', 'MOBILE_PAYMENT'
        this.transactionId = transactionId;
        this.timestamp = timestamp;
    }
}

class InitiatePaymentDto {
    constructor(bookingId, paymentMethod, returnUrl) {
        this.bookingId = bookingId;
        this.paymentMethod = paymentMethod; // 'CREDIT_CARD', 'DEBIT_CARD', 'MOBILE_PAYMENT'
        this.returnUrl = returnUrl;
    }
}

// Search DTOs
class TripSearchRequestDto {
    constructor(origin, destination, date, passengers, busType) {
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.passengers = passengers;
        this.busType = busType; // Optional: 'NORMAL', 'SEMI_LUXURY', 'LUXURY', 'SUPER_LUXURY'
    }
}

class TripSearchResponseDto {
    constructor(trips, totalCount, filters) {
        this.trips = trips;
        this.totalCount = totalCount;
        this.filters = filters; // { availableBusTypes, priceRange, departureTimeRanges }
    }
}

// Error DTOs
class ErrorResponseDto {
    constructor(code, message, details, timestamp) {
        this.code = code;
        this.message = message;
        this.details = details;
        this.timestamp = timestamp;
    }
}

// Pagination DTOs
class PaginationRequestDto {
    constructor(page, size, sortBy, sortDirection) {
        this.page = page;
        this.size = size;
        this.sortBy = sortBy; // Optional
        this.sortDirection = sortDirection; // 'ASC', 'DESC'
    }
}

class PaginatedResponseDto {
    constructor(items, totalItems, totalPages, currentPage) {
        this.items = items;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }
}
