import axios from "axios";
// import { response } from "express";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";


const ViewColor = () => {
  const [colors, setColors] = useState([]);
  const [checkedColors, setCheckedColors] = useState([]);
  const [ifAllchecked, setAllchecked] = useState(false);

  const handleFetchColor = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}admin-panel/parent-color/read-colors`
      )
      // axios.get(`${process.env.REACT_APP_API_URL}admin-panel/parent-color/read-colors`)
      .then((response) => {
        console.log(response.data);
        setColors(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleFetchColor();
    // console.log(process.env.REACT_APP_API_URL);
  }, []);

  const handleUpdatecolorStatus = (e) => {
    console.log(e.target.value, e.target.textContent);
    const status = e.target.textContent !== "Active";
    console.log("Setting status to:", status, e.target.value);

    // return;

    axios
      .put(
        `${process.env.REACT_APP_API_URL}admin-panel/parent-color/update-colorupdates/${e.target.value}`,
        { status }
      )

      .then((response) => {
        console.log(response.data);
        handleFetchColor();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your status updated",
          showConfirmButton: false,
          timer: 800,
        });

        // console.log(status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteColor = (id) => {
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
            `${process.env.REACT_APP_API_URL}admin-panel/parent-color/delete-colors/${id}`
          )
          .then((response) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            console.log(response.data);

            handleFetchColor();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const handleCheckColor = (e) => {
    const { value, checked } = e.target;
    console.log(e.target.value, e.target.checked);
    if (checked) {
      setCheckedColors([value, ...checkedColors]);
    } else {
      setCheckedColors(checkedColors.filter((cat) => cat !== value));
    }
  };
  const handelAllColors = (e) => {
    if (e.target.checked) {
      setCheckedColors(colors.map((cat) => cat._id));
      setAllchecked(true);
    } else {
      setCheckedColors([]);
      setAllchecked(false);
    }
  };
  useEffect(() => {
    setAllchecked(
      colors.length === checkedColors.length && colors.length !== 0
    );
  }, [checkedColors, colors]);
  const handelMultiDeletecolors = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}admin-panel/parent-color/delete-Allcolors/`,{checkedColors}
          )
          .then((response)=>{
            // console.log(response)
            handleFetchColor();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch((error)=>{
            console.log(error)
          })
       
      }
    });
    // console.log(checkedColors);
  };

  return (
    <div className="w-[90%] bg-white rounded-[10px] border mx-auto my-[150px]">
      <span className="block h-[40px] border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] p-[8px_16px] text-[20px]">
        View Color
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex p-2">
                <button
                  onClick={handelMultiDeletecolors}
                  className="bg-[#5351c9] font-light text-white rounded-md p-1 w-[80px] h-[35px] my-[10px] mr-[10px]"
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  onClick={handelAllColors}
                  className="cursor-pointer accent-[#5351c9] input"
                  checked={ifAllchecked}
                />
              </th>
              <th className="p-2">Sno.</th>
              <th className="p-2">Color Name</th>
              <th className="p-2">Color</th>
              <th className="p-2">Action</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="status-tooltip" />
            {colors.length === 0 ? (
              <div>No Parent colors Available</div>
            ) : (
              colors.map((color, index) => (
                <tr className="border-b" key={index}>
                  <td className="p-2">
                    <input
                      type="checkbox"
                      name="delete"
                      value={color._id}
                      onClick={handleCheckColor}
                      className="cursor-pointer accent-[#5351c9] input"
                      checked={checkedColors.includes(color._id)}
                    />
                  </td>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{color.color}</td>
                  <td className="p-2">
                    {color.color_code}
                    {/* <div className="w-[90%] mx-auto h-[20px] bg-red-500 border"></div> */}
                  </td>
                  <td className="p-2">
                    <MdDelete
                      onClick={() => {
                        handleDeleteColor(color._id);
                      }}
                      className="my-[5px] text-red-500 cursor-pointer inline"
                    />{" "}
                    |{" "}
                    <Link to={`/dashboard/color/update-colors/${color._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={handleUpdatecolorStatus}
                      value={color._id}
                      data-tooltip-id="status-tooltip"
                      data-tooltip-content={`Click to ${
                        color.status ? "Inactive" : "Active"
                      }`}
                      className={`p-[4px_10px] rounded-sm border ${
                        color.status ? " bg-green-600" : "bg-red-600"
                      } text-black`}
                    >
                      {color.status ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))
            )}

            {/* <tr className="border-b"> */}
            {/* <td className="p-2">
                <input
                  type="checkbox"
                  name="delete"
                  className="cursor-pointer accent-[#5351c9] input"
                />
              </td> */}
            {/* <td className="p-2">3</td>
              <td className="p-2">blue</td> */}
            {/* <td className="p-2">
                <div className="w-[90%] mx-auto h-[20px] bg-blue-500 border"></div>
              </td> */}
            {/* <td className="p-2">
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to="/dashboard/color/update-colors">
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td> */}
            {/* <td className="p-2">
                <button className="bg-green-600 text-white font-light rounded-md p-1 w-[80px] h-[35px] cursor-pointer">
                  Active
                </button>
              </td> */}
            {/* </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewColor;
