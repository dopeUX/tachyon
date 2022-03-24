import react from "react";

export default function BlockchainCard(props){
    return (
       <div className="card">
           <h2>Index : <span>{props.item.index}</span></h2>
           <h2>Time : <span>{props.item.timestamp}</span></h2>
           <h2>Proof : <span>{props.item.proof}</span></h2>
           <h2>Miner : <span>{props.item.miner}</span></h2>
           <h2>Data </h2>
           {
               props.item.transaction.map((item, index)=>{
                   return (
                    <div key={index} className="blockchain-card-transactions">
                      <h2>sender : <span>{item.sender} </span></h2>
                      <h2>receiver : <span>{item.receiver}</span></h2>
                      <h2>amount : <span>{item.amount+" $"}</span></h2>
                    </div>
                   )
               })
           }
           <h2>Previous hash : <span>{props.item.previousHash}</span></h2>
       </div> 
    )
}