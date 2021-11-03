import {ApiBooking, ApiNode, ApiMarketingFlight, ApiItineraryType} from '../api-types/booking';
import {Node, Flight, ItineraryType, Booking} from '../types';

export class BookingResolver {
    static convertMinutesToHoursMinutes = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        const hString = h < 10 ? '0' + h : h;
        const mString = m < 10 ? '0' + m : m;

        return `${hString}:${mString}`;
    }

    static resolveBooking = (apiBooking: ApiBooking): Booking => ({
        itinerary: {
            type: BookingResolver.parseApiItineraryToItinerary(apiBooking.itinerary?.type),
            destinationCity: apiBooking.itinerary?.connections[0].destination.city.name,
            connections: apiBooking.itinerary.connections.map(connection => ({
                origin: BookingResolver.parseApiNodeToNode(connection.origin),
                destination: BookingResolver.parseApiNodeToNode(connection.destination),
                duration: BookingResolver.convertMinutesToHoursMinutes(connection.duration),
                segments: connection.segments.map(segment => ({
                    arriveOn: BookingResolver.parseApiNodeToNode(segment.arriveOn),
                    departFrom: BookingResolver.parseApiNodeToNode(segment.departFrom),
                    flight: BookingResolver.parseFlightFromApi(segment.marketingFlight)
                }))
            })),
        },
        passengers: apiBooking.passengers.map(passenger => ({
            ...passenger,
            title: passenger.title.name
        }))
    });

    static parseApiNodeToNode = (apiNode: ApiNode): Node => ({
        city: apiNode.city.name,
        airport: apiNode.name,
        iata: apiNode.IATACode,
        country: apiNode.city.country.name
    })

    static parseFlightFromApi = (marketingFlight: ApiMarketingFlight): Flight => ({
        aircraft: marketingFlight.operatingFlight.equipment.name,
        cabin: marketingFlight.operatingFlight.cabin.name,
        carrier: marketingFlight.operatingFlight.carrier.code,
        checkInStartTime: marketingFlight.operatingFlight.localCheckInStart,
        number: marketingFlight.operatingFlight.number,
        scheduledArrivalTime: marketingFlight.operatingFlight.localScheduledArrival,
        scheduledDepartureTime: marketingFlight.operatingFlight.localScheduledDeparture,
    })

    static parseApiItineraryToItinerary(apiItineraryType: ApiItineraryType): string {
        return Object.values(ItineraryType)?.find(itineraryType => apiItineraryType.toLowerCase() === itineraryType)?.replace('_', ' ') || '';
    }
}
