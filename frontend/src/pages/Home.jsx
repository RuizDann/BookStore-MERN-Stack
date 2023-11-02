import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://ruizdann-bookstore-mern.netlify.app/books')
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>

            <div className='flex justify-around items-center'>
                <div className='flex justify-center items-center gap-x-4'>
                    <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg border border-slate-600' onClick={() => setView('table')}>Table</button>
                    <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg border border-slate-600' onClick={() => setView('card')}>Card</button>
                </div>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (<Spinner />) : view === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books} />)}
        </div>
    )
}

export default Home;