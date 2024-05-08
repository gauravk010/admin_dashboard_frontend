import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Auth/Helper";

export const Profile = () => {
  const [User, setUser] = useState([]);
  let config = {
    headers: {
      authtoken: localStorage.getItem("authtoken"),
    },
  };
  useEffect(() => {
    axios.get(`${BASE_URL}/admin/getuser`, config).then((res) => {
      setUser(res.data);
    });
  }, []);
  return (
    <div className="bg-white flex flex-col w-[500px] mx-auto items-center rounded-sm border border-gray-200 flex-1 px-6 py-6">
      <div className="w-full flex justify-center">
        <img
          className="w-32 h-32 rounded-md"
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1709496440~exp=1709497040~hmac=9d9f2c4a9d666ad6489d54bb8bea5d861095145c9ab4fa0466e7639e26453ed1"
          alt="user profile"
        />
      </div>
      <div className="mt-4 text-center bg-gray-200 rounded-md px-3 py-1">
        {User.username}
      </div>
      <div className="mt-4 border-b border-gray-200 w-full pb-4">Details</div>
      <div className="mt-4 w-full text-gray-500">
        <p>
          <span className="font-medium text-neutral-800">Username:</span> {User.username}
        </p>
        <p className="mt-2">
          <span className="font-medium text-neutral-800">Email:</span> {User.email}
        </p>
        <p className="mt-2">
          <span className="font-medium text-neutral-800">Status:</span> {User.status}
        </p>
        <p className="mt-2">
          <span className="font-medium text-neutral-800">Role:</span> {User.role}
        </p>
        <p className="mt-2">
          <span className="font-medium text-neutral-800">Contact:</span> {User.contact}
        </p>
      </div>
      <Link  to={`/users/edit-user/${User._id}`} className="rounded-md w-20 bg-neutral-900 text-center hover:bg-neutral-700 text-white px-2 py-2">
        Edit
      </Link>
    </div>
  );
};
