import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`https://mern-bookstore-yezb.onrender.com/books/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book deleted successfully.', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('An error occurred. Please check the console for more details.', {
                    variant: 'error',
                });
                console.error(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
                <button className='bg-red-500 text-white p-4 m-8 w-[25%]' onClick={handleDeleteBook}>
                    Yes, Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteBook;