'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import auth from '../../../firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../components/loading/loading';
import '../styles/signup.css';

const SignUp = () => {
    const router = useRouter();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth); 
    const [updateProfile, updating] = useUpdateProfile(auth);

    let errorElement;



    const handleSubmit = async (event:React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as any;
        const name = target.username.value;
        const email = target.email.value;
        const password = target.password.value;
        console.log(email, password);
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    }

    if (user) {
        router.push('/tasks');
    }

    if (loading || updating) {
        return <Loading></Loading>
    }

    if (error) {
        errorElement = <p className='text-red-600'>Error: {error?.message}</p>
    }


    return (
        <div className='bgImage'>
            <div className='flex mx-auto my-auto'>
                <div className=''>
                    <h2 className='text-center text-3xl bg-orange-400 pb-4 pt-2 text-white'>Sign Up</h2>
                    <div className=" md:w-96 mx-auto">
                        <form onSubmit={handleSubmit} className="bg-opacity-10 bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 ">
                            <div className="mb-4">
                                <label className="block text-black text-sm font-bold mb-2">
                                    Username
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name='email' type="email" placeholder="email" required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-black text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input className="shadow appearance-none border border-orange-600 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name='password' type="password" placeholder="******************" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-green-800 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    <input className='w-full' type="submit" value='Sign Up' />
                                </button>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <Link href='/signin' className="inline-block align-baseline font-bold text-blue-800 hover:text-blue-900">
                                    Already have an Account
                                </Link>
                            </div>
                            {errorElement}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp
