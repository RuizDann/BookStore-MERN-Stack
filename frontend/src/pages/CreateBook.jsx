import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSaveBook = () => {
        if (!title || !author || !publishYear) {
            enqueueSnackbar("Please fill in all fields.", { variant: "error" });
            return;
        }

        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .post('https://mern-bookstore-yezb.onrender.com/books', data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book created successfully.", { variant: "success" });
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("An error occurred. Please check the console for more details.", { variant: "error" });
                console.error(error);
            });
    }

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Create Book</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input
                        type="text"
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input
                        type="text"
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input
                        type="number"
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                    />
                </div>
                <button className="p-2 bg-sky-300 mx-[40%] w-[25%]" onClick={handleSaveBook}>Save</button>
            </div>
        </div>
    )
};

export default CreateBook;