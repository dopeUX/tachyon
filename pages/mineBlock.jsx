import axios from "axios";
import react,{useEffect, useState} from "react";
import getTransactions from "../functions/getTransactions";
import Loading from "../components/Loading";
import Router from "next/router";

export default function mineBlock(){
  const [loading, setLoading] = useState(false);
  const [backIndex, setBackIndex] = useState(0);
  const nodes = [
     'Slytherine',
     'Gryffindor',
     'HufflePuff'

  ]
  const [selectedNode, setSelectedNode] = useState();
  
  useEffect(()=>{
   if(backIndex===1){ 
    window.history.pushState(null, document.title, window.location.href)
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href)
    })
   }
  },[backIndex])

  async function mine(n,ran){
   //  setLoading(true);
     const node = selectedNode+1;
     const nodeApi = 'https://tachyon-node-'+node+'.uxnation.repl.co/';
     const api = nodeApi+"mine-block/"; 
     const data = {
       params:{
         miner:n,
         random:ran
       }
     }
     await axios.get(api,data).then(async(res)=>{
       if(res.status===200){
         await axios.get(nodeApi+"get-chain/").then(async(res)=>{
           res.data.nodes.map(async x=>{
               return await axios.get(x+'replace-chain/', data).then(response=>{
                   console.log(response);
                   console.log('all chains replaced');
                   setLoading(false);
                   setBackIndex(0);
                   Router.push('/'); 
               }).catch(err=>{
                   alert(err)
                   setLoading(false);
                   setBackIndex(0);
               }) 
           })
         }).catch(err=>{
             alert(err);
             setLoading(false);
             setBackIndex(0);
         }) 
       }
     }).catch(err=>{
         alert(err);
         setLoading(false);
         setBackIndex(0);
     })
  }
    return (
        <div className="mine-block">
          <Loading
            isLoading={loading}/>
  
            <h1>Proof Of Work</h1>
            <h2>Choose a node to mine new block</h2>
         
           <div className="mine-block-hero">
            {
             nodes.map((item, index)=>{
               return <h2 key={index} className={index===selectedNode?'selected-node':null}
               onClick={()=>{

                  setSelectedNode(index); 
               }}
               >{item}</h2>
             })
            
            }
           </div> 

            <div className='mine-block-btn' 
             onClick={()=>{
               if(selectedNode===undefined){
                 alert('Please select a node to mine');
               }
               else{
                setLoading(true); 
                setBackIndex(1);
                getTransactions().then(async res=>{
                  if(res.transaction.length!==0){
                    let x = Math.floor(Math.random()*501)+101;
                    console.log(x);
                    await mine(nodes[selectedNode], x);
                     
                  }
                  else{
                    alert('Mempool is empty right now, wait until the transactions get added to mempool')
                    setLoading(false);
                  }
                
                  })
               }
               
              }}
             >
             <h2>mine block</h2>
             <img alt='' width={80} height={80} src='/icons/axe.png'/>      
            </div>
            {/* <div>
                <input type='text' readOnly={true} placeholder="Choose a node to mine this block"/>
            </div> */}
        </div>
    )
}