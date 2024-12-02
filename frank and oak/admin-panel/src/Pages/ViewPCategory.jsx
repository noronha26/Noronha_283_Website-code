import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);

  const [categories, setCategories] = useState([]);
  const [filepath, setFilepath] = useState("");
  const [checkedProductCategories, setCheckedProductCategories] = useState([]);
  const [ifAllProductChecked, setAllProductChecked] = useState(false);

  const handeleFetchCategories = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}admin-panel/product-category/read-categories`
      )
      .then((response) => {
        console.log(response.data);

        setCategories(response.data.data);
        setFilepath(response.data.filepath);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handeleFetchCategories();
    // console.log(process.env.REACT_APP_API_URL);
  }, []);
  const handleUpdatePCategory = (e) => {
    // console.log(e.target.value,e.target.textContent)

    const status = e.target.textContent !== "Active";
    // console.log(status);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Status Updated",
      showConfirmButton: false,
      timer: 800,
    });

    axios
      .put(
        `${process.env.REACT_APP_API_URL}admin-panel/product-category/update-product-status/${e.target.value}`,
        { status }
      )
      .then((response) => {
        console.log(response.data);
        handeleFetchCategories();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteProductCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}admin-panel/product-category/delete-productCategory/${id}`
        )
        .then((response) => {
          console.log(response.data);
          handeleFetchCategories();
        })
        .catch((error) => {
          console.log(error);
        });
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleCheckProductCategory = (e) => {
    // console.log(e.target.value,e.target.checked);
    const { value, checked } = e.target;
    if (checked) {
      setCheckedProductCategories([value, ...checkedProductCategories]);
    } else {
      setCheckedProductCategories(
        checkedProductCategories.filter((cat) => cat !== value)
      );
    }
  };

  const handleAllCheckedProductCategories = (e) => {
    if (e.target.checked) {
      setCheckedProductCategories(categories.map((cat) => cat._id));
      setAllProductChecked(true);
    } else {
      setCheckedProductCategories([]);
      setAllProductChecked(false);
    }
  };
  useEffect(() => {
    setAllProductChecked(
      categories.length === checkedProductCategories.length &&
        categories.length !== 0
    );
  }, [checkedProductCategories, categories]);

  const handleDeleteProductCategories = () => {
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
            `${process.env.REACT_APP_API_URL}admin-panel/product-category/delete-productCategories`,
            {
              checkedProductCategories,
            }
          )
          .then((response) => {
            // console.log(response.data);
            handeleFetchCategories();
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

    console.log(checkedProductCategories);
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
                  className="bg-red-600 rounded-sm px-2 py-1 mx-1"
                  onClick={handleDeleteProductCategories}
                >
                  Delete
                </button>

                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleAllCheckedProductCategories}
                  className="accent-[#5351c9]"
                  checked={ifAllProductChecked}
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="status-tooltip" />
            {categories.length === 0 ? (
              <div>No Parent Product categories available </div>
            ) : (
              categories.map((category, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      value={category._id}
                      onClick={handleCheckProductCategory}
                      className="accent-[#5351c9] cursor-pointer"
                      checked={checkedProductCategories.includes(category._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="object-contain p-2">
                    {/* {category.thumbnail} */}
                    <img
                      src={filepath + category.thumbnail}
                      alt="product men's t-shirt"
                      width={80}
                      height={80}
                    />
                  </td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                    {/* {" "}
    Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
    <span
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
        Deserunt nam est delectus itaque sint harum architecto.
      </span>
    )} */}
                  </td>
                  <td>
                    <MdDelete
                      onClick={() => {
                        handleDeleteProductCategory(category._id);
                      }}
                      className="my-[5px] text-red-500 cursor-pointer inline"
                    />{" "}
                    |{" "}
                      <Link to={`/dashboard/products/update-category/${(category._id)}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={handleUpdatePCategory}
                      value={category._id}
                      data-tooltip-id="status-tooltip"
                      data-tooltip-content={`clicck to ${
                        category.status ? "Inactive" : "Active"
                      }`}
                      className={` p-[4px_10px]rounded-sm border ${
                        category.status ? "bg-green-700" : "bg-red-600"
                      } text-white`}
                    >
                      {category.status ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))
            )}

            {/* 
            <tr className="border-b">
              <td>
                <input
                  type="checkbox"
                  name="delete"
                  id="delete1"
                  className="accent-[#5351c9] cursor-pointer"
                />
              </td>
              <td>2</td>
              <td>Men's T-shirt</td>
              <td className="object-contain p-2">
                <img
                  src="/CollarPocketsT-shirt1.webp"
                  alt="product men's t-shirt"
                  width={80}
                  height={80}
                />
              </td>
              <td className="w-[200px] flex-wrap p-1">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                <span
                  onClick={() => setShow2(!show2)}
                  className={
                    show2 === true ? "hidden" : "font-bold cursor-pointer"
                  }
                >
                  ...Read
                </span>
                {show2 === false ? (
                  " "
                ) : (
                  <span>
                    Deserunt nam est delectus itaque sint harum architecto.
                  </span>
                )}
              </td>
              <td>
                <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to="/dashboard/products/update-category">
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td>Display</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
