import React from 'react';
import { useState } from 'react';
import { ActiveEmployeeCard } from '../../components/projectView/activeEmployeeCard';
import { InactiveEmployeeCard } from '../../components/projectView/inactiveEmployeeCard';

import Image from 'next/image';

import addImage from '../../../public/assets/projectView/add.png';
import attentionImage from '../../../public/assets/projectView/attention.png';

export const ActiveProjectCard = ({ projectData }) => {

    const [isModalDepositOpen, setModalDepositOpen] = useState(false);
    const [isModalWithdrawOpen, setModalWithdrawOpen] = useState(false);
    const [isModalCloseOpen, setModalCloseOpen] = useState(false);
    const [isModalEmployeeOpen, setModalEmployeeOpen] = useState(false);
    const [isModalNewEmployeeOpen, setModalNewEmployeeOpen] = useState(false);

    const [employeeData, setEmployeeData] = useState([
        {
            username: 'LEO',
            employeeWallet: '3au4zYyQYKgTnfxZS3yperW7P7chHWDrA7SuWuTFsfXi',
            hireDate: 'xxx',
            title: 'Advisor',
            department: 'Marketing',
            compensation: '100',
            isActive: true,
            autoRenewal: true
        },
        {
            username: 'LEO',
            employeeWallet: '3au4zYyQYKgTnfxZS3yperW7P7chHWDrA7SuWuTFsfXi',
            hireDate: 'xxx',
            title: 'Advisor',
            department: 'Marketing',
            compensation: '100',
            isActive: true,
            autoRenewal: false
        },
        {
            username: 'LEO',
            employeeWallet: '3au4zYyQYKgTnfxZS3yperW7P7chHWDrA7SuWuTFsfXi',
            hireDate: 'xxx',
            title: 'Advisor',
            department: 'Marketing',
            compensation: '100',
            isActive: true,
            autoRenewal: false
        },
        
      ]);

      const inactiveEmployees = employeeData.filter(item => !item.isActive);

    return (
        <div className="w-64 h-44 border border-black rounded-lg flex flex-col p-6 justify-center">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-black font-raleway font-bold text-OldProjectTitle">{projectData.name}</h1>
                <button className="flex items-center justify-center border border-black text-black bg-customRed font-bold text-BodySmall rounded shadow-xl" style={{width: '50px', height: '20px', borderRadius: '2px'}} onClick={() => setModalCloseOpen(true)}>Close</button>
            </div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-black font-raleway font-bold text-BodySmall">Balance</h1>
                <p className="text-black font-raleway font-bold text-BodySmall">{projectData.balance}</p>
            </div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-black font-raleway font-bold text-BodySmall">Deposit & Withdrawal</h1>
                <div className="flex space-x-2">
                    <button className="flex items-center justify-center border border-black bg-customGreen rounded shadow-xl" style={{width: '15px', height: '15px', borderRadius: '2px'}} onClick={() => setModalDepositOpen(true)} />
                    <button className="flex items-center justify-center border border-black bg-customRed rounded shadow-xl" style={{width: '15px', height: '15px', borderRadius: '2px'}} onClick={() => setModalWithdrawOpen(true)} />
                </div>
            </div>

            <div className="flex justify-center justify-between">
                <button className="flex items-center justify-center border border-black text-black font-bold text-BodySmall rounded shadow-xl" style={{width: '90px', height: '20px', borderRadius: '2px'}} onClick={() => setModalEmployeeOpen(true)}>Employee</button>
                <button className="flex items-center justify-center border border-black text-black font-bold text-BodySmall rounded shadow-xl" style={{width: '90px', height: '20px', borderRadius: '2px'}}>Transaction</button>
            </div>

            {/*Close Project Modal*/}
            {isModalCloseOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-customBlue bg-opacity-90 z-10" onClick={() => setModalCloseOpen(false)}>
                    <div className="bg-white rounded-xl border border-black p-6 z-30 flex flex-col items-center" style={{width: '500px', height: '300px'}} onClick={(e) => e.stopPropagation()}>
                        <h1 className="mt-6 text-black font-raleway font-bold text-SubTitle">You are closing the Project!</h1>
                        <div className="flex space-x-6 mt-8">
                        <button className="flex items-center justify-center border border-black bg-customRed rounded shadow-xl text-black font-raleway font-bold text-Body" style={{width: '150px', height: '40px', borderRadius: '2px'}}> Confirm </button>
                        <button className="flex items-center justify-center border border-black bg-transparent rounded shadow-xl text-black font-raleway font-bold text-Body" style={{width: '150px', height: '40px', borderRadius: '2px'}} onClick={() => setModalCloseOpen(false)}> Go Back </button>
                        </div>
                        <div className="text-center">
                        <div className="flex items-center mt-6">
                            <Image src={attentionImage} alt="Attention" style={{width: '16px', height: '16px'}} />
                            <p className="ml-4 text-black font-raleway font-bold text-Body">This action is IRREVERSIBLE! </p>
                        </div>
                        <p className="ml-4 text-gray-500 font-raleway font-bold text-BodySmall"> Once you close down the project, you will still be able to <br /> retrieve all the transaction done from the project wallet </p>
                        </div>
                    </div>
                </div>
            )}

            {/*Deposit Modal*/}
            {isModalDepositOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-customBlue bg-opacity-90 z-10" onClick={() => setModalDepositOpen(false)}>
                    <div className="bg-white rounded-xl border border-black p-6 z-30 flex flex-col items-center" style={{width: '500px', height: '300px'}} onClick={(e) => e.stopPropagation()}>
                    <h1 className="mt-6 text-black font-raleway font-bold text-SubTitle">Deposit</h1>
                    <div className="mt-6">
                        <div>
                        <label className="text-black font-raleway font-bold text-Body block"> Amount <span className="text-red-500">*</span> </label>
                        <div className="flex items-center justify-between mb-4">  
                            <input type="number" className="border border-black p-2 text-black font-raleway font-bold text-Body" style={{width: '325px', height: '40px'}}/>
                            <button className="border-t border-r border-b border-black cursor-default text-black font-raleway font-bold text-Body" style={{width: '75px', height: '40px'}}>{projectData.token}</button>
                        </div>
                        <div className="text-right -mt-3">
                            <p className="text-gray-500 font-raleway font-bold text-BodySmall">Needs to be a value {'>'} 0</p>
                        </div>
                        </div>
                    </div>
                    <button className="mt-6 flex items-center justify-center border border-black bg-transparent rounded shadow-xl text-black font-raleway font-bold text-Body" style={{width: '150px', height: '40px', borderRadius: '2px'}}> Confirm </button>
                    </div>
                </div>
            )}

            {/*Withdraw Modal*/}
            {isModalWithdrawOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-customBlue bg-opacity-90 z-10" onClick={() => setModalWithdrawOpen(false)}>
                    <div className="bg-white rounded-xl border border-black p-6 z-30 flex flex-col items-center" style={{width: '500px', height: '300px'}} onClick={(e) => e.stopPropagation()}>
                    <h1 className="mt-6 text-black font-raleway font-bold text-SubTitle">Withdraw</h1>
                    <div className="mt-6">
                        <div>
                        <label className="text-black font-raleway font-bold text-Body block"> Amount <span className="text-red-500">*</span> </label>
                        <div className="flex items-center justify-between mb-4">  
                            <input type="number" className="border border-black p-2 text-black font-raleway font-bold text-Body" style={{width: '325px', height: '40px'}}/>
                            <button className="border-t border-r border-b border-black cursor-default text-black font-raleway font-bold text-Body" style={{width: '75px', height: '40px'}}>{projectData.token}</button>
                        </div>
                        <div className="text-right -mt-3">
                            <p className="text-gray-500 font-raleway font-bold text-BodySmall">Needs to be a value {'<'} of {projectData.balance}</p>
                        </div>
                        </div>
                    </div>
                    <button className="mt-6 flex items-center justify-center border border-black bg-transparent rounded shadow-xl text-black font-raleway font-bold text-Body" style={{width: '150px', height: '40px', borderRadius: '2px'}}> Confirm </button>
                    </div>
                </div>
            )}

            {/* Employee Modal */}
            {isModalEmployeeOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-customBlue bg-opacity-90 z-10" onClick={() => setModalEmployeeOpen(false)}>
                    <div className="bg-white rounded-xl border border-black p-6 z-30 flex flex-col" style={{width: '1250px', height: '550px'}} onClick={(e) => e.stopPropagation()}>
                        <div className="mx-6 flex justify-between items-center mt-4">
                            <h1 className="text-black font-raleway font-bold text-OldProjectTitle">{projectData.name} - Employee </h1>
                            <button className="flex items-center justify-center border border-black text-black font-bold text-BodySmall rounded shadow-xl" style={{width: '100px', height: '20px', borderRadius: '2px'}} onClick={() => setModalCloseOpen(true)}>New Employee</button>
                        </div>
                        <div className='mt-8 mx-6'>
                            <h1 className="text-black font-raleway font-bold text-Body">Active Employee </h1>
                            <div className="flex space-x-4 mt-3">
                                {employeeData.map((item, index) => (
                                    item.isActive && <ActiveEmployeeCard key={index} employeeData={item} projectData={projectData}/>
                                ))}
                                <div className="border border-black rounded-lg flex items-center justify-center" style={{width: '215px', height: '200px'}}>
                                    <Image src={addImage} onClick={() => setModalNewEmployeeOpen(true)} alt='Add' style={{cursor: 'pointer'}} />
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-customGray mx-6 mt-8"></div>
                        <div className='mt-6 mx-6'>
                            <h1 className="text-gray-500 font-raleway font-bold text-Body">Unactive Employee </h1>
                            <div className="flex space-x-4 mt-3">
                                {inactiveEmployees.map((item, index) => (
                                    !item.isActive && <InactiveEmployeeCard key={index} employeeData={item} projectData={projectData}/>
                                ))}
                                {inactiveEmployees.length === 0 && (
                                    <div className="border border-black rounded-lg flex items-center justify-center" style={{width: '215px', height: '40px'}}>
                                        <h1 className="text-black font-raleway font-bold text-BodySmaller">No Unactive Employee...</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
