//TEMP --------------
import axios from "axios";

export default async function replaceChain(){
   let node = 1; 
   let nodeApi = 'https://tachyon-node-'+node+'.uxnation.repl.co/' 
   
   await axios.get(nodeApi+'get-chain/').then(async res=>{
       res.data.nodes.map(async x=>{
           return await axios.get(x+'replace-chain');
       })
   })
}