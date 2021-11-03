import {RESTDataSource} from 'apollo-datasource-rest';
import {ApiBooking} from '../api-types/booking';

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

    getBooking(bookingCode: string, lastName: string): Promise<ApiBooking> {
        return this.get(
            '/booking',
            {
                bookingCode,
                lastName
            })
    }


}
