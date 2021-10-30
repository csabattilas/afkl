const express = require('express')
const app = express()
const port = process.env.PORT || 3001

app.get('/booking', (req, res) => {
    const data = require('./mock/mock.json').find((booking) => {
        return booking.bookingCode.toLowerCase() === req.query.bookingCode.toLowerCase() &&
            booking.passengers.some(passenger => passenger.lastName.toLowerCase() === req.query.lastName.toLowerCase())
    });

    if (!data) {
        res.status(404).send('Not found');
    } else {
        res.json(data);
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})