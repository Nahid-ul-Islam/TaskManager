'use client'
import Link from 'next/link'
import React from 'react'
import './styles/landing.css'

const Home = () => {
    return (
        <div className='main flex justify-center'>
            <div className='mb-20'>
                <div className='text-center'>
                    <h1 className='text-white text-3xl md:text-6xl font-bold'>Welcome to Task Manager</h1>
                    <p className='text-white text-md md:text-2xl font-bold my-5'>One safe place for all your tasks</p>
                    <hr />
                </div>
                <div className='flex justify-around mt-10'>
                    <Link href="/signin" className="btn bg-green-500 hover:bg-green-700 h-8">Sign In</Link>

                    <Link href="/signup" className="btn bg-green-500 hover:bg-green-700 h-8">Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
