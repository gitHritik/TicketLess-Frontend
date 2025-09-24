/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useResetPasswordMutation } from "../slices/userApiSlices";

export default function ResetPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [password, setPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({ resetToken, password }).unwrap();
      toast.success("Password Reset Successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <div className="container mx-auto mt-8 mb-28 p-4 max-w-md ">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          onClick={handleResetPassword}
        >
          Submit
        </button>
        {isLoading && <Spinner />}
      </form>
    </div>
  );
}
