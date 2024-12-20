import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const StoryDetails = () => {
  const [priview1, setPriview1] = useState(" ");
  const [priview2, setPriview2] = useState(" ");
  // function handleClick(e) {
  //   e.preventDefault();
  // }
const navigate=useNavigate();
  
  const handlestories=(e)=>{
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}admin-panel/story/create-storie`,e.target)
    .then((response)=>{
      console.log(response.data);
      // alert('stories added')

      let timerInterval;
      Swal.fire({
        title: "Category added!",
        html: "You will be redirected to view page <b></b> milliseconds.",
        timer: 600,
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
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          // console.log("I was closed by the timer");
          navigate("/dashboard/stories/view-story");
        }
      });
    })
    .catch((error)=>{
      console.log(error)
      if (error.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Category already exists",
          text: "Please enter a different category",
        });
      }
    });
  };
  const inputPriviewImage1 = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPriview1(url);
  };
  const inputPriviewImage2 = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPriview2(url);
  };
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[#303640] border-b rounded-[10px_10px_0_0] p-[8px_16px] text-[20px] font-bold">
        Our Stories
      </span>
      <div className="w-[90%] mx-auto">
        <form method="post" onSubmit={handlestories}> 
          <div className="w-full my-[10px] ">
            <label htmlFor="story_name" className="block text-[#303640]">
              Story Name
            </label>
            <input
              type="text"
              id="story_name"
             name="name"
              placeholder="Story Name"
              className="w-full input p-2 border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px] ">
            <label
              htmlFor="story_img"
              className="block text-[#303640]"
              // onClickCapture={(e) => handleClick(e)}
            >
              Image
            </label>
            <input
              type="file"
              id="story_img"
              name="thumbnail"
              onChange={inputPriviewImage1}
              className="w-full input category border my-[10px] rounded-[5px]"
            />
               {priview1 && <img src={priview1} alt="" className="w-[150px]" />}
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="story_banner_img"
              className="block text-[#303640]"
              // onClickCapture={(e) => handleClick(e)}
            >
              Banner Image
            </label>
            <input
              type="file"
              id="story_banner_img"
              name="secondary_thumbnail"
              onChange={inputPriviewImage2}
              className="w-full input category border my-[10px] rounded-[5px]"
            />
               {priview2 && <img src={priview2} alt="" className="w-[150px]" />}
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="story_desc"
              className="block text-[#303640]"
              // onClickCapture={(e) => handleClick(e)}
            >
              Description
            </label>
            <textarea
              type="file"
              id="story_desc"
              name="description"
              placeholder="Description"
              className="w-full input p-2 category border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="status" className="mr-[20px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              value={true}
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              value={false}
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px] p-[10px_0px]">
            <button className="w-[100px] rounded-md bg-[#5351c9] text-white p-2">
              Add Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryDetails;
