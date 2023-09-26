import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const Navbar = ({ isConnected }) => {

    const router = useRouter();
    const currentPath = router.pathname;

    return (
        <nav className="bg-transparent p-4 sticky z-10 h-32 ">
            <div className="container mx-auto h-full">
                <div className="flex justify-between items-center h-full">
                    <div className="text-titleBlue font-raleway font-bold text-2xl">
                        Bookchain
                    </div>
                    <div className="flex items-center">
                        {currentPath === '/job' || currentPath === '/project' ? (
                            <>
                                <Link href="/project">
                                <p className={`font-raleway font-medium text-sm mr-8 cursor-pointer ${currentPath === '/project' ? 'text-black' : 'text-gray-400'}`}>Projects</p>
                                </Link>
                                <Link href="/job">
                                    <p className={`font-raleway font-medium text-sm mr-8 cursor-pointer ${currentPath === '/job' ? 'text-black' : 'text-gray-400'}`}>Jobs</p>
                                </Link>
                            </>
                        ) : (
                            !isConnected && (
                                <>
                                    <p className="text-black font-raleway font-medium text-sm mr-8">For individual</p>
                                    <Link href="/dao">
                                        <p className="text-gray-400 font-raleway font-medium text-sm mr-8 cursor-pointer">For Groups</p>
                                    </Link>
                                </>
                            )
                        )}
                        <WalletMultiButtonDynamic className='ml-4 bg-black' />
                    </div>
                </div>
            </div>
        </nav>
    );
};

