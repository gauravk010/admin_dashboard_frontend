import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../shared/Spinner";
import { BASE_URL } from "../../Auth/Helper";

const EditUser = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const { id } = useParams();
  let config = {
    headers: {
      authtoken: localStorage.getItem("authtoken"),
    },
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/get-user/${id}`, config)
      .then((res) => {
        setLoading(res.data ? false : true);
        setValue("fullname", res.data.fullname);
        setValue("username", res.data.username);
        setValue("email", res.data.email);
        setValue("contact", res.data.contact);
        setValue("role", res.data.role);
        setValue("status", res.data.status);
      });
  }, []);
  const schema = yup.object().shape({
    fullname: yup.string().required("Please enter the fullname"),
    username: yup.string().required("Please enter the username"),
    email: yup.string().email().required("Please enter the email"),
    // password: yup.string().required("Please enter the password"),
    contact: yup.number().required("Please enter the contact"),
    role: yup.string().required("Please select the admin"),
    status: yup.string().required("Please select the status"),
  });
  const [ErrMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const edituser = (data) => {
    axios
      .put(`${BASE_URL}/admin/edit-user/${id}`, data, config)
      .then((res) => {
        navigate("/users");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrMsg(error.response.data.message);
      });
  };

  return (
    <div className="bg-white  rounded-sm border border-gray-200 flex-1">
      <div className="border-b border-gray-200 text-gray-700 font-semibold px-6 py-4 text-xl">
        <h1>Update user</h1>
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
                  to={"/users"}
                  className="ms-1 text-sm font-medium text-gray-700 md:ms-2 hover:text-gray-500"
                >
                  Users
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
                  Update User
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mt-4 px-6 py-4">
        {!Loading ? (
          <form onSubmit={handleSubmit(edituser)}>
            <h1 className="text-lg font-normal mb-4">Product Information</h1>
            <div className="flex w-full gap-6 ">
              <div className="flex flex-col w-full">
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  {...register("fullname")}
                  placeholder="enter fullname"
                  className="bg-transparent border border-gray-200 px-3 py-2 focus:outline-none rounded-md hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                />
                {errors.fullname && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  {...register("username")}
                  placeholder="enter username"
                  className="bg-transparent border border-gray-200 px-3 py-2 focus:outline-none rounded-md hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                />
                {errors.username && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full gap-6 mt-4">
              <div className="flex flex-col w-full">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  {...register("email")}
                  placeholder="enter email"
                  className="bg-transparent border border-gray-200 px-3 py-2 focus:outline-none rounded-md hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="contact">Contact</label>
                <input
                  type="number"
                  name="contact"
                  {...register("contact")}
                  placeholder="enter contact"
                  className="bg-transparent border border-gray-200 px-3 py-2 focus:outline-none rounded-md hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                />
                {errors.contact && (
                  <p className="mt-1 text-red-500 text-sm">
                    {"Please enter the contact"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full gap-6 mt-4">
              <div className="flex flex-col w-full">
                <label htmlFor="role">Select Role</label>
                <select
                  name="role"
                  {...register("role")}
                  className="bg-transparent border border-gray-200 px-3 py-2 focus:outline-none rounded-md hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                >
                  <option value="Admin">Admin</option>
                  <option value="Maintainer">Maintainer</option>
                  <option value="Editor">Editor</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  {...register("status")}
                  className="bg-transparent border border-gray-200 px-3 py-2 focus:outline-none rounded-md hover:border-gray-400 transition delay-100 ease-in placeholder:text-gray-400 focus:border-gray-400 mt-4"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.status.message}
                  </p>
                )}
                {ErrMsg && (
                  <p className="mt-1 text-red-500 text-sm">{ErrMsg}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end w-full mt-4">
              <button
                type="submit"
                className="rounded-md w-40 bg-neutral-900 hover:bg-neutral-700 text-white px-2 py-2"
              >
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

export default EditUser;
