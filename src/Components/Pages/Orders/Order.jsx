import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import { Spinner } from "../../shared/Spinner";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../Auth/Helper";

export const Order = () => {
  const [Data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");
  const [Status, setStatus] = useState("");
  const [SrNo, setSrNo] = useState("");
  const limit = 10;
  let config = {
    headers: {
      authtoken: localStorage.getItem("authtoken"),
    },
  };
  useEffect(() => {
    if (Status) {
      axios
        .get(
          `${BASE_URL}/admin/get-orders?status=${Status}&page=${page}&limit=${limit}`,
          config
        )
        .then((res) => {
          setData(res.data.result);
          setTotal(res.data.length);
          setSrNo(res.data.sr_no);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (!Status) {
      fetchData();
    }
  }, [page, Status]);

  const fetchData = () => {
    axios
      .get(
        `${BASE_URL}/admin/get-orders?page=${page}&limit=${limit}`,
        config
      )
      .then((res) => {
        setData(res.data.result);
        setTotal(res.data.length);
        setSrNo(res.data.sr_no);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const nextPage = () => {
    setData("");
    setPage(page + 1);
  };

  const prevPage = () => {
    setData("");
    setPage(page - 1);
  };

  const OrderDate = (d) => {
    const formatDate = new Date(d);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Sunday",
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = days[formatDate.getDay()];
    const month = months[formatDate.getMonth()];
    const year = formatDate.getFullYear();
    const date = formatDate.getDate();

    return `${day} ${date} ${month} ${year}`;
  };

  const reset = () => {
    setPage(1);
    setStatus("");
    setData("");
  };

  const OnStatus = (e) => {
    setPage(1);
    setStatus("");
    let status = e.target.value;
    setStatus(status);
    setData("");
  };

  return (
    <div className="bg-white rounded-sm border border-gray-200 flex-1 ">
      <div className="border-b border-gray-200 px-6 py-4">
        <strong className="text-gray-700 text-xl font-semibold">
          All Orders
        </strong>
        <nav className="flex mt-2" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to={"/"}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-700 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-700 md:ms-2 ">
                  Orders
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 justify-between">
            <div className="grid">
              <svg
                className="pointer-events-none z-10 right-1 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <select
                className="w-40 appearance-none forced-colors:appearance-auto border row-start-1 col-start-1 rounded-lg focus:outline-none bg-white border-gray-200 text-gray-700 px-2 py-1"
                onChange={OnStatus}
                value={Status}
              >
                <option value={""}>Select Status</option>
                <option value={"Out for Delivery"}>Out for Delivery</option>
                <option value={"Delivered"}>Delivered</option>
                <option value={"Dispatched"}>Dispatched</option>
                <option value={"Ready to Pickup"}>Ready to Pickup</option>
              </select>
            </div>
            <div className="flex items-center justify-center cursor-pointer">
              <BiReset onClick={reset} fontSize={24} />
            </div>
          </div>
          {/* <Link
            to={"/add-product"}
            className="bg-neutral-900 rounded-md px-4 py-2 hover:bg-neutral-700 text-white hover:no-underline"
          >
            + Create Order
          </Link> */}
        </div>
        {Data.length > 0 ? (
          <>
            <div className="border-x border-gray-200 rounded-sm mt-5 ">
              <table className="w-full text-gray-700 rounded-sm">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Cutomer</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Data.map((item, index) => (
                    <tr key={item._id}>
                      <td>
                        <Link className="text-black">#{item.order_no}</Link>
                      </td>
                      <td>{OrderDate(item.date)}</td>
                      <td>
                        {item.customer_name} <br /> {item.customer_email}
                      </td>
                      <td>
                        {item.payment === "Paid" && (
                          <span className=" text-green-500 font-medium ">
                            Delivered
                          </span>
                        )}
                      </td>
                      <td>
                        {item.status === "Delivered" && (
                          <span className="rounded-md bg-green-200 text-green-600 px-2 py-1 ">
                            Delivered
                          </span>
                        )}
                      </td>
                      <td>
                        <button className="hover:bg-gray-200 rounded-full p-2 text-black text-xl">
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-5">
              <div className="text-gray-700 font-sm">
                Showing Page {page} of {Math.ceil(total / limit)}
              </div>
              <div className="">
                <button
                  className={classNames(
                    page === 1 ? "disabled:opacity-75" : "",
                    "bg-neutral-900 text-sm rounded-md text-white p-2 hover:no-underline "
                  )}
                  onClick={prevPage}
                  disabled={page === 1 ? true : false}
                >
                  Previous
                </button>
                <button
                  className={classNames(
                    page === Math.ceil(total / limit)
                      ? "disabled:opacity-75"
                      : "",
                    "bg-neutral-900 text-sm rounded-md ml-2 text-white p-2 hover:no-underline"
                  )}
                  onClick={nextPage}
                  disabled={page === Math.ceil(total / limit) ? true : false}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
