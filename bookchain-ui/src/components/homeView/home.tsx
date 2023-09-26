import React from 'react';
import Link from 'next/link';

export const Home: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-3/4 flex flex-col  -mt-8 lg:-mt-10">
                <h1 className="text-blue-500 font-raleway font-bold text-Title">Welcome Back!</h1>
                <p className="text-black mt-16 text-SubTitle font-bold">Go to:</p>
                <div className="flex justify-between mt-2">
                    <Link href="/project">
                        <button className="font-bold text-Body text-black rounded-lg" style={{width: '200px', height: '60px', border: '2.5px solid black'}}>Projects</button>
                    </Link>
                    <Link href="/job">
                        <button className="font-bold text-Body text-black rounded-lg" style={{width: '200px', height: '60px', border: '2.5px solid black'}}>Jobs</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};