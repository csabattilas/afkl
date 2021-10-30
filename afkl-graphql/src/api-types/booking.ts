export type ApiBooking = {
    passengers: ApiPassenger[];
    itinerary: ApiItinerary;
}

export type ApiTitle = {
    name: string;
}

export type ApiPassenger = {
    lastName: string;
    firstName: string;
    title: ApiTitle;
}

export type ApiItinerary = {
    connections: ApiConnection[];
    type: string;
}

export type ApiCity = {
    IATACode: string;
    name: string;
    country: ApiCountry
}

export type ApiCountry = {
    code: string;
    name: string;
}

export type ApiNode = {
    IATACode: string;
    name: string;
    city: ApiCity;
}

export type ApiConnection = {
    duration: number;
    origin: ApiNode;
    destination: ApiNode;
    segments: ApiSegment[]
}

export type ApiMarketingFlight = {
    operatingFlight: {
        number: string;
        carrier: {
            code: string;
            name: string;
        }
        localCheckInStart: string;
        localScheduledArrival: string;
        localScheduledDeparture: string;
        arrivalTerminal: {
            name: string;
        },
        cabin: {
            name: string;
        },
        equipment: {
            name: string;
        }
    }
}

export type ApiSegment = {
    departFrom: ApiNode;
    arriveOn: ApiNode;
    marketingFlight: ApiMarketingFlight;
}
