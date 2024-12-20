import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Swal from "sweetalert2";

const ViewStory = () => {
  let [showDesc1, setShowDesc1] = useState(false);
  const [storie, setStorie] = useState([]);
  const [filepath, setFilepath] = useState("");
  const [checkedStorie, setCheckedStorie] = useState([]);
  const [ifAllChecked, setAllCchecked] = useState(false);

  const handleFetchStories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/story/read-story`)
      .then((response) => {
        console.log(response.data);
        setStorie(response.data.data);
        setFilepath(response.data.filepath);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleFetchStories();
  }, []);

  const handleUpdateStorieStatus = (e) => {
    // console.log(e.target.value,e.target.textContent);
    const status = e.target.textContent !== "Active";
    // console.log(status);

    axios
      .put(
        `${process.env.REACT_APP_API_URL}admin-panel/story/update-StorieStatus/${e.target.value}`,
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
        handleFetchStories();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const hadledeleteStories = (id) => {
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
            `${process.env.REACT_APP_API_URL}admin-panel/story/delete-storie/${id}`
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
            handleFetchStories();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleCheckStorie = (e) => {
    const { value, checked } = e.target;
    // console.log(e.target.value,e.target.checked);

    if (checked) {
      setCheckedStorie([value, ...checkedStorie]);
    } else {
      setCheckedStorie(checkedStorie.filter((cat) => cat !== value));
    }
  };

  const handleAllCheckStorie = (e) => {
    if (e.target.checked) {
      setCheckedStorie(storie.map((cat) => cat._id));
      setAllCchecked(true);
    } else {
      setCheckedStorie([]);
      setAllCchecked(false);
    }
  };

  useEffect(() => {
    setAllCchecked(
      storie.length === checkedStorie.length && storie.length !== 0
    );
  }, [checkedStorie, storie]);

  const handleDeleteStories = () => {
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
            `${process.env.REACT_APP_API_URL}admin-panel/story/delete-stories`,
            { checkedStorie }
          )
          .then((response) => {
            handleFetchStories();
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
    console.log(checkedStorie);
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block p-[8px_16px] text-[20px] text-[#303640] font-bold bg-[#f8f8f9] border-b rounded-[10px_10px_0_0]">
        View Stories
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-400 rounded-sm px-2 py-1"
                  onClick={handleDeleteStories}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAll"
                  onClick={handleAllCheckStorie}
                  className="accent-[#5351c9] cursor-pointer input"
                  checked={ifAllChecked}
                />
              </th>
              <th>Sno</th>
              <th>Story Name</th>
              <th>Image</th>
              <th>Banner</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* this is the info when there is no stories available */}
            <Tooltip id="my-status" />
            {storie.length === 0 ? (
              <div>No stories available</div>
            ) : (
              storie.map((stories, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete"
                      value={stories._id}
                      onClick={handleCheckStorie}
                      className="accent-[#5351c9] cursor-pointer input"
                      checked={checkedStorie.includes(stories._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{stories.name}</td>
                  <td className="object-contain p-1">
                    <img
                      src={filepath + stories.thumbnail}
                      alt="story img"
                      width={80}
                      height={80}
                      className="rounded-[5px]"
                    />
                  </td>
                  <td className="p-1 object-contain">
                    <img
                      src={filepath + stories.secondary_thumbnail}
                      alt="story img"
                      width={150}
                      height={150}
                      className="rounded-[5px]"
                    />
                  </td>
                  <td className="w-[200px] p-2 text-justify tracking-tighter">
                    {stories.description}
                  </td>
                  <td>
                    <MdDelete
                      onClick={() => {
                        hadledeleteStories(stories._id);
                      }}
                      className="my-[5px] text-red-500 cursor-pointer inline"
                    />{" "}
                    |{" "}
                    <Link to={`/dashboard/stories/update-stories/${stories._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  {/* This is a part for showing the stataus active inactive */}
                  <td>
                    <button
                      onClick={handleUpdateStorieStatus}
                      value={stories._id}
                      data-tooltip-id="my-status"
                      data-tooltip-content={`Click to ${
                        stories.status ? "Inactive" : "Active"
                      }`}
                      className={`p-3 text-white border rounded-sm ${
                        stories.status ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {stories.status ? "Active" : "Inactive"}
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

export default ViewStory;
