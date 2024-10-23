import React, { useEffect, useState } from 'react'
 import './List.css';
 import axios from 'axios';
import { toast } from 'react-toastify';
const List = () => {
  const url='http://localhost:3000';

  const [list, setlist]=useState([]);


  const fetchlist=async()=>{
  
    const response=await  axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if(response.data.success){
      setlist(response.data.data);
    }
    else{
      toast.error("error")
    }
  }
 const removeFood=async(foodid)=>{
  const response=await axios.post(`${url}/api/food/remove`,{id:foodid});
    await fetchlist();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error("error")
    }
 }
  useEffect(()=>{
    fetchlist();
  })
  return (
    <div className=' list add flex-col'>
    <p>All food List</p>
     <div className='list-table'>
       <div className='list-table-formate title'>
         <b>Image</b>
         <b>Name</b>
         <b>Category</b>
         <b>price</b>
         <b>Action</b>
       </div>
       {list.map((item, index)=>{
        return(
         <div key={index} className='list-table-formate'>
           <img src={`${url}/images/`+item.image}/>
           <p>{item.name}</p>
           <p>{item.category}</p>
           <p>${item.price}</p>
           <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
         </div>

        )
       })}
     </div>
    </div>
  )
}

export default List