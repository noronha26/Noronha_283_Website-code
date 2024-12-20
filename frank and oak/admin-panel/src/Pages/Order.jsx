import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Order = () => {
  const [order, setOrders] = useState([]);
  const [filepath, setFilepath] = useState("");
  const [checkedOrder, setCheckedOrder] = useState([]);
  const [ifAllchecked, setifAllchecked] = useState(false);

  const handleFetchOrder = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}admin-panel/order/read-order`)
      .then((response) => {
        console.log(response.data);

        setOrders(response.data.data);
        setFilepath(response.data.filepath);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleFetchOrder();
  }, []);

  const handleCheckOrders = (e) => {
    const { value, checked } = e.target;
    // console.log( e.target.value,e.target.checked);
    if (checked) {
      setCheckedOrder([value, ...checkedOrder]);
    } else {
      setCheckedOrder(checkedOrder.filter((cat) => cat !== value));
    }
  };

  const handleAllCheckedOrders = (e) => {
    if (e.target.checked) {
      setCheckedOrder(order.map((cat) => cat._id));
      setifAllchecked(true);
    } else {
      setCheckedOrder([]);
      setifAllchecked(false);
    }
  };
  useEffect(() => {

    setifAllchecked(order.length===checkedOrder.length&&order.length!==0);
  }, [checkedOrder, order]);

  const handleDeleteMultyOrders = () => {
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
            `${process.env.REACT_APP_API_URL}admin-panel/order/delete-orders`,
           {checkedOrder}
          )
          .then((response) => {
            handleFetchOrder ();
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
   


    console.log(checkedOrder);
  };

  let [showDesc1, setShowDesc1] = useState(false);
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="block bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] rounded-[10px_10px_0_0] border-b">
        Orders
      </span>
      <div className="w-[90%] mx-auto my-[20px] ">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th>
                <button
                  onClick={handleDeleteMultyOrders}
                  className="bg-[#5351c9] cursor-pointer text-white w-[80px] h-[30px] rounded-[5px] 
                mr-[5px] font-[400]"
                >
                  {" "}
                  Delete
                </button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAll"
                  onClick={handleAllCheckedOrders}
                  className="input accent-[#5351c9] cursor-pointer"
                  checked={ifAllchecked}
                />
              </th>
              <th>Sno</th>
              <th>Order Name</th>
              <th>Product Id</th>
              <th className="p-2">Image</th>
              <th className="p-2">Description</th>
              <th className="p-2">Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {order.length === 0 ? (
              <div>No orders Available</div>
            ) : (
              order.map((orders, index) => (
                <React.Fragment key={orders._id}>
                  <tr className="border-b">
                    <td>
                      <input
                        type="checkbox"
                        name="deleteAll"
                        id="deleteAll"
                        value={orders._id}
                        onClick={handleCheckOrders}
                        className="input accent-[#5351c9] cursor-pointer"
                        checked={checkedOrder.includes(orders._id)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{orders.customer.name}</td>
                    <td> {orders._id}</td>
                    <td className="bg-blue-400" colSpan={5}></td>{" "}
                    {/* Placeholder for item details */}
                  </tr>
                  {orders.item.map((item, itemIndex) => (
                    <tr key={`${orders._id}-${itemIndex}`} className="border-b">
                      {/* <td>{orders.item.quantity}</td>
                <td>&#8377; {orders.amount} </td>
                 */}
                      <td className="bg-gray-500"></td>
                      <td className="bg-gray-500"></td>{" "}
                      {/* Empty column for order index */}
                      <td className="bg-blue-100" colSpan={2}>
                        Item {itemIndex + 1}:{" "}
                        {item.price_data.product_data.name}
                      </td>
                      <td className="p-2 object contain">
                        <img
                          src={item.price_data.product_data.images[0]}
                          alt="t-shirt img"
                          width={80}
                          height={80}
                          className="rounded-[5px]"
                        />
                      </td>
                      <td className="p-2 tracking-tighter w-[200px]">
                        {orders.customer.address.city},{" "}
                        {orders.customer.address.line1},
                        {orders.customer.address.line2},{" "}
                        {orders.customer.address.postal_code},
                        {orders.customer.address.country}
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        &#8377; {(item.price_data.unit_amount / 100).toFixed(2)}
                      </td>
                      <td className="bg-gray-400" colSpan={2}></td>{" "}
                      {/* Empty columns for order amount and status */}
                      <td
                        className={`${
                          orders.status === "pending"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {orders.status}{" "}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
