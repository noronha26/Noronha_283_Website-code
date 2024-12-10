import axios from "axios";

import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";

const ViewProduct = () => {
  let [showDesc1, setShowDesc1] = useState(false);
  let [showShortDesc1, setShowShortDesc1] = useState(false);
  const [products, setProducts] = useState([]);
  const [filepath, setFilepath] = useState("");
  const[checkedProduct, setCheckedProduct]=useState([]);
  const[ifAllProductChecked,setAllProductChecked]=useState(false);

  const handleFetchProduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/product/read-product`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.data);
        setFilepath(response.data.filepath);
        console.log(products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleFetchProduct();
  }, []);

  const handeleUpdateProducts = (e) => {
    // console.log(e.target.value,e.target.textContent)
    const status = e.target.textContent !== "Active";

    axios
      .put(
        `${process.env.REACT_APP_API_URL}admin-panel/product/updateProduct-status/${e.target.value}`,
        { status }
      )
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        handleFetchProduct();
        // setProducts(response.data.data)
        // setFilepath(response.data.filepath);
        // console.log(products)
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(status);
  };

  const handleDeleteProduct = (id) => {
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
            `${process.env.REACT_APP_API_URL}admin-panel/product/delete-product/${id}`
          )
          .then((response) => {
            console.log(response.data);

            Swal.fire({
              title: "Deleted!",
              text: "Your Product has been deleted.",
              icon: "success",
            });

            handleFetchProduct();
            // setProducts(response.data.data)
            // setFilepath(response.data.filepath);
            // console.log(products)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const handelCheckProduct = (e) => {
    const{value,checked}=e.target;
    // console.log(e.target.value,e.target.checked);
    if(checked){
      setCheckedProduct([value, ...checkedProduct])
    }
    else{
     setCheckedProduct( checkedProduct.filter((cat)=>cat!==value))
    }
  };
  const handleAllCheckedProduct=(e)=>{
    if(e.target.checked){
setCheckedProduct(products.map((cat)=>cat._id))
setAllProductChecked(true)
}

    else{
      setCheckedProduct([]);
      setAllProductChecked(false);
    }

  };
  useEffect(()=>{
    setAllProductChecked(products.length===checkedProduct.length&&products.length!==0);
  },[checkedProduct,products]);

const handleDeleteProducts=()=>{
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
        `${process.env.REACT_APP_API_URL}admin-panel/product/delete-products`,{checkedProduct}
      )
      .then((response) => {
        handleFetchProduct();
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

  
  console.log(checkedProduct)
};
  return (
    <div className="w-[90%] mx-auto my-[150px] rounded-[10px] bg-white border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] font-bold p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Product
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="flex gap-[5px]">
               <button 
               onClick={handleDeleteProducts}
               className="bg-red-400 rounded-sm px-2 py-1">
                Delete{" "}
                </button>
                <input
                  type="checkbox"
                  id="deleteAll"
                  name="delete"
                  onClick={handleAllCheckedProduct}
                  className="input accent-[#5351c9] cursor-pointer h-[fit-content] m-[5px]"
               checked={ifAllProductChecked}
               />
              </th>
              <th>Sno</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Short Description</th>
              <th>Thumbnail</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="status-tooltip" />
            {products.length === 0 ? (
              <div>No Products Available</div>
            ) : (
              products.map((product, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      id="delete"
                      name="delete"
                      value={product._id}
                      onClick={handelCheckProduct}
                      className="input accent-[#5351c9] cursor"
                      checked={checkedProduct.includes(product._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td className="w-[200px] p-2">{product.description}</td>
                  <td className="w-[200px] p-2">{product.short_description}</td>
                  <td className="object-contain">
                    <img
                      src={filepath + product.thumbnail}
                      alt="men's t-shirt"
                      width={80}
                      height={80}
                      className="rounded-[5px]"
                    />{" "}
                  </td>
                  <td>
                    <MdDelete
                      onClick={() => {
                        handleDeleteProduct(product._id);
                      }}
                      className="my-[5px] text-red-500 cursor-pointer inline"
                    />{" "}
                    |{" "}
                    <Link to={`/dashboard/products/update-product/${(product._id)}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={handeleUpdateProducts}
                      value={product._id}
                      data-tooltip-id="status-tooltip"
                      data-tooltip-content={`Click to ${
                        product.status ? "Inactive" : "Active"
                      }`}
                      className={`p-4 rounded-sm border ${
                        product.status ? "bg-green-500" : "bg-red-500"
                      } text-white`}
                    >
                      {product.status ? "Active" : "Inactive"}
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

export default ViewProduct;
