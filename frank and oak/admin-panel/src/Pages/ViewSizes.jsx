import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
// import { response } from "express";

const ViewSizes = () => {
  const [sizes, setSizes] = useState([]);
  const [checkedSize, setCheckedSize] = useState([]);
  const [ifAllChecked, setAllChecked] = useState([false]);

  const handelFetchSize = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/parent-size/read-size`)
      .then((response) => {
        console.log(response.data);

        setSizes(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handelFetchSize();
    //  console.log(process.env.REACT_APP_API_URL);
  }, []);

  const handleUpdateSizes = (e) => {
    // console.log(e.target.value,e.target.textContent);

    const status = e.target.textContent !== "Active";
    axios
      .put(
        `${process.env.REACT_APP_API_URL}admin-panel/parent-size/update-size-status/${e.target.value}`,
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
        handelFetchSize();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteSize = (id) => {
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
            `${process.env.REACT_APP_API_URL}admin-panel/parent-size/deleteParentSize/${id}`
          )
          .then((response) => {
            console.log(response.data);
            handelFetchSize();
          })
          .catch((error) => {
            console.log(error);
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleCheckedSize = (e) => {
    const {value, checked} = e.target;
    if (checked) {
      setCheckedSize([value, ...checkedSize]);
    } else {
      setCheckedSize(checkedSize.filter((cat) => cat !== value));
    }

    console.log(e.target.value, e.target.checked);
  };

  const handleAllCheckedSize = (e) => {
    if(e.target.checked) {
      setCheckedSize(sizes.map((cat) => cat._id));
      setAllChecked(true);
    } else {
      setCheckedSize([]);
      setAllChecked(false);
    }
  };
  // const handleAllCheckedSize=(e)=>{
  //   if(e.target.checked){
  //     setCheckedSize(sizes.map((cat) => cat._id))

  //     setAllChecked(true)

  //   }
  //   else{
  //     setCheckedSize([]);
  //     setAllChecked(false)
  //   }

  // }
  useEffect(() => {
    setAllChecked(sizes.length === checkedSize.length && sizes.length !== 0);
  }, [checkedSize, sizes]);

  const hadleDeleteSize = () => {

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
            `${process.env.REACT_APP_API_URL}admin-panel/parent-size/deleteParentAll-size`,{checkedSize}
          )
          .then((response)=>{
            handelFetchSize();
            // console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch((error)=>{
            console.log(error);
          })
       
      }
    });
    // console.log(checkedSize);
  };


  return (
    <div className="w-[90%] bg-white mx-auto border rounded-[10px] my-[150px]">
      <span className="block border-b rounded-[10px_10px_0_0] bg-[#f8f8f9] text-[#303640] h-[50px] p-[8px_16px] text-[23px] font-bold">
        View Size
      </span>
      <div className="w-[90%] mx-auto">
        <table className="w-full my-[20px]">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-400 rounded-sm px-2npy-1"
                  onClick={hadleDeleteSize}
                >
                  Delete
                </button>

                <input
                  type="checkbox"
                  name="deleteAll"
                  onClick={handleAllCheckedSize}
                  className="m-[0_10px] accent-[#5351c9] cursor-pointer input"
                  checked={ifAllChecked}
                />
              </th>
              <th>Sno</th>
              <th>Size Name</th>
              <th>Size Order</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="status-tooltip" />
            {sizes.length === 0 ? (
              <div>No Parent Size available</div>
            ) : (
              sizes.map((size, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      value={size._id}
                      onClick={handleCheckedSize}
                      
                      className="accent-[#5351c9] cursor-pointer input"
                     checked={checkedSize.includes(size._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{size.name}</td>
                  <td>{size.size}</td>
                  <td className="flex gap-[5px]">
                    <MdDelete
                      onClick={() => {
                        handleDeleteSize(size._id);
                      }}
                      className="my-[5px] text-red-500 cursor-pointer"
                    />{" "}
                    |{" "}
                    <Link to={`/dashboard/sizes/update-size/${size._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer" />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={handleUpdateSizes}
                      value={size._id}
                      data-tooltip-id="status-tooltip"
                      data-tooltip-content={`Click to ${
                        size.status ? "Inactive" : "Active"
                      }`}
                      className={`p-[4px_10px] rounded-sm border ${
                        size.status ? "bg-green-800" : "bg-red-600"
                      }  text-white`}
                    >
                      {size.status ? "Active" : "Inactive"}
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

export default ViewSizes;
