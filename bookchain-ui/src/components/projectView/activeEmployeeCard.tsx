import React from 'react';

import Image from 'next/image';

import changeImage from '../../../public/assets/projectView/change.png';

export const ActiveEmployeeCard = ({ employeeData, projectData }) => {
    
    return (
        <div className="border border-black rounded-lg flex flex-col p-6 justify-center"  style={{width: '215px', height: '200px'}}>
            <div className="flex justify-between items-center">
                <h1 className="text-black font-raleway font-bold text-Body">{employeeData.username}</h1>
            </div>

            <h1 className="text-gray-500 font-raleway font-bold text-BodySmall">{employeeData.title} ({employeeData.department}) </h1>

            <div className="flex justify-between items-center mt-3">
                <h1 className="text-black font-raleway font-bold text-BodySmall">Wallet</h1>
                <p className="text-black font-raleway font-bold text-BodySmall cursor-pointer" onClick={() => navigator.clipboard.writeText(employeeData.employeeWallet)}>{employeeData.employeeWallet.slice(0, 2)} ... {employeeData.employeeWallet.slice(-4)}</p>
            </div>
            
            <div className="flex justify-between items-center mt-2">
                <h1 className="text-black font-raleway font-bold text-BodySmall">Compensation</h1>
                <p className="text-black font-raleway font-bold text-BodySmall">{employeeData.compensation} {projectData.token}</p>
            </div>

            <div className="flex justify-between items-center mt-2">
                <h1 className="text-black font-raleway font-bold text-BodySmall">Status</h1>
                <div className="flex items-center space-x-1">
                    {employeeData.autoRenewal ? (
                        <h1 className="text-black font-raleway font-bold text-BodySmall">Salaried</h1>
                    ) : (
                        <h1 className="text-black font-raleway font-bold text-BodySmall">Freelancer</h1>
                    )}
                    <div className="border border-black flex items-center justify-center cursor-pointer rounded shadow-xl" style={{width: '14px', height: '14px'}}>
                        <Image src={changeImage} alt="Attention" style={{width: '8px', height: '8px'}}/>
                    </div>
                </div>
            </div>

            <div className="flex space-x-4 mt-5">
                <button className="flex items-center justify-center border border-black text-black font-bold text-BodySmall rounded shadow-xl" style={{width: '80px', height: '20px', borderRadius: '2px'}}>Payments</button>
                <button className="flex items-center justify-center border border-black text-black bg-customRed font-bold text-BodySmall rounded shadow-xl" style={{width: '80px', height: '20px', borderRadius: '2px'}} onClick={() => setModalCloseOpen(true)}>Deactivate</button>
            </div>
        </div>
    )
};