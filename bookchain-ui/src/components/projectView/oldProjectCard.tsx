import React from 'react';

export const OldProjectCard = ({ projectData }) => {
    return (
        <div className="flex items-center border border-black rounded-lg justify-between p-4" style={{width: '250px', height: '50px'}}>
            <h1 className="text-black font-raleway font-bold text-Body">{projectData.name}</h1>
            <button className="flex items-center justify-center border border-black text-black font-bold text-BodySmall rounded shadow-xl" style={{width: '90px', height: '20px', borderRadius: '2px'}}>Transaction</button>
        </div>
    );
};
