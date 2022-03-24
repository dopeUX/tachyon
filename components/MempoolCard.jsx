import react from "react";

export default function mempoolCard(props){
  return (
      <div className="card">
         <h2>Sender : <span>{props.sender}</span></h2>
         <h2>Recipient : <span> {props.recipient}</span></h2>
         <h2>Amount in dollars : <span>{props.amount}</span></h2>
      </div>
  );

}