import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  let [show3, setShow3] = useState(false);
  let [show4, setShow4] = useState(false);

  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [ifAllChecked,setAllCchecked]=useState(false)

  const handeleFetchCategories = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}admin-panel/parent-category/read-categories`
      )
      .then((response) => {
        console.log(response.data);

        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handeleFetchCategories();
    // console.log(process.env.REACT_APP_API_URL);
  }, []);

  const handeleUpdatestatus = (e) => {
    console.log(e.target.value, e.target.textContent);
    const status = e.target.textContent !== "Active";
    axios
      .put(
        `${process.env.REACT_APP_API_URL}admin-panel/parent-category/updateStatus/${e.target.value}`,
        { status }
      )

      .then((response) => {
        console.log(response.data);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your status updated",
          showConfirmButton: false,
          timer: 800,
        });

        handeleFetchCategories();
        // setCategories(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(status);
  };
  //delete categories
  const handelDeleteCategory = (id) => {
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
            `${process.env.REACT_APP_API_URL}admin-panel/parent-category/delete-category/${id}`
          )

          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            handeleFetchCategories();
            // setCategories(response.data.data)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  //Ckeck category
  const handelCheckCategory = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedCategories([value, ...checkedCategories]);
    } else {
      setCheckedCategories(checkedCategories.filter((cat) => cat !== value));
    }
    // console.log(e.target.value,e.target.checked)
  };
  const handleAllCheckCategories=(e)=>{
 if(e.target.checked){
 setCheckedCategories( categories.map((cat)=>cat._id))
 setAllCchecked(true);
 }
 else{
  setCheckedCategories([]);
  setAllCchecked(false);
 }
  }
  useEffect(()=>{
    setAllCchecked(categories.length===checkedCategories.length&&categories.length!==0);
  },[checkedCategories,categories]);

  const handelMultiDelete = () => {
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
          `${process.env.REACT_APP_API_URL}admin-panel/parent-category/delete-categories`,{checkedCategories}
        )
        .then((response) => {
          handeleFetchCategories();
          
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
          console.log(response.data);
        })
        .catch((error)=>{
          console.log(error);

        })

      }
    });
    // console.log(checkedCategories);
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-400 rounded-sm px-2 py-1"
                  onClick={handelMultiDelete}
                >
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleAllCheckCategories}
                  className="accent-[#5351c9]"
                  checked={ifAllChecked}

                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="status-tooltip" />

            {/* making data dynamic */}

            {
              //this shows when there is no data available
              categories.length === 0 ? (
                <div>No Parent category Available</div>
              ) : (
                categories.map((category, index) => (
                  <tr className="border-b" key={index}>
                    {/* //checkbox */}
                    <td>
                      <input
                        type="checkbox"
                        name="delete"
                        id="delete1"
                        value={category._id}
                        onClick={handelCheckCategory}
                        className="accent-[#5351c9] cursor-pointer"
                        checked={checkedCategories.includes(category._id)}
                      />
                    </td>

                    {/* making data dynamic */}
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td className="w-[200px] flex-wrap p-1">
                      {category.description}
                      {/* <span
                        onClick={() => setShow1(!show1)}
                        className={
                          show1 === true ? "hidden" : "font-bold cursor-pointer"
                        }
                      >
                        ...Read
                      </span>
                      {show1 === false ? (
                        " "
                      ) : (
                        <span>
                          Deserunt nam est delectus itaque sint harum
                          architecto.
                        </span>
                      )} */}
                    </td>
                    <td>
                      <MdDelete
                        onClick={() => {
                          handelDeleteCategory(category._id);
                        }}
                        className="my-[5px] text-red-500 cursor-pointer inline"
                      />{" "}
                      |{" "}
                      <Link
                        to={`/dashboard/category/update-category/${category._id}`}
                      >
                        <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                      </Link>
                    </td>
                    <td>
                      {/* //here we can show active or inactive */}
                      <button
                        onClick={handeleUpdatestatus}
                        value={category._id}
                        data-tooltip-id="status-tooltip"
                        data-tooltip-content={`Click to ${
                          category.status ? "Inactive" : "Active"
                        }`}
                        className={`p-[4px_10px] rounded-sm border ${
                          category.status ? " bg-green-600" : "bg-red-600"
                        } text-black`}
                      >
                        {/* //this is the ternery status */}
                        {category.status ? "Active" : "Inactive"}
                      </button>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
