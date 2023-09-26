import React from 'react';

import Image from 'next/image';

import changeImage from '../../../public/assets/projectView/change.png';

export const InactiveEmployeeCard = ({ employeeData, projectData }) => {
    return (
        <div className="border border-black rounded-lg flex justify-between items-center p-2"  style={{width: '215px', height: '40px'}}>
            <div>
                <h1 className="text-black font-raleway font-bold text-BodySmall">{employeeData.username}</h1>
                <h1 className="text-gray-500 font-raleway font-bold text-BodySmaller">{employeeData.department}</h1>
            </div>

            <div className="flex space-x-1">
                <button className="flex items-center justify-center border border-black text-black font-bold text-BodySmaller rounded shadow-xl" style={{width: '50px', height: '15px', borderRadius: '2px'}}>Payments</button>
                <button className="flex items-center justify-center border border-black text-black bg-customGreen font-bold text-BodySmaller rounded shadow-xl" style={{width: '50px', height: '15px', borderRadius: '2px'}} onClick={() => setModalCloseOpen(true)}>Activate</button>
            </div>
        </div>
    )
};