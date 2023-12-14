import React from 'react'
import '../../styles/titlebar.css';
import Navbar from '../navbar/navbar';

interface Props {
    title: string;
    children: React.ReactNode
}

const Titlebar = ({ title, children }: Props) => {
    return (
        <>
            <Navbar></Navbar>
            <div className='container mx-auto h-screen mt-5'>
                <div>
                    {
                        title &&
                        <>
                            <h1 className='text-2xl mx-2 md:text-4xl md:mx-5 lg:text-5xl   heading'>{title}</h1>
                            <hr />
                        </>
                    }
                    <div className='mx-2 md:mx-5'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Titlebar
