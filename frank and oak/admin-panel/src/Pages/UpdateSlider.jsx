import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateSlider = () => {
  const nav=useNavigate();
  const[slider,setSlieder]=useState({});
  const[filepath,setFilepath]=useState("");
  const [thumbnailpriview, setThumbnailPriview] = useState(null);
  

    const{id}=useParams();
    // console.log(params);
    console.log(id)
  
    const inputPriviewImage = (e) => {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setSlieder({ ...slider, thumbnail: file.name });
      setThumbnailPriview(url);
  
      console.log(thumbnailpriview);
    };

  const fetchSlider=()=>{
    axios
    .get(`${process.env.REACT_APP_API_URL}admin-panel/slider/read-slider/${id}`)
    .then((response) => {
      console.log(response.data);
      setSlieder(response.data.data);
      setFilepath(response.data.filepath);
    })
    .catch((error) => {
      console.log(error);
    });
  };

 useEffect(()=>{fetchSlider()},[id]);


 const handleUpdateSlider=(e)=>{
  e.preventDefault();
  axios
  .put(`${process.env.REACT_APP_API_URL}admin-panel/slider/update-slider/${id}`,e.target)
  .then((response) => {
    console.log(response.data);
    let timerInterval;
    Swal.fire({
      title: "Auto close alert!",
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
        nav('/dashboard/slider/view-slider')
      }
    });


  })
  .catch((error) => {
    console.log(error);
  });

 };
 


  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] p-[8px_16px] text-[#303640] text-[20px] font-bold border-b rounded-[10px_10px_0_0]">
        Update Slider
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={ handleUpdateSlider}>
          <div className="w-full my-[10px]">
            <label htmlFor="slider_name" className="block text-[#303640]">
              Slider Name
            </label>
            <input
              type="text"
              id="slider_name"
              name="name"
              value={slider.name}
              onChange={(e)=>{setSlieder({...slider,name:e.target.value})}}
              placeholder="Slider Name"
              className="w-full rounded-[10px] p-2 my-[10px] border input"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="slider_heading" className="block text-[#303640]">
              Heading
            </label>
            <input
              type="text"
              id="slider_heading"
              name="heading"
              value={slider.heading}
              onChange={(e)=>{setSlieder({...slider,heading:e.target.value})}}
              placeholder="Heading"
              className="w-full rounded-[10px] p-2 my-[10px] border input"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="slider_sub_heading"
              className="block text-[#303640]"
            >
              Sub Heading
            </label>
            <input
              type="text"
              id="slider_sub_heading"
              name="sub_heading"
              placeholder="Sub Heading"
              value={slider.sub_heading}
              onChange={(e)=>{setSlieder({...slider,sub_heading:e.target.value})}}
              className="w-full rounded-[10px] p-2 my-[10px] border input"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="slider_img"
              className="block text-[#303640]"
              onClick={(e) => e.preventDefault()}
            >
              Sub Heading
            </label>
            <input
              type="file"
              id="slider_img"
              name="thumbnail"
              onChange={inputPriviewImage}
              className="w-full rounded-[10px] my-[10px] border input category"
            />
             <img
              src={thumbnailpriview||filepath + slider.thumbnail}
              className="mt-3 w-[150px]"
              style={{ height: "170px" }}
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="slider_status">Status</label>
            <input
              type="radio"
              className="input mx-[10px] accent-[#5351c9] cursor-pointer"
              id="status"
              name="status"
              value="true"
            />
            <span>Display</span>
            <input
              type="radio"
              className="input mx-[10px] accent-[#5351c9] cursor-pointer"
              id="status"
              name="status"
              value="false"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[30px]">
            <button className=" rounded-[10px] bg-[#5351c9] text-white p-2">
              Update Slider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSlider;
