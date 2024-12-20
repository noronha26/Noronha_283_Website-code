import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewSlider = () => {
  const [slider, setSlider] = useState([]);
  const [filepath, setFilepath] = useState("");
  const [checkedSlider, setcheckedSlider] = useState([]);
  const [ifAllChecked, setAllCchecked] = useState(false);

  const handleFetchSlider = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/slider/read-sliders`)
      .then((response) => {
        console.log(response.data);
        setSlider(response.data.data);
        setFilepath(response.data.filepath);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleFetchSlider();
  }, []);
  const handleUpdateSliderStatus = (e) => {
    // console.log(e.target.value,e.target.textContent)
    const status = e.target.textContent !== "Active";
    console.log(status);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}admin-panel/slider/update-SliderStaus/${e.target.value}`,
        { status }
      )
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Status updated",
          showConfirmButton: false,
          timer: 800,
        });
        handleFetchSlider();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hadledeleteSlider = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}admin-panel/slider/delete-slider/${id}`
          )
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Status updated",
              showConfirmButton: false,
              timer: 800,
            });
            handleFetchSlider();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const handleCheckeSlider = (e) => {
    // console.log(e.target.value,e.target.checked);
    const { value, checked } = e.target;
    if (checked) {
      setcheckedSlider([value, ...checkedSlider]);
    } else {
      setcheckedSlider(checkedSlider.filter((cat) => cat !== value));
    }
  };
  const handleAllcheckedSlider = (e) => {
    if (e.target.checked) {
      setcheckedSlider(slider.map((cat) => cat._id));
      setAllCchecked(true);
    } else {
      setcheckedSlider([]);
      setAllCchecked(false);
    }
  };

  useEffect(()=>{
setAllCchecked(slider.length===checkedSlider.length&&slider.length!==0);
  },[checkedSlider,slider])
  


  const handleDeleteAllslider = () => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}admin-panel/slider/delete-Allslider`,
            { checkedSlider }
          )
          .then((response) => {
            handleFetchSlider();
            // console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    console.log(checkedSlider);
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border ">
      <span className="block p-[8px_16px] bg-[#f8f8f9] text-[#303640] border-b text-[20px] font-bold rounded-[10px_10px_0_0]">
        View Slider
      </span>
      <div className="w-[90%] mx-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2 flex">
                <button
                  className=" bg-[#5351c9]  text-white font-light rounded-md p-1 w-[80px] h-[35px] mr-[10px] my-[10px]"
                  onClick={handleDeleteAllslider}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="deleteAll"
                  onClick={handleAllcheckedSlider}
                  className="input cursor-pointer accent-[#5351c9]"
                  checked={ifAllChecked}
                />
              </th>
              <th className="p-2">Sno</th>
              <th className="p-2">Slider Name</th>
              <th className="p-2">Heading</th>
              <th className="p-2">Sub Heading</th>
              <th className="p-2">Slider Image</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="my-status" />

            {slider.length === 0 ? (
              <div>No slider available</div>
            ) : (
              slider.map((sliders, index) => (
                <tr className="border-b" key={index}>
                  <td className="p-2">
                    <input
                      type="checkbox"
                      id="deleteAll"
                      name="deleteAll"
                      value={sliders._id}
                      onClick={handleCheckeSlider}
                      className="input cursor-pointer accent-[#5351c9]"
                      checked={checkedSlider.includes(sliders._id)}
                    />
                  </td>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 tracking-tighter">{sliders.name}</td>
                  <td className="p-2 tracking-tighter">{sliders.heading}</td>
                  <td className="p-2 tracking-tighter">
                    {sliders.sub_heading}
                  </td>
                  <td className="p-2 object-contain">
                    <img
                      src={filepath + sliders.thumbnail}
                      alt="slider img"
                      width={200}
                      height={200}
                      className="rounded-[5px]"
                    />
                  </td>
                  <td className="p-2">
                    <MdDelete
                      onClick={() => {
                        hadledeleteSlider(sliders._id);
                      }}
                      className="my-[5px] text-red-500 cursor-pointer inline"
                    />{" "}
                    |{" "}
                    <Link to={`/dashboard/slider/update-slider/${sliders._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td className="p-2 tracking-tighter">
                    <button
                      onClick={handleUpdateSliderStatus}
                      value={sliders._id}
                      data-tooltip-id="my-status"
                      data-tooltip-content={`click to ${
                        sliders.status ? "Inactive" : "Active"
                      }`}
                      className={`p-1 rounded-sm border ${
                        sliders.status ? "bg-green-500" : "bg-red-500"
                      } text-white`}
                    >
                      {sliders.status ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSlider;
