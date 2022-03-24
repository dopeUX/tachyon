import react,{useState} from "react";
import axios from "axios";

export default function createTransaction(){
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [amount,setAmount] = useState(0);
   
    async function addTransaction(){
     const body = {
        sender:sender,
        receiver:receiver,
        amount:amount 
     }    
      await axios.post('http://localhost:3001/add-transaction/', body).then(res=>{
        console.log(res);
      });
      await axios.post('http://localhost:3002/add-transaction/', body).then(res=>{
        console.log(res);
      });
      await axios.post('http://localhost:3003/add-transaction/', body).then(res=>{
        console.log(res);
      });

    }
   
    return (
       <div className="create-transaction">
           <h1>Create a transaction</h1>

           <input type="text" placeholder="sender"
           value={sender}
           onChange={(e)=>{
               setSender(e.currentTarget.value);
           }}/>
           <input type="text" placeholder="recipient" 
           value={receiver}
           onChange={(e)=>{
               setReceiver(e.currentTarget.value);
           }}/>
           <input type='number' placeholder="amount in dollars" 
           value={amount}
           onChange={(e)=>{
               setAmount(e.currentTarget.value);
           }}/>
           
           <button onClick={()=>{
               addTransaction();
           }}>send</button>
       </div> 
    )
}