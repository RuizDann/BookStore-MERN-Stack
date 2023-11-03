// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';

// const ShowBook = () => {
//     const [book, setBook] = useState({});
//     const [loading, setLoading] = useState(false);
//     const { id } = useParams();

//     useEffect(() => {
//         setLoading(true);
//         axios
//             .get(`https://mern-bookstore-yezb.onrender.com/${id}`)
//             .then((response) => {
//                 setBook(response.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.log(error);
//                 setLoading(false);
//             });
//     }, []);

//     return (
//         <div className='p-4'>
//             <BackButton />
//             <h1 className='text-3xl my-4'>Show Book</h1>
//             {loading ? (
//                 <Spinner />
//             ) : (
//                 <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
//                     <div className='my-4'>
//                         <span className='text-xl mr-4 text-gray-500'>Id:</span>
//                         <span>{book._id}</span>
//                     </div>
//                     <div className='my-4'>
//                         <span className='text-xl mr-4 text-gray-500'>Title:</span>
//                         <span>{book.title}</span>
//                     </div>
//                     <div className='my-4'>
//                         <span className='text-xl mr-4 text-gray-500'>Author:</span>
//                         <span>{book.author}</span>
//                     </div>
//                     <div className='my-4'>
//                         <span className='text-xl mr-4 text-gray-500'>Publish Year:</span>
//                         <span>{book.publishYear}</span>
//                     </div>
//                     <div className='my-4'>
//                         <span className='text-xl mr-4 text-gray-500'>Created On:</span>
//                         <span>{new Date(book.createdAt).toString()}</span>
//                     </div>
//                     <div className='my-4'>
//                         <span className='text-xl mr-4 text-gray-500'>Last Updated On:</span>
//                         <span>{new Date(book.updatedAt).toString()}</span>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ShowBook;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const fetchBookData = async (id) => {
        try {
            const response = await axios.get(`https://mern-bookstore-yezb.onrender.com/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const bookData = await fetchBookData(id);
                setBook(bookData);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        fetchData();
    }, [id]);

    const formatDate = (dateString) => new Date(dateString).toString();

    const { _id, title, author, publishYear, createdAt, updatedAt } = book;

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Show Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Id:</span>
                        <span>{_id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Title:</span>
                        <span>{title}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Author:</span>
                        <span>{author}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Publish Year:</span>
                        <span>{publishYear}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Created On:</span>
                        <span>{formatDate(createdAt)}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Last Updated On:</span>
                        <span>{formatDate(updatedAt)}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowBook;
