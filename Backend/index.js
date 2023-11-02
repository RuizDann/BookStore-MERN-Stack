import express from 'express';
// import { PORT, MONGO_URL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// option 1: Allow all origins with *
app.use(cors());
// option 2: Allow only specific origins
    // app.use(
    //     cors({
    //         origin: 'http://localhost:3000',
    //         methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //         allowedHeaders: ['Content-Type'],
    //         })
    //     );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('App connected to Database');

        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error);
    });
