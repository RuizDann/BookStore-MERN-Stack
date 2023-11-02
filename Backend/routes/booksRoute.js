import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to save a new Book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Some required fields are missing!',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all Books from the database
router.get('/', async (request, response) => {
    try {
        // Use the find() method and pass an empty object {} as the parameter to get all books from the database
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books,
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get One Book from the database by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);
        
        return response.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update a Book by ID
router.put('/:id', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Some required fields are missing!',
            });
        }
        // Get the book ID from the request params
        const { id } = request.params;

        // Find the book by ID and update it with the request body
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({'message': 'Book not found'});
        }

        return response.status(200).send({ message: 'Book updated successfully!' });

    } catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a Book by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({'message': 'Book not found'});
        }

        return response.status(200).send({ message: 'Book deleted successfully!' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;