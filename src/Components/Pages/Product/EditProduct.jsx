import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Auth/Helper";
import { Spinner } from "../../shared/Spinner";

const EditProduct = () => {
  const { id } = useParams();
  const [Loading, setLoading] = useState(true);
  let config = {
    headers: {
      authtoken: localStorage.getItem("authtoken"),
    },
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/admin/get-product/${id}`, config).then((res) => {
      setLoading(res.data ? false : true);
      setValue("name", res.data.name);
      setValue("category", res.data.category);
      setValue("description", res.data.description);
      setValue("price", res.data.price);
      setValue("quantity", res.data.quantity);
      setValue("status", res.data.status);
      setValue("size", res.data.size);
    });
  }, []);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("Please enter the product name"),
    category: yup.string().required("Please select the category"),
    description: yup.string().required("Please enter the description"),
    price: yup.number().required("Please enter the price"),
    quantity: yup.number().required("Please enter the quantity"),
    status: yup.string().required("Please select the status"),
    size: yup.string().required("Please enter the size"),
  });
  const [ErrMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const Editproduct = (data) => {
    axios
      .put(`${BASE_URL}/admin/edit-product/${id}`, data, config)
      .then((res) => {
        navigate("/products");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrMsg(error.response.data.message);
      });
  };

  return (
    <div className="bg-white  rounded-sm border border-gray-200 flex-1">
      <div className="border-b border-gray-200 text-gray-700 font-semibold px-6 py-4 text-xl">
        <h1>Update product</h1>
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
                <Link
                  to={"/products"}
                  className="ms-1 text-sm font-medium text-gray-700 md:ms-2 hover:text-gray-500"
                >
                  Product
                </Link>
              </div>
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
                  Update Product
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mt-4 px-6 py-4">
        {!Loading ? (
          <form onSubmit={handleSubmit(Editproduct)}>
            <h1 className="text-lg font-normal mb-4">Product Information</h1>
            <div className="flex w-full gap-6 max-[990px]:flex-col">
              <div className="flex flex-col w-full">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  {...register("name")}
                  placeholder="enter name"
                  className="bg-transparent border border-gray-200 px-3 py-2 rounded-md focus:outline-none hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  className="bg-transparent border border-gray-200 px-3 py-2 rounded-md focus:outline-none hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                  {...register("category")}
                >
                  <option value="">Select Category</option>
                  <option value="Mobiles, Computers">Mobiles, Computers</option>
                  <option value="TV, Appliances, Electronics">
                    TV, Appliances, Electronics
                  </option>
                  <option value="Beauty, Health, Grocery">
                    Beauty, Health, Grocery
                  </option>
                  <option value="Books">Books</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full gap-6 mt-4 max-[990px]:flex-col">
              <div className="flex flex-col w-full">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  {...register("price")}
                  placeholder="enter price"
                  className="bg-transparent border border-gray-200 px-3 py-2 focus:outline-none rounded-md hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                />
                {errors.price && (
                  <p className="mt-1 text-red-500 text-sm">
                    {"Please enter the price"}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  {...register("quantity")}
                  placeholder="enter quantity"
                  className="bg-transparent border border-gray-200 px-3 py-2 rounded-md focus:outline-none hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                />
                {errors.quantity && (
                  <p className="mt-1 text-red-500 text-sm">
                    {"Please enter the quantity"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full gap-6 mt-4 max-[990px]:flex-col">
              <div className="flex flex-col w-full">
                <label htmlFor="size">Size</label>
                <input
                  type="text"
                  name="size"
                  {...register("size")}
                  placeholder="enter size"
                  className="bg-transparent border border-gray-200 px-3 py-2 rounded-md focus:outline-none hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                />
                {errors.size && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.size.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  className="bg-transparent border border-gray-200 px-3 py-2 rounded-md focus:outline-none hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                  {...register("status")}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-red-500 text-sm max-[990px]:flex-col">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full gap-6 mt-4">
              <div className="flex flex-col w-full">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  placeholder="enter description"
                  {...register("description")}
                  className="bg-transparent border border-gray-200 px-3 py-2 rounded-md focus:outline-none hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                  rows="5"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
                {ErrMsg && (
                  <p className="mt-1 text-red-500 text-sm">{ErrMsg}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end w-full mt-4">
              <button className="rounded-md w-40 bg-neutral-900 hover:bg-neutral-700 text-white px-2 py-2">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default EditProduct;
