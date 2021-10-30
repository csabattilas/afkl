import {QueryGetBookingDetailsArgs, Booking, QueryBookingExistArgs} from '../types';
import {AfklApi} from '../datasources/afkl-api';

export const resolvers = {
    Query: {
        getBookingDetails: async (
            _: any, {
                bookingCode,
                lastName
            }: QueryGetBookingDetailsArgs,
            {
                dataSources
            }: {
                dataSources: {
                    afklApi: AfklApi
                }
            }): Promise<Booking> => {
            return await dataSources.afklApi.getBooking(bookingCode, lastName)
        },

        bookingExist: async (
            _: any, {
                bookingCode,
                lastName
            }: QueryBookingExistArgs,
            {
                dataSources
            }: {
                dataSources: {
                    afklApi: AfklApi
                }
            }): Promise<boolean | Error> => {
            await dataSources.afklApi.bookingExist(bookingCode, lastName);

            // if errors the await then no return true will happen;
            return true;
        }
    }
}

