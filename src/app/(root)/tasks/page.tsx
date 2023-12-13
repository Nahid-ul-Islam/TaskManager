'use client'
import React, { useEffect, useState } from 'react';
import Titlebar from '../components/titlebar/titlebar';
import Link from 'next/link';
import axios from 'axios';
import { Note } from '@/data/interfaces/note';
import Navbar from '../components/navbar/navbar';

import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '@/firebase.init';
import Home from '../page';

const Tasks = () => {
    const [user] = useAuthState(auth);
    const [notes, setNotes] = useState<Note[]>([]);

    const fetchNotes = async () => {
        const { data } = await axios.get('http://localhost:5000/api/notes');
        setNotes(data);
    }
    console.log(notes);

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete!!")) {

        }
    };

    return (
        <div>
            {
                user ?
                    <div>
                        <Navbar />
                        <Titlebar title='Welcome Nahidul Islam'>
                            <Link href='/createnote'>
                                <button className="px-2 py-2 rounded-md my-4 bg-green-500 hover:bg-green-700 font-semibold text-sm md:text-base">Create New Note</button>
                            </Link>
                            {
                                notes.map(note =>
                                    <div key={note._id}>

                                        {/* card start */}
                                        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-gray-100 rounded-box mb-2">
                                            <div className="collapse-title text-xl font-medium flex justify-between">
                                                <div>{note.title}</div>
                                                <div>
                                                    <Link href={`/note/${note._id}`} className="px-2 py-2 mr-2 rounded-md bg-green-500 hover:bg-green-700 font-semibold text-sm md:text-base">Edit</Link>
                                                    <button className="px-2 py-2 rounded-md bg-red-500 hover:bg-red-700 font-semibold text-sm md:text-base" onClick={() => handleDelete(note._id)}>Delete</button>
                                                </div>
                                            </div>
                                            <div className="collapse-content">
                                                {/* card body */}
                                                <div>
                                                    <h2 className='font-bold text-lg'>{note.content}</h2>
                                                    <h5>Created On - Date</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </Titlebar>
                    </div>

                    :
                    <Home />
            }

        </div>
    );
}

export default Tasks
