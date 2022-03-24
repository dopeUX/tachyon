import axios from "axios";

export default async function getTransactions(){
    const res = await axios.get('http://localhost:3001/get-chain/');
    console.log(res.data.transaction)
   
    console.log(res.data.chain);
    return res.data;
  }