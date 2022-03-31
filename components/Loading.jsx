import React,{useEffect, useState} from "react";

export default function Loading(props){ 
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(props.isLoading);
      },[props.isLoading])
    return(
       <div style={{display:isLoading?'block':'none'}} className="loading">
           
           <div className="Loader"></div>
       </div> 
    )
}