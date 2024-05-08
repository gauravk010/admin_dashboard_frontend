import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import image from "../../assets/dash2.jpg";
import { FcBullish } from "react-icons/fc";
import { BASE_URL } from "../Auth/Helper";

export const Register = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required("Please enter the username"),
    email: yup.string().required("Please enter the email"),
    password: yup.string().required("Please enter the password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    axios
      .post(`${BASE_URL}/admin/register`, data)
      .then((res) => {
        if (res.data.success) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-screen h-screen flex flex-row">
      <div
        className="bg-center bg-no-repeat bg-contain w-full "
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="w-1/2 flex items-center justify-center border border-l-gray-200">
        <div className="bg-white border shadow-md p-1 ring-1 ring-black ring-opacity-5 rounded-lg w-3/4 ">
          <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="flex justify-center items-center">
                <FcBullish fontSize={48} />
              </div>
              <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      {...register("username")}
                      type="text"
                      placeholder="john"
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400  focus:outline-slate-700 sm:text-sm sm:leading-6"
                    />
                    {errors.username && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      {...register("email")}
                      type="email"
                      autoComplete="email"
                      placeholder="john@gmail.com"
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400  focus:outline-slate-700 sm:text-sm sm:leading-6"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      {...register("password")}
                      placeholder="············"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400  focus:outline-slate-700 sm:text-sm sm:leading-6"
                    />
                    {errors.password && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-slate-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?
                <Link
                  to="/login"
                  className="font-semibold leading-6  text-slate-950 hover:text-slate-900"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
