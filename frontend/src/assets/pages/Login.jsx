// import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useEffect } from "react";

function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  
  
  console.log("userInfo:", userInfo);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // instead of use state we use useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitHandler(data) {
    try {
      console.log("Submitting:", data);
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      toast.success("User Login Successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className="container w-full h-full flex justify-center items-center mx-auto ">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full md:w-1/2 h-1/2 flex flex-col gap-8 bg-linear-to-r from-green-300/70 to-green-500/40 shadow-md rounded-md p-6"
      >
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Please write your email..."
            className="w-full  rounded-md border border-green-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
          />
        {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Please write your Password..."
            className="w-full rounded-md border border-green-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
          />
        {errors.password && <p>{errors.password.message}</p>} 
        </div>
        {/* {isLoading && <p>loading...</p>} */}
        <div className="flex flex-col gap-4">
          <button className="btn btn-soft btn-success " type="submit">
            Login
          </button>
          <p>
            New Customer? <b />
            <Link to="/register" className="link link-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
