import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { Link } from 'react-router-dom';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const LandingPage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-3/4 flex flex-col items-center -mt-8 lg:-mt-10">
                <p className="text-blue-500 font-raleway font-medium text-xl">
                    Your Decentralized Workforce Made Efficient:
                </p>
                <h1 className="text-LandingTitle font-raleway font-bold text-center mt-4 mb-8 text-black">
                    Simplifying Payroll and Invoices <br /> with Blockchain-powered Tool
                </h1>

                <WalletMultiButtonDynamic className='bg-black' />
            </div>
        </div>
    );
};