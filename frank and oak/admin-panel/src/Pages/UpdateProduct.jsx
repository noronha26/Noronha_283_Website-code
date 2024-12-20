import axios from "axios";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const navigate = useNavigate();
  // const params=useParams();
  // console.log(params);
  const { id } = useParams();

  const [product, setProduct] = useState({ images: [] });
  const [filepath, setFilepath] = useState("");
  const [thumbnailpriview, setThumbnailPriview] = useState(null);
  const [secondaryThumbnailPreview, setSecondaryThumbnailPreview] =
    useState(null);
  const [galleryPreview, setGalleryPreview] = useState(null);
  // const [previews, setPreviews] = useState({});
  const [selectedSizes, setSelectedSizes] = useState(null);
  const [selectedColors, setSelectedColors] = useState(null);
  const [colors, setcolors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const inputPriviewImage1 = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setProduct({ ...product, thumbnail: file.name });
    setThumbnailPriview(url);

    console.log(thumbnailpriview);
  };

  const inputPriviewImage2 = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setProduct({ ...product, secondary_thumbnail: file.name });
    setSecondaryThumbnailPreview(url);

    console.log(secondaryThumbnailPreview);
  };
  const inputPriviewImage3 = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setProduct({ ...product, images: file.name });
    setGalleryPreview(url);

    console.log(galleryPreview);
  };

  // const handlePreview=(e)=>{
  //   const { name, files } = e.target;
  // if(name==='images'){
  //   setPreviews({...previews,images:Array.form(files).map((file)=>URL.createObjectURL(file))});
  //   return;
  // };
  // setPreviews({...previews,[name]:URL.createObjectURL(files[0])});

  // }

  const fetchProduct = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}admin-panel/product/read-products/${id}`
      )
      .then((response) => {
        console.log("old data===>", response.data);
        setProduct(response.data.data);
        setFilepath(response.data.filepath);
        const newArrayColor = response.data.data.color.map((color) => ({
          ...color,
          value: color._id,
          label: color.color,
        }));
        setSelectedColors(newArrayColor);

        const newSizeArray = response.data.data.size.map((size) => ({
          ...size,
          value: size._id,
          label: size.name,
        }));

        setSelectedSizes(newSizeArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchColors = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}admin-panel/parent-color/read-colors`
      )
      .then((response) => {
        const newArrayColor = response.data.data.map((color) => ({
          ...color,
          value: color._id,
          label: color.color,
        }));
        setcolors(newArrayColor);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchSizes = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/parent-size/read-size`)
      .then((response) => {
        const newSizeArray = response.data.data.map((size) => ({
          ...size,
          value: size._id,
          label: size.name,
        }));
        setSizes(newSizeArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProduct();
    fetchColors();
    fetchSizes();
  }, [id]);

  const handleUpdateProducts = (e) => {
    e.preventDefault();
    // console.log(product)
    // till here it is working
    console.log(e.target);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}admin-panel/product/updateProduct-Product/${id}`,
        e.target
        //   {
        //   name:e.target.name,
        //   description:e.target.description,
        //   short_description:e.target.short_description,
        //   thumbnail:e.target.thumbnail,
        //   secondary_thumbnail:e.target.secondary_thumbnail,
        //   images:e.target.images,
        //   price:e.target.price,
        //   mrp:e.target.mrp,
        //   parent_category:e.target.parent_category,
        //   product_category:e.target.product_category,
        //   ifStock:e.target.ifStock,
        //   brand:e.target.brand,
        //   size:e.target.size,
        //   color:e.target.color
        // }
      )
      .then((response) => {
        console.log(response.data);
        let timerInterval;
        Swal.fire({
          title: "Product updated!",
          html: "Redirecting to view product <b></b> milliseconds.",
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
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            // console.log("I was closed by the timer");
            navigate("/dashboard/products/view-product");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Update Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleUpdateProducts}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="name"
              value={product.name}
              placeholder="Name"
              onChange={(e) => {
                setProduct({ ...product, name: e.target.value });
              }}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_desc" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="product_desc"
              name="description"
              value={product.description}
              placeholder="Description"
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="product_short_desc"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              id="product_short_desc"
              name="short_description"
              value={product.short_description}
              placeholder="Short Description"
              onChange={(e) => {
                setProduct({ ...product, short_description: e.target.value });
              }}
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_img" className="block text-[#303640]">
              Product Image
            </label>
            <input
              type="file"
              id="product_img"
              name="thumbnail"
              onChange={inputPriviewImage1}
              // onChange={handlePreview}
              // value={product. thumbnail}
              className="w-full input border rounded-[5px] my-[10px] category"
            />
              <img
              src={thumbnailpriview || filepath + product.thumbnail}
              className="mt-3 w-[150px]"
              style={{ height: "170px" }}
            />
            {/* <img
              src={previews || filepath + product.thumbnail}
              className="mt-3 w-[150px]"
              style={{ height: "170px" }}
            /> */}
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              type="file"
              id="image_animation"
              name="secondary_thumbnail"
              onChange={inputPriviewImage2}
              // onChange={handlePreview}
              className="w-full input border rounded-[5px] my-[10px] category"
            />

            <img
              src={secondaryThumbnailPreview || filepath + product.secondary_thumbnail}
              className="mt-3 w-[150px]"
              style={{ height: "170px" }}
            />
            {/* <img
              src={previews || filepath + product.secondary_thumbnail}
              className="mt-3 w-[150px]"
              style={{ height: "170px" }}
            /> */}
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              type="file"
              id="product_gallery"
              name="images"
              onChange={inputPriviewImage3}
              // onChange={handlePreview}
              className="w-full input border rounded-[5px] my-[10px] category"
            />
             <img
              src={galleryPreview || filepath + product.images}
              className="mt-3 w-[150px]"
              style={{ height: "170px" }}
            />
            {/* <img
              src={previews || filepath + product.images}
              className="mt-3 w-[150px]"
              style={{ height: "170px" }}
            /> */}
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="product_price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="product_price"
                name="price"
                value={product.price}
                placeholder="Product Price"
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value });
                }}
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div>
              <label htmlFor="product_mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                type="text"
                id="product_mrp"
                name="mrp"
                value={product.mrp}
                placeholder="Product MRP"
                onChange={(e) => {
                  setProduct({ ...product, mrp: e.target.value });
                }}
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Select Parent Category
            </label>
            <input
              type="text"
              name="product_category"
              value={product.parent_category}
              id="product_category"
              placeholder="product_category"
              onChange={(e) => {
                setProduct({ ...product, parent_category: e.target.value });
              }}
              className="p-2 input w-full border rounded-[5px] my-[10px]"
            />
            {/* <select
              id="parent_category"
              name="parent_category"
              value={product.parent_category}
              onChange={(e)=>{setProduct({...product,parent_category:e.target.value})}}
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option value="default" selected disabled hidden>
                --Select Parent Category--
              </option>
              <option value="men" className="cursor-pointer">
                Men
              </option>
              <option value="women" className="cursor-pointer">
                Women
              </option>
            </select> */}
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>
            <input
              type="text"
              name="product_category"
              value={product.product_category}
              id="product_category"
              placeholder="product_category"
              onChange={(e) => {
                setProduct({ ...product, product_category: e.target.value });
              }}
              className="p-2 input w-full border rounded-[5px] my-[10px]"
            />
            {/* <select
              id="product_category"
              name="product_category"
              value={product.product_category}
              onChange={(e)=>{setProduct({...product,product_category:e.target.value})}}
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option value="default" selected disabled hidden>
                --Select Product Category--
              </option>
              <option value="tShirt" className="cursor-pointer">
                T-shirt
              </option>
              <option value="shirt" className="cursor-pointer">
                Shirt
              </option>
            </select> */}
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="ifStock"
                id="stock"
                value={product.ifStock}
                onChange={(e) => {
                  setProduct({ ...product, ifStock: e.target.value });
                }}
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Stock--
                </option>
                <option value="inStock">In Stock</option>
                <option value="outStock">Out of Stock</option>
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                type="text"
                name=" brand"
                value={product.brand}
                id="brand"
                placeholder="Brand"
                onChange={(e) => {
                  setProduct({ ...product, brand: e.target.value });
                }}
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="size" className="block text-[#303640]">
                Size
              </label>

              <Select
                name="size"
                value={selectedSizes}
                defaultValue={selectedSizes}
                onChange={setSelectedSizes}
                options={sizes}
                isMulti
              />
              {/* <input
                type="text"
                name=" size"
                value={product.size}
                id="size"
                placeholder="Size"
                onChange={(e)=>{setProduct({...product,size:e.target.value})}}
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              /> */}
              {/* <select
                name="size"
                value={product.size}
                onChange={(e)=>{setProduct({...product,size:e.target.value})}}
                id="size"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Size--
                </option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select> */}
            </div>
            <div>
              <label htmlFor="color" className="block text-[#303640]">
                Color
              </label>
              <Select
                name="color"
                value={selectedColors}
                defaultValue={selectedColors}
                onChange={setSelectedColors}
                options={colors}
                isMulti
              />
              {/* <input
                type="text"
                name="color"
                value={product.color}
                id="color"
                placeholder="Color"
                onChange={(e)=>{setProduct({...product,color:e.target.value})}}
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              /> */}
              {/* <select
                name= "color"
                value={product.color}
                id="color"
                onChange={(e)=>{setProduct({...product,color:e.target.value})}}
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Color--
                </option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="white">White</option>
              </select> */}
            </div>
          </div>
          <div className="w-full my-[10px] ">
            <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="status"
              value="true"
              className="my-[10px] mx-[20px] accent-[#5351c9]"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="status"
              value="false"
              className="my-[10px] mx-[20px] accent-[#5351c9]"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white h-[35px] px-2">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
