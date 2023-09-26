import React from 'react';
import { FC, useEffect, useState } from 'react';
import { ActiveProjectCard } from '../../components/projectView/activeProjectCard';
import { OldProjectCard } from '../../components/projectView/oldProjectCard';
import { Navbar } from 'components/navbar';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';

import Image from 'next/image';

import addImage from '../../../public/assets/projectView/add.png';
import attentionImage from '../../../public/assets/projectView/attention.png';

export const ProjectView: FC = ({ }) => {

  const [isModalProjectOpen, setModalProjectOpen] = useState(false);
  const [isModalDepositOpen, setModalDepositOpen] = useState(false);
  const [isModalWithdrawOpen, setModalWithdrawOpen] = useState(false);
  const [isModalCloseOpen, setModalCloseOpen] = useState(false);

  const [selectedToken, setSelectedToken] = useState('');

  const wallet = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (wallet.publicKey == null) {
      router.push('/')
    }
  }, [wallet.publicKey])
  
  const [ActiveProjectData, setActiveProjectData] = useState([
    {
      name: 'Project 1',
      balance: '1000',
      token: 'SOL'
    },
    {
      name: 'Project 2',
      balance: '2000',
      token: 'USDC'
    },
  ]);
  const [OldProjectData, setOldProjectData] = useState([
    {
      name: 'Project 1',
    },
    {
      name: 'Project 2',
    },
  ]);

  //TO DO: fetch data from blockchain
  useEffect(() => {
      async function fetchData() {
          const response = await fetch('your_blockchain_api_endpoint');
          const result = await response.json();
          setActiveProjectData(result);
      }
      fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
        const response = await fetch('your_blockchain_api_endpoint');
        const result = await response.json();
        setOldProjectData(result);
    }
    fetchData();
}, []);



  return (
    <div>
      <Navbar isConnected={true}/>
      <div className="m-28 mt-0">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-black font-raleway font-bold text-LandingTitle">Project</h1>
          <button className="border border-black text-black font-bold text-Body px-4 py-2 rounded shadow-xl" style={{width: '140px', height: '40px', borderRadius: '2px'}} onClick={() => setModalProjectOpen(true)}>New Project</button>
        </div>
        <div className="flex space-x-4 mb-10">
          {ActiveProjectData.map((item, index) => (
            <ActiveProjectCard key={index} projectData={item}/>
          ))}
          <div className="w-64 h-44 border border-black rounded-lg flex items-center justify-center">
            <Image src={addImage} onClick={() => setModalProjectOpen(true)} alt='Add' style={{cursor: 'pointer'}} />
          </div>
        </div>
        <div className="h-px bg-customGray"></div>
        <h2 className="text-customGray font-raleway font-bold text-OldProjectTitle mt-8">Your Old Project</h2>
        <div className="flex space-x-4 mb-10 mt-6">
          {OldProjectData.map((item, index) => (
            <OldProjectCard key={index} projectData={item} />
          ))}
          {OldProjectData.length === 0 && (
            <div className="border border-black rounded-lg flex items-center justify-center" style={{width: '250px', height: '50px'}}>
                <h1 className="text-black font-raleway font-bold text-BodySmall">No Old Project...</h1>
            </div>
          )}
        </div>
      </div>


      {/*New Project Modal*/}
      {isModalProjectOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-customBlue bg-opacity-90 z-10" onClick={() => setModalProjectOpen(false)}>
          <div className="bg-white rounded-xl border border-black p-6 z-30 flex flex-col items-center" style={{width: '700px', height: '550px'}} onClick={(e) => e.stopPropagation()}>
            <h1 className="text-black font-raleway font-bold text-SubTitle mt-6">Create Project</h1>
            
            <div className="mt-6">
              <label className="text-black font-raleway font-bold text-Body block"> Name <span className="text-red-500">*</span> </label>
              <input type="text" className="border border-black p-2 text-black font-raleway font-bold text-Body" style={{width: '570px', height: '40px'}}/>
              <div className="text-right">
                <p className="text-gray-500 font-raleway font-bold text-BodySmall">Max 20 characters</p>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-black font-raleway font-bold text-Body block"> Wallet Authority <span className="text-red-500">*</span> </label>
              <input type="text" value={wallet.publicKey.toString()} readOnly className="border border-black p-2 text-gray-500 font-raleway font-bold text-Body bg-gray-300 bg-opacity-30" style={{width: '570px', height: '40px'}}/>
            </div>

            <div className="flex items-center justify-between mt-6" style={{width: '570px'}}>
              <div>
                <label className="text-black font-raleway font-bold text-Body block"> Initial Deposit </label>
                <input type="number" className="border border-black p-2 text-black font-raleway font-bold text-Body" style={{width: '400px', height: '40px'}}/>
              </div>
              <div>
                <label className="text-black font-raleway font-bold text-Body block">Token <span className="text-red-500">*</span> </label>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center">
                    <input type="radio" id="sol" name="token" value="SOL" className="border border-black" checked={selectedToken === 'SOL'} onChange={() => setSelectedToken('SOL')}/>
                    <label htmlFor="sol" className="ml-2 text-black font-raleway font-bold text-BodySmall">SOL</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="usdc" name="token" value="USDC" className="border border-black" checked={selectedToken === 'USDC'} onChange={() => setSelectedToken('USDC')}/>
                    <label htmlFor="usdc" className="ml-2 text-black font-raleway font-bold text-BodySmall">USDC</label>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <Image src={attentionImage} alt="Attention" style={{width: '14px', height: '14px'}} />
                  <p className="ml-2 text-black font-raleway font-bold text-BodySmall">You can't change it later</p>
                </div>
              </div>
            </div>

            <button className="border border-black text-black font-bold text-Body rounded-3xl shadow-xl mt-10" style={{ width: '140px', height: '40px', borderRadius: '2px' }}> CREATE </button>

            <div className="flex items-center mt-6">
              <Image src={attentionImage} alt="Attention" style={{ width: '20px', height: '20px' }} />
              <p className="ml-4 text-black font-raleway font-bold text-BodySmall">By clicking CREATE, you will initiate a profile creation transaction from <br /> connected wallet. Ensure you have enough SOL to sign the transaction.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
