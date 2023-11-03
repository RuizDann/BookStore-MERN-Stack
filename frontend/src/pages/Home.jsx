import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('table');

    const fetchData = async () => {
        try {
            const response = await axios.get('https://mern-bookstore-yezb.onrender.com/books');
            setBooks(response.data.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const switchView = (selectedView) => {
        setView(selectedView);
    };

    return (
        <div className='p-4'>
            <div className='flex justify-around items-center'>
                <div className='flex justify-center items-center gap-x-4'>
                    <Button label='Table' active={view === 'table'} onClick={() => switchView('table')} />
                    <Button label='Card' active={view === 'card'} onClick={() => switchView('card')} />
                </div>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? <Spinner /> : (view === 'table' ? <BooksTable books={books} /> : <BooksCard books={books} />)}
        </div>
    )
}

const Button = ({ label, active, onClick }) => {
    return (
        <button
            className={`bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg border border-slate-600 ${active ? 'bg-sky-600' : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Home;