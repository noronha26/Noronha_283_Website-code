"use client";
import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { BsBagPlus } from "react-icons/bs";
import Login from "../modals/Login";
import Cart from "../pages/cart/page";
import MobileSideBar from "../modals/MobileSideBar";
import Link from "next/link";
import {
  MenMegaMenu,
  OurStoryMegaMenu,
  ThisJustInMegaMenu,
  WomenMegaMenu,
} from "./MegaMenu";
import TextSlider from "./TextSlider";
import { useDispatch, useSelector } from "react-redux";
import { verifyLogin } from "../redux/slices/userSlice";
import Cookies from "js-cookie";
import { fetchParentCategory } from "../redux/slices/parentCategoryslices";
import { fetchProductCategory } from "../redux/slices/productCategorySlices";
import { fetchCart } from "../redux/slices/cartSlice";

export default function Header() {
  let [loginStatus, setLoginStatus] = useState(false);
  let [cartStatus, setCartStatus] = useState(false);
  let [menuHover, setMenuHover] = useState(0);
  let [sidebarStatus, setSidebarStatus] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [user, setUser] = useState({});
  const [totalItems, setTotalItems] = useState(null);

  const dispatch = useDispatch();

  // const user=useSelector((state)=>state.user.value);
  const category = useSelector((state) => state.parentCategory.value);
  const userData = useSelector((state) => state.user.value);
  const cartData = useSelector((state) => state.cart.value);
  // console.log('user =====>',user);
  // console.log("category=====>", category);

  useEffect(() => {
    if (category.data) setParentCategories(category.data);
  }, [category]);

  useEffect(() => {
    if (userData.data) setUser(userData.data);
    // console.log('user=>',userData)
  }, [userData]);

  useEffect(() => {
    console.log("cartData", cartData);
    // if (userData.data) 
    if (Array.isArray(cartData.data)) 

      {
      //   setUser(userData.data)
      // console.log('user=>',userData)
      // if(cartData.data)


      // let total = 0;
      // cartData.data.forEach((cartItem) => {
      //   total += cartItem.quantity;
      // });

      const total = cartData.data.reduce((sum, item) => sum + item.quantity, 0);
      console.log("Total items:", total);
      console.log("Total quantity: ", total);
      setTotalItems(total);
    }
    else {
      console.log("Cart data is not an array:", cartData.data);
      // Handle the case where cartData.data is not an array, e.g., reset the total
      let total = 0; 
      console.log("Total quantity: ", total);
    }

  }, [cartData]);

  useEffect(() => {
    dispatch(fetchParentCategory());
    dispatch(fetchProductCategory());
    const auth = Cookies.get("frank_user_auth");
    if (!auth) return;
    dispatch(verifyLogin(auth));
  }, [dispatch]);

  useEffect(() => {
    if (user._id)
      // console.log('user===>',user._id)
      dispatch(fetchCart(user._id));
  }, [user]);

  return (
    <div className="fixed top-0 z-[999999] w-full">
      <TextSlider />
      <header className="shadow-md py-2 lg:py-1 px-2 sm:px-4 md:px-10 bg-red-300 flex justify-between">
        {/* this div is for frank and oak */}
        <div className=" bg-cyan-100 flex gap-2 sm:gap-4 items-center  basis-[70%] md:basis-[20%] lg:basis-[15%]">
          <RxHamburgerMenu
            onClick={() => setSidebarStatus(true)}
            className="sm:hidden block w-[22px] h-7"
          />
          <MobileSideBar sidebarStatus={sidebarStatus} />
          <span className="font-bold md:text-[18px] text-[15px]">
          <Link href={`/HomeComponents/Banner`}> Frank And Oak</Link> 
          </span>
        </div>
        {/* this is a navbar */}
        <nav className=" basis-[30%] lg:basis-[84%] md:basis-[75%]  flex items-center justify-end lg:justify-between">
          <div className="lg:block  hidden">
            <ul className="flex gap-6 text-[15px] font-medium">
              {parentCategories.map((cat, index) => (
                <li
                  key={index}
                  onMouseOver={() => setMenuHover(1)}
                  onMouseOut={() => setMenuHover(0)}
                  className="hover:bg-[#F9F9F9] cursor-pointer hover:underline underline-offset-4 px-3 duration-500 p-2"
                >
                  <Link href={`/collections/${cat.name}`}>{cat.name}</Link>
                  <ThisJustInMegaMenu
                    menuHover={menuHover}
                    setMenuHover={setMenuHover}
                  />
                </li>
              ))}

              {/* <li
                onMouseOver={() => setMenuHover(2)}
                onMouseOut={() => setMenuHover(0)}
                className="hover:bg-[#F9F9F9] cursor-pointer hover:underline underline-offset-4 px-3 duration-500 p-2"
              >
                Women
                <WomenMegaMenu
                  menuHover={menuHover}
                  setMenuHover={setMenuHover}
                />
              </li> */}
              {/* <li
                onMouseOver={() => setMenuHover(3)}
                onMouseOut={() => setMenuHover(0)}
                className="hover:bg-[#F9F9F9] cursor-pointer hover:underline underline-offset-4 px-3 duration-500 p-2"
              >
                Men
                <MenMegaMenu
                  menuHover={menuHover}
                  setMenuHover={setMenuHover}
                />
              </li> */}
              <li
                onMouseOver={() => setMenuHover(4)}
                onMouseOut={() => setMenuHover(0)}
                className="hover:bg-[#F9F9F9] cursor-pointer hover:underline underline-offset-4 px-3 duration-500 p-2"
              >
                Our Story
                <OurStoryMegaMenu
                  menuHover={menuHover}
                  setMenuHover={setMenuHover}
                />
              </li>
            </ul>
          </div>
          <ul className="flex gap-3 sm:gap-5">
            <li>
              <Link href={"/pages/search"}>
                <CiSearch className="sm:w-7 sm:h-7 h-5 w-5" />
              </Link>
            </li>
            <li className="cursor-pointer" onClick={() => setLoginStatus(true)}>
              <FaRegUserCircle className="sm:w-[22px]  sm:h-7 h-5 w-[18px] " />
              <Login
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
              />
            </li>
            <li>
              <Link href={"/user-dashboard/wishlist"}>
                <FaRegHeart className="sm:w-[22px] sm:h-7 h-5 w-[18px] cursor-pointer" />
              </Link>
            </li>
            <li className="cursor-pointer relative">
              {/* this is procdedure to show the product */}
              <BsBagPlus
                onClick={() => setCartStatus(true)}
                className="sm:w-[22px] sm:h-7 h-5 w-[18px]"
              />
              <div className="absolute bottom-[40%] left-[86%]">
                {totalItems > 0 ?totalItems: ""}
              </div>
              <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
