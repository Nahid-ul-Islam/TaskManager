'use client'
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Titlebar from '../components/titlebar/titlebar';
import { useDeleteTaskMutation, useGetTasksByEmailQuery } from '@/redux/slice/api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loading from '../components/loading/loading';
import Link from 'next/link';

const Tasks = () => {
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();
    const { data: tasksData } = useGetTasksByEmailQuery(user ? user.email : "");
    const searchData = useAppSelector((state) => state.searchReducer.value);
    const isLoading = (tasksData == null)
    const notes = tasksData;
    const error = null;

    const [deleteTask, { isSuccess }] = useDeleteTaskMutation();

    const handleDelete = async (id: string, email: string) => {
        if (window.confirm("Are you sure you want to delete!!")) {
            deleteTask(id);
            console.log(id);

        }
    };

    const pageTitle = `Welcome ${user ? user.displayName : ''}`;

    return (
        <div>
            <Titlebar title={pageTitle}>
                <Link href='/addTask'>
                    <button className="px-2 py-2 rounded-md my-4 bg-green-500 hover:bg-green-700 font-semibold text-sm md:text-base text-white">Create New Task</button>
                </Link>
                {isLoading && <Loading></Loading>}
                {error && <p className='text-red-500'>{error}</p>}
                {
                    notes && notes.filter((searchNote: any) => {
                        if (searchNote === "") {
                            return searchNote
                        } else if (searchNote.title.toLowerCase().includes(searchData.toLowerCase())) {
                            return searchNote
                        }
                    }).map(note =>
                        <div key={note._id}>

                            {/* card start */}
                            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-gray-100 rounded-box mb-2">
                                <div className="collapse-title text-xl font-medium flex justify-between">
                                    <div className='truncate'>
                                        <p className='truncate text-black'>{note.title}</p>
                                    </div>
                                    <div>
                                        <Link href={`/update-note/${note._id}`} className="px-2 py-2 mr-2 rounded-md bg-green-500 hover:bg-green-700 font-semibold text-sm md:text-base text-white">Edit</Link>
                                        <button className="px-2 py-1.5 rounded-md bg-red-500 hover:bg-red-700 font-semibold text-white text-sm md:text-base" onClick={() => handleDelete(note._id, note.email)}>Delete</button>
                                    </div>
                                </div>
                                <div className="collapse-content">
                                    {/* card body */}
                                    <div className='text-black'>
                                        <p className=' text-lg break-words'>{note.content}</p>
                                        <p className='mt-3'><small>Created On - {note.date}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Titlebar>
        </div>
    );
};

export default Tasks;