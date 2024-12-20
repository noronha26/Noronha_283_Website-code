import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateStories = () => {
  function handleClick(e) {
    e.preventDefault();
  }

  const nav=useNavigate();
  const{id}=useParams();
  // console.log(params);
const[storie,setStorie]=useState({});
const[filepath,setFilepath]=useState("");
const [thumbnailpriview, setThumbnailPriview] = useState(null);
const [secondaryThumbnailPreview, setSecondaryThumbnailPreview] =
  useState(null);

  const inputPriviewImage1 = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
   setStorie({ ...storie, thumbnail: file.name });
    setThumbnailPriview(url);

    console.log(thumbnailpriview);
  };

  const inputPriviewImage2 = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
  setStorie({ ...storie, secondary_thumbnail: file.name });
    setSecondaryThumbnailPreview(url);

    console.log(secondaryThumbnailPreview);
  };
  const fetchStories=()=>{
    axios
    .get(`${process.env.REACT_APP_API_URL}admin-panel/story/read-stories/${id}`)
    .then((response) => {
      console.log(response.data);
      setStorie(response.data.data);
      setFilepath(response.data.filepath);
    })
    .catch((error) => {
      console.log(error);
    });
  }

 useEffect(()=>{fetchStories()},[id]);

 const handleUpdateStories=(e)=>{
  e.preventDefault();
  axios
  .put(`${process.env.REACT_APP_API_URL}admin-panel/story/update-storie/${id}`,e.target)
  .then((response) => {
    console.log(response.data);
    let timerInterval;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 2000,
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
        nav('/dashboard/stories/view-story')
      }
    });


  })
  .catch((error) => {
    console.log(error);
  });

 };
 

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] text-[#303640] border-b rounded-[10px_10px_0_0] p-[8px_16px] text-[20px] font-bold">
        Update Stories
      </span>
      <div className="w-[90%] mx-auto">
        <form method="post" onSubmit={handleUpdateStories}>
          <div className="w-full my-[10px] ">
            <label htmlFor="story_name" className="block text-[#303640]">
              Story Name
            </label>
            <input
              type="text"
              id="story_name"
              name="name"
              value={storie.name}
              placeholder="Story Name"
              onChange={(e)=>{setStorie({...storie,name:e.target.value})}}
              className="w-full input p-2 border my-[10px] rounded-[5px]"
            />
          </div>
          <div className="w-full my-[10px] ">
            <label
              htmlFor="story_img"
              className="block text-[#303640]"
              onClickCapture={(e) => handleClick(e)}
            >
              Image
            </label>
            <input
              type="file"
              id="story_img"
              name="thumbnail"
              // value={storie.thumbnail}
              onChange={inputPriviewImage1}
              className="w-full input category border my-[10px] rounded-[5px]"
            />
             <img
              src={thumbnailpriview||filepath + storie.thumbnail}
              className="mt-3 w-[150px]"
              style={{ height: "170px" }}
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="story_banner_img"
              className="block text-[#303640]"
              onClickCapture={(e) => handleClick(e)}
            >
              Banner Image
            </label>
            <input
              type="file"
              id="story_banner_img"
              name=" secondary_thumbnail"
              onChange={inputPriviewImage2}
              // value={storie.secondary_thumbnail}
              className="w-full input category border my-[10px] rounded-[5px]"
            />
             <img
              src={secondaryThumbnailPreview||filepath + storie.secondary_thumbnail}
              className="mt-3 w-[150px]"
              style={{ height: "170px" }}
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="story_desc"
              className="block text-[#303640]"
              onClickCapture={(e) => handleClick(e)}
            >
              Description
            </label>
            <textarea
              type="file"
              id="story_desc"
              name=" description"
              value={storie.description}
              placeholder="Description"
              onChange={(e)=>{setStorie({...storie,description:e.target.value})}}
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
              id="status"
              value="true"
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="status"
              value="false"
              className="mx-[10px] accent-[#5351c9] cursor-pointer"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px] p-[10px_0px]">
            <button className=" rounded-md bg-[#5351c9] text-white p-2">
              Update Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStories;
