'use client'
import auth from '@/firebase.init';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const handleSignout = () => {
        signOut(auth);
        router.push('/signin')
    }

    return (
        <div className='bg-orange-400'>
            {
                user ?
                    <div className="navbar container mx-auto">
                        <div className="navbar-start">
                            <Link href="/" className="btn btn-ghost normal-case font-bold text-sm md:text-xl">Easy Note</Link>
                        </div>
                        <div className="navbar-center">
                            <div className="form-control">
                                <input type="text" placeholder="Search" className="input input-bordered w-24 ml-9 md:ml-0 md:w-48" />
                            </div>
                            <button className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                        <div className="navbar-end">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-36">
                                    <li><Link href="/mynotes">My Notes</Link></li>
                                    <li><Link href='/'>My Profile</Link></li>
                                    <li><button onClick={handleSignout}>Log Out</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                // <div className="navbar container mx-auto flex justify-center">
                //     <div>
                //         <NavLink to="/" className="btn btn-ghost normal-case font-bold text-sm md:text-xl">Easy Note</NavLink>
                //     </div>
                // </div>
            }
        </div>
    );
}

export default Navbar
