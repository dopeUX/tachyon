import react,{useState} from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Router from "next/router";

export default function createTransaction(){
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [amount,setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
   
    async function addTransaction(){
     setLoading(true);
     const body = {
        sender:sender,
        receiver:receiver,
        amount:amount 
     }    
      const promise1 = await axios.post('https://tachyon-node-1.uxnation.repl.co/add-transaction/', body).then(res=>{
        console.log(res);
      });
      const promise2 = await axios.post('https://tachyon-node-2.uxnation.repl.co/add-transaction/', body).then(res=>{
        console.log(res);
      });
      const promise3 = await axios.post('https://tachyon-node-3.uxnation.repl.co/add-transaction/', body).then(res=>{
        console.log(res);
      });
      
      await Promise.resolve([promise1, promise2, promise3]).then(res=>{
          setLoading(false); 
          showNotification('Transaction confirmed');
          Router.push('/');
      });


    }
    function showNotification(message) {
      var options = {
        body: message + ', amount : '+amount+'$',
        icon: 'https://i.ibb.co/ng9J8BZ/Frame-5.png',
        dir:'ltr'
      };
      new Notification("Tachyon", options);
      
     }
    return (
       <div className="create-transaction">
         <Loading
          isLoading={loading}/>
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