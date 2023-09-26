// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Components
import { Navbar } from '../../components/navbar';
import { Home } from '../../components/homeView/home';
import { LandingPage } from '../../components/homeView/landingPage';


// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

export const HomeView: FC = ({ }) => {
  const [isConnected, setIsConnected] = useState(false);
  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (wallet.publicKey != null) {
      console.log(wallet.publicKey.toBase58())
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [wallet.publicKey, connection])

  return (
  <div>
    <Navbar isConnected={isConnected}/>
    {isConnected && <Home />}
    {!isConnected && <LandingPage />}
  </div>
  );
};
