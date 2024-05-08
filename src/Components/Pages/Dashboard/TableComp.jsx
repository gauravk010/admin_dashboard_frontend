import axios from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import { Spinner } from "../../shared/Spinner";
import { BASE_URL } from "../../Auth/Helper";

export default function TableComp() {
  const [page, setPage] = useState(1);
  const [Status, setStatus] = useState("");
  const [Data, setData] = useState([]);
  const [total, setTotal] = useState("");
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
          `${BASE_URL}/admin/get-products?status=${Status}&page=${page}&limit=${limit}`,
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
      .get(`${BASE_URL}/admin/get-products?page=${page}&limit=${limit}`, config)
      .then((res) => {
        setData(res.data.result);
        setTotal(res.data.length);
        setSrNo(res.data.sr_no);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const nextPage = () => {
    setData("");
    setPage(page + 1);
  };

  const prevPage = () => {
    setData("");
    setPage(page - 1);
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex items-center justify-between mt-3">
        <strong className="text-gray-700 font-semibold">All Products</strong>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center justify-center cursor-pointer">
            <BiReset onClick={reset} fontSize={24} />
          </div>
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
              className="w-36 appearance-none forced-colors:appearance-auto border row-start-1 col-start-1 rounded-lg focus:outline-none bg-white border-gray-200 text-gray-700 px-2 py-1"
              onChange={OnStatus}
              value={Status}
            >
              <option value={""}>Select Status</option>
              <option value={"true"}>Active</option>
              <option value={"false"}>Inactive</option>
            </select>
          </div>
        </div>
      </div>
      {Data.length > 0 ? (
        <>
          <div className="border-x border-gray-200 rounded-sm mt-5 ">
            <table className="w-full text-gray-700 rounded-sm">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>QTY</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {Data.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      <Link>#{SrNo + index + 1}</Link>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      {item.status ? (
                        <span className="rounded-md bg-green-200 text-green-600 px-2 py-1 ">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-md bg-red-200 text-red-600 px-2 py-1 ">
                          Inactive
                        </span>
                      )}
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
                  "bg-neutral-900 text-sm rounded-md text-white p-2 hover:no-underline"
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
  );
}
