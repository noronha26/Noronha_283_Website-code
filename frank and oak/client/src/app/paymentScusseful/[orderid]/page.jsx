"use client";

import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCart} from "@/app/redux/slices/cartSlice";

function page() {
  const dispatch = useDispatch();
  const nav = useRouter();
  const { orderid } = useParams();
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  const [seconds, setSeconds] = useState(10);
  const [isCleared, setIsCleared] = useState(false); // To prevent duplicate calls
  const userData = useSelector((state) => state.user.value);
  const cartData = useSelector((state) => state.cart.value);
  const cartItems = cartData?.data || []; 
  // const cartItems = useSelector((state) => state.cart.value.data || []);
  // console.log("User data from Redux:", user);
  // console.log("Updated Cart from Redux:", cartData); 


  // useEffect(() => {
  //   if (cart.length === 0) {
  //     // Optional: Display an empty cart message
  //     console.log("Your cart is empty!");
  //   }
  // }, [cart]); // Re-run when cart state changes

  useEffect(() => {
    console.log("userData before setting user:", userData);
    if (userData?.data) {
      setUser(userData.data);
    }
    console.log("userData After setting user:", userData);
  }, [userData]);

  useEffect(() => {
    if(cartData?.data)
    setCart(cartData.data);
    console.log("it si a cartdata====>", cartData);
  }, [cartData]);

  const timeCount = () => {
    let counter = 9;
    const timespan = setInterval(() => {
      setSeconds(counter);
      counter--;
      console.log(counter);

      if (counter <= 0) {
        clearInterval(timespan);
        nav.push("/");
      }
    }, 1000);
  };

  // Clear cart and handle payment status
  useEffect(() => {
    if (!orderid || isCleared || !user._id) return;


    const clearCart = async () => {
      try {
        if (!user || !user._id) {
          console.log("User ID is missing or not available.",user);
          return;
        }
        setIsCleared(true); // Ensure only one call to clearCart
        // Update payment status
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_URL}/payment/update-payment-status/${orderid}`,
          {
            status: "successful",
          }
        );
        console.log("Paymentsuccess=====>", response.data);

        // Call clear-cart endpoint
        console.log("User ID before API call:", user?._id); // Debug: Check userId in frontend
        const data = await axios.put(
          `${process.env.NEXT_PUBLIC_URL}/payment/clear-cart`,
          { userId: user._id }
        )
        
        console.log("userdata=====>", user);
        console.log("CartCleared=====>", data.data);

        console.log("User ID:", user._id); 
      



//This need to solve


  const updatedCart = await axios.get(
          
    `${process.env.NEXT_PUBLIC_URL}/cart/${user._id}`
  )
  console.log("Updated cart data:", updatedCart);
  dispatch(fetchCart(user._id)); // Dispatch Redux action here
  setCart(updatedCart); // Assuming setCart is your function to update cart state


  console.log("Cart successfully updated in state.");

}


catch (error) {
  console.error("Error clearing the cart:",error.response || error.message);
}

};
        

        // 3. Update frontend state (using Redux or component state)


    // Start timer and clear cart logic
    timeCount();
    clearCart();
  }, [orderid, user, isCleared,dispatch]);

  // useEffect(()=>{
  //   axios.put(`${process.env.NEXT_PUBLIC_URL}/payment/clear-cart/${orderid}`,{status:'successfull',
  //   })
  // },[orderid])

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
      <div className="flex flex-col items-center justify-center h-[40vh] ">
      <h1  className="text-3xl font-bold text-center mb-4 text-blue-600">Your Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p  className="text-3xl font-bold text-center mb-4 text-red-500">Your cart is empty.</p>
      )}
    </div>
    </div>
    
  );
}

export default page;
