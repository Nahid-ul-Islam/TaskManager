'use client'
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Titlebar from '../components/titlebar/titlebar';
import { useRouter } from 'next/navigation';
import { useCreateTaskMutation } from '@/redux/slice/api';

const AddTask = () => {

    const [user] = useAuthState(auth);
    
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const noteDate = date + '/' + month + '/' + year;
    const router = useRouter();

    const [createTask, { isSuccess, isErr }] = useCreateTaskMutation();


    const handleSubmit = async (event:React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as any;
        const email = user.email;
        const title = target.title.value;
        const content = target.note.value;
        const date = noteDate;
        const data = { email, title, content, date };
        createTask(data);
        console.log(createTask);
        router.push('/tasks');
    }
    return (
        <div>
            <Titlebar title="Create Your Note Here">
                <div className=' flex justify-center'>
                    <form onSubmit={handleSubmit} className="w-full border border-orange-500 mt-10 rounded">
                        <div className="flex flex-wrap mb-6 mt-8">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <input className="appearance-none block w-full bg-gray-200 text-black border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="grid-first-name" type="text" name="title" placeholder="Title" required />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full px-3">
                                <textarea rows={20} className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="note" name="note" type="text" placeholder="Type here" required />
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap px-3 mb-2">
                            <button className='w-full rounded-md py-2 text-white bg-green-500 hover:bg-green-700' type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </Titlebar>
        </div>
    );
};

export default AddTask;