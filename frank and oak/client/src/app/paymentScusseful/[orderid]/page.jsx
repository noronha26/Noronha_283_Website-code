"use client";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
    const nav=useRouter();
    const{orderid}=useParams();

   
  const [seconds, setSeconds] = useState(10);

  const timeCount = () => {
    let counter=9;
    const timespan = setInterval(() => {
     
      setSeconds(counter);
      counter--;
      console.log(counter);

      if (counter <= 0) {
        clearInterval(timespan);
        nav.push('/');
      }
    }, 1000);
  };
  useEffect(() => {
    timeCount();
    if(!orderid) return;
    axios.put(`${process.env.NEXT_PUBLIC_URL}/payment/update-payment-status/${orderid}`,{status:'successfull'})
    .then((response)=>{
        console.log(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })



  }, [orderid]);
  return (
    <div className="py-[120px]">
      <div className="flex flex-col items-center justify-center h-[40vh] ">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">
          Payment successfull
        </h1>
        <div>
          <h2>You will be redirect to Home Page in {seconds} seconds</h2>
          <h4>
            <Link href={"/"}>Continue shopping</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default page;
