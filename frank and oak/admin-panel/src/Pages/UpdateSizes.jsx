import axios from "axios";

import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateSizes = () => {
  const {id} =useParams();
  // console.log(params)
  const nav=useNavigate();
  const [size,setSize]=useState({});

  const fetchSize=()=>{
   axios .get(`${process.env.REACT_APP_API_URL}admin-panel/parent-size/read-sizes/${id}`)
   .then((response)=>{
    console.log(response.data)
    setSize(response.data.data);
   })
   .catch((error)=>{
    console.log(error);
   })
  };

  useEffect(()=>{
    fetchSize();
  },[id]);
const handleUpdateSize=(e)=>{
  e.preventDefault();
  axios .put(`${process.env.REACT_APP_API_URL}admin-panel/parent-size/update-size/${id}`,e.target)
  .then((response)=>{
   console.log(response.data)
 
   let timerInterval;
Swal.fire({
  title: "Category Updated!",
  html: "I will close in <b></b> milliseconds.",
  timer: 800,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    nav('/dashboard/size/view-sizes');
  }
  setSize(response.data.data);
});
  })
  .catch((error)=>{
   console.log(error);
  })

};

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[20px] font-bold p-[8px_16px] text-[#303640] border-b rounded-[10px_10px_0_0]">
        Update Size
      </span>
      <div className="w-[95%] mx-auto my-[20px]">
        <form method="post " onSubmit={handleUpdateSize}>
          <div>
            <label htmlFor="size" className="block text-[#252b36f2]">
              Size Name
            </label>
            <input
              type="text"
              id="size"
              name="name"
              value={size.name}
              placeholder="Size Name"
              onChange={(e)=>{setSize({...size,name:e.target.value})}}
              className="input p-2 border my-[20px] w-full rounded-[5px]"
            />
            <div className="w-full my-[10px] ">
              <label htmlFor="size" className="text-[#252b36f2] block">
                Size Order
              </label>
              <input
                type="text"
                name="size"
                id="updated_size_order"
                placeholder="Size Order"
                value={size.size}
                onChange={(e)=>{setSize({...size,size:e.target.value})}}
                className="w-full input rounded-[5px] p-2 border my-[10px]"
              />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="status" className="mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              id="status"
              name="status"
              value="0"
              className="accent-[#5351c9] mx-[10px]"
            />
            <span>Display</span>
            <input
              type="radio"
              id="status"
              name="status"
              value="1"
              className="accent-[#5351c9] mx-[10px]"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px]">
            <button className="w-[100px] rounded-[10px] bg-[#5351c9] border-none cursor-pointer text-white h-[30px]">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSizes;
