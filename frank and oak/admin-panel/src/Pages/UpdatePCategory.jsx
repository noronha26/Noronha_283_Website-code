import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePCategory = () => {
  const {id}=useParams();
 const nav= useNavigate();
  // console.log(params);
  const[category,setcategory]=useState({});
  const [filepath, setFilepath] = useState("");
  const [priview, setPriview] = useState(null);
  
  
  const inputPriviewImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setcategory({ ...category, thumbnail: file.name });
    setPriview(url);
   
    console.log(priview)
  };


  const fetchProduct=()=>{
    axios
    .get(
      `${process.env.REACT_APP_API_URL}admin-panel/product-category/read-category/${id}`
    ).then((response)=>{
      console.log(response.data)
      setcategory(response.data.data)
      setFilepath(response.data.filepath);
    })
    .catch((error)=>{
      console.log(error);
    })
  };


  useEffect(()=>{fetchProduct()},[id]);
  


  const handleUpdateProducts=(e)=>{
    e.preventDefault();
    console.log(e.target);
    axios
    .put(
      `${process.env.REACT_APP_API_URL}admin-panel/product-category/update-product/${id}`,e.target
    ).then((response)=>{
      console.log(response.data)
      let timerInterval;
Swal.fire({
  title: "Category Updated",
  html: "You will Re-directed <b></b> milliseconds.",
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
    console.log(response.data);
    nav('/dashboard/products/view-category')
   
  }
});
      
    })
    .catch((error)=>{
      console.log(error);
    })

  };

  
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Update Product Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleUpdateProducts}>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={category.name}
              id="categoryName"
              placeholder="Category Name"
              onChange={(e)=>{setcategory({...category, name:e.target.value})}}
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="categoryImg"
              onChange={inputPriviewImage }
              // onChange={(e)=>{setcategory({...category, thumbnail:e.target.value})}}
              className="input border w-full rounded-[5px] my-[10px] category"
            />
            {/* {
              priview &&(
                <img src={{priview}+filepath + category.thumbnail} className="mt-3 w-25" style={{height:'170px'}} />

              )
            } */}
             <img src={priview ||filepath + category.thumbnail} className="mt-3 w-[150px]" style={{height:'170px'}}/>
           
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              value={category.description}
              id="categoryDesc"
              onChange={(e)=>{setcategory({...category, description:e.target.value})}}

              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Status
            </label>
            <input
              type="radio"
              name="categoryStatus"
              id="categoryStatus"
              value="0"
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="categoryStatus"
              id="categoryStatus"
              value="1"
              checked
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[20px] ">
            <button className="bg-[#5351c9] rounded-md text-white p-2 h-[35px]">
              Update-Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePCategory;
