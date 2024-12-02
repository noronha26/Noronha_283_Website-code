import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddSizes = () => {
  const nav = useNavigate();
  const handelCreateSize = (e) => {
    e.preventDefault();
    axios
      .post(
        // `http://localhost:4800/api/admin-panel/parent-size/create-size`,
        // e.target
        `${process.env.REACT_APP_API_URL}admin-panel/parent-size/create-size`,
        e.target
      )
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
            
            nav("/dashboard/size/view-sizes");
          }
        });

        // alert("Category created successfully");
        // nav("/dashboard/size/view-sizes");
        
      })
      .catch((error) => {
        console.error(error);
        if(error.status===400) 
          // console.log(error.data);
        Swal.fire({
          title: "The Category already exists!",
          text: "Please enter the new Category",
          icon: "question"
        });
      });
  };
  return (
    <div className="w-[90%] my-[150px] mx-auto bg-white rounded-[10px] border">
      <span className="block bg-[#f8f8f9] h-[50px] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[25px] font-[700] text-[#303640]">
        Add Size
      </span>
      <form method="post" onSubmit={handelCreateSize}>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Name
          </label>
          <input
            type="text"
            name="name"
            id="size"
            placeholder="Size Name"
            className="w-full input rounded-[5px] p-2 border my-[10px]"
          />
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2]">
            Size Order
          </label>
          <input
            type="text"
            name="size"
            id="size_order"
            placeholder="Size Order"
            className="w-full input rounded-[5px] p-2 border my-[10px]"
          />
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <label htmlFor="size" className="text-[#252b36f2] mr-[30px]">
            Status
          </label>
          <input
            type="radio"
            name="status"
            id="size"
            value={true}
            placeholder="Size Name"
            className="my-[10px] mx-[20px] accent-[#5351c9]"
          />
          <span>Display</span>
          <input
            type="radio"
            name="status"
            id="size"
            value={false}
            placeholder="Size Name"
            className="my-[10px] mx-[20px] accent-[#5351c9]"
            checked
          />
          <span>Hide</span>
        </div>
        <div className="w-full p-[8px_16px] my-[10px] ">
          <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
            Add Size
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSizes;
