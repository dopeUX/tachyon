import axios from "axios";

export default async function getTransactions(){
    const res = await axios.get('https://tachyon-node-1.uxnation.repl.co/get-chain/');
    console.log(res.data.transaction)
   
    console.log(res.data.chain);
    return res.data;
  }