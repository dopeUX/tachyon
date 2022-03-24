import axios from "axios";
import react,{useEffect, useState} from "react";
import getTransactions from "./functions/getTransactions";

export default function mineBlock(){
  const nodes = [
     'Slytherine',
     'Gryffindor',
     'HufflePuff'

  ]
  const [selectedNode, setSelectedNode] = useState();
  
  useEffect(()=>{
  
  },[])

  async function mine(n,ran){
     const node = selectedNode+1;
     const nodeApi = 'http://localhost:300'+node;
     const api = nodeApi+"/mine-block/"; 
     const s = {
       params:{
         miner:n,
         random:ran
       }
     }
     await axios.get(api,s).then(async(res)=>{
       if(res.status===200){
         await axios.get(nodeApi+"/get-chain/").then(async(res)=>{
           res.data.nodes.map(async x=>{
               return await axios.get(x+'replace-chain/').then(response=>{
                   console.log(response);
               }) 
           })
         }) 
       }
     })
  }
    return (
        <div className="mine-block">
            <h1>Mine Block</h1>
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
               getTransactions().then(res=>{
                 if(res.transaction===[]){
                   alert('mempool is empty... cannot initiate mining');
                 }
                 else{
                   if(selectedNode!==undefined){
                     let x = Math.floor(Math.random()*501)+1
                     mine(nodes[selectedNode], x);
                   }
                   else{
                     alert('please select a node to mine')
                   }
                 }
               })
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