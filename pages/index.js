import react,{useState, useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import MempoolCard from '../components/MempoolCard'
import BlockchainCard from '../components/BlockchainCard';
import getTransactions from '../functions/getTransactions';
import TextTransition, { presets } from "react-text-transition";
import Loading from '../components/Loading';

export default function Home() {
  const [mempool,setMempool] = useState([]);
  const [chain, setChain] = useState([]);
  const [desc,setDescs] = useState();
  const [coins, setCoins] = useState();
  const [loading, setLoading] = useState(false);
  let d = ['frfre'];

  useEffect(()=>{
     setLoading(true); 
     getTransactions().then(response=>{
       setLoading(false);
       setMempool(response.transaction);
       setChain(response.chain);
       setCoins(response.tachyons);

       
      //  console.log(response.tachyons)
      //  setDescs([
      //    response.tachyons+' mined',
      //    'currently 3 nodes maintaining blockchain'
      //  ])
      // d.push(response.tachyons+' mined');
    //   d.push('currently 3 nodes maintaining blockchain')
       
     })
  },[]);

    useEffect(()=>{
      if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
      } else {
        Notification.requestPermission();
      }
    });

  // useEffect(()=>{
  //   const intervalId = setInterval(() =>
  //   setIndex(index => index + 1),
  //   3000 // every 3 seconds
  //   );
  //   return () => clearTimeout(intervalId);
  // },[])
  
 
  return (
    
    <div className='hero'>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico'/>
      </Head>
      {/* {showNotification()} */}
      <Loading isLoading={loading}/>
       <h1 className='main-head'>Tachyon</h1>
       <h2 className='hero-desc'>
        {coins} tachyons mined
       </h2>
     
     <div className='hero-action-btns'>
     <Link href='/mineBlock'>
       <div className='mine-block'>
           <h2>mine block</h2>
           <img alt='' width={80} height={80} src='/icons/axe.png'/>      
       </div>
       </Link>
       <div className='create-trans'>
        <Link href='/createTransaction'>
         <h2>create a transaction +</h2>
         </Link> 
       </div>
       
     </div>

     <section className='blockchain'>
       <h2 className='title'>Current mempool</h2>
         {
           mempool.map((item,index)=>{
             return <MempoolCard 
              key={index}
              sender = {item.sender}
              recipient = {item.receiver}
              amount = {item.amount}
             />
           })
          }
       <h2 className='title'>Current blockchain</h2>
       { 
        chain.map((item,index)=>{
           return <BlockchainCard 
           key={index}
           item={item}
           />
        })
       }
     </section>
   
    </div>
  )
}
