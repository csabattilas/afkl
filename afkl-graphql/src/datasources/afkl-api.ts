import {RESTDataSource} from 'apollo-datasource-rest';
import {ApiBooking, ApiNode, ApiMarketingFlight} from '../api-types/booking';
import {Node, Flight, Booking} from '../types';

export class AfklApi extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3001';
    }

    /**
     * get booking
     * @param bookingCode
     * @param lastName
     */

    bookingExist(bookingCode: string, lastName: string): Promise<boolean | Error> {
        return this.get(
            '/booking',
            {
                bookingCode,
                lastName
            });
    }

    getBooking(bookingCode: string, lastName: string): Promise<Booking> {
        return this.get(
            '/booking',
            {
                bookingCode,
                lastName
            })
            .then((response) => this.createBooking(response))
    }

    private createBooking = (response: ApiBooking): Booking => ({
        itinerary: {
            type: response.itinerary.type,
            destinationCity: response.itinerary.connections[0].destination.city.name,
            connections: response.itinerary.connections.map(connection => ({
                origin: this.parseApiNodeToNode(connection.origin),
                destination: this.parseApiNodeToNode(connection.destination),
                duration: connection.duration,
                segments: connection.segments.map(segment => ({
                    arriveOn: this.parseApiNodeToNode(segment.arriveOn),
                    departFrom: this.parseApiNodeToNode(segment.departFrom),
                    flight: this.parseFlightFromApi(segment.marketingFlight)
                }))
            })),
        },
        passengers: response.passengers.map(passenger => ({
            ...passenger,
            title: passenger.title.name
        }))
    });

    private parseApiNodeToNode = (apiNode: ApiNode): Node => ({
        city: apiNode.city.name,
        airport: apiNode.name,
        iata: apiNode.IATACode,
        country: apiNode.city.country.name
    })

    private parseFlightFromApi = (marketingFlight: ApiMarketingFlight): Flight => ({
        aircraft: marketingFlight.operatingFlight.equipment.name,
        cabin: marketingFlight.operatingFlight.cabin.name,
        carrier: marketingFlight.operatingFlight.carrier.code,
        checkInStartTime: marketingFlight.operatingFlight.localCheckInStart,
        number: marketingFlight.operatingFlight.number,
        scheduledArrivalTime: marketingFlight.operatingFlight.localScheduledArrival,
        scheduledDepartureTime: marketingFlight.operatingFlight.localScheduledDeparture,
    })
}
