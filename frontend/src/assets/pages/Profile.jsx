// import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../schemas/profileSchema";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateProfile] = useUpdateProfileMutation();
  const { userInfo } = useSelector((state) => state.auth);

  console.log("userInfo:", userInfo);
  // instead of use state we use useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(profileSchema) });

  useEffect(() => {
    if (userInfo) {
      reset({
        name: userInfo.name,
        email: userInfo.email,
      });
    }
  }, [userInfo, reset]);

  async function submitHandler(data) {
    try {
      console.log("Submitting:");
      const res = await updateProfile({
        _id: userInfo._id,
        name: data.name,
        email: data.EMAIL,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success("User updateProfile Successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className="container min-h-screen overflow-hidden flex justify-center items-center mx-auto ">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className=" 
        w-full md:w-3/4 lg:w-1/2 xl:w-1/2
         flex flex-col gap-8 bg-linear-to-r from-blue-300/70 to-blue-500/40
          shadow-md rounded-md p-6"
      >
        <h1
          className="text-2xl font-semibold 
          bg-gradient from-blue-900 to-green-700"
        >
          Profile
        </h1>
        <div className="flex flex-col gap-2">
          <label>User Name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Please write your username..."
            className="w-full rounded-md border border-blue-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Please write your email..."
            className="w-full  rounded-md border border-blue-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Please write your Password..."
            className="w-full rounded-md border border-blue-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Please write your Password..."
            className="w-full rounded-md border border-blue-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div className="flex flex-col gap-4">
          <button className="btn btn-soft btn-primary " type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
