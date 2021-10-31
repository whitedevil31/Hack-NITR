import React, { useContext } from "react";
import constants from "../../constants/constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../userContext/context";
type FormData = {
  email: string;
  password: string;
};
const AdminLogin: React.FC = () => {
  const { setLoggedIn } = useAuth();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    try {
      const postData: AxiosResponse = await axios.post(
        `${constants.BASE_URL}/admin/login`,
        data
      );
      console.log(postData.data);
      if (postData.status === 200) {
        localStorage.setItem("token", postData.data["token"]);
        setLoggedIn(true);
        toast.success("Login successful!");

        history.push("/admin/myorders");
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          toast.warn("Incorrect password");
        }
      }
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200 ">
      <ToastContainer />
      <div className="flex-col hero-content lg:flex-row bg-blue-400">
        <div className="m-6 card bg-base-200 w-2/3  rounded h-2/3 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex ml-6">
              <div className="form-control my-4 mx-2">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  className="input rounded-sm"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-sm text-red-500 pt-2 ">
                    *Please enter email
                  </p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-sm text-red-500 pt-2 ">
                    *Please enter valid Email
                  </p>
                )}
              </div>
            </div>
            <div className="flex ml-6">
              <div className="form-control my-4 mx-2">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input rounded-sm"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-sm text-red-500 pt-2 ">
                    *Please enter password
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-sm text-red-500 pt-2 ">
                    *Min characters required is 6
                  </p>
                )}
              </div>
            </div>

            <button
              className="btn btn-outline btn-primary w-40  my-6 ml-8"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex-col justify-center hero-content lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-3xl font-bold">
              Login to your dashboard to explore your orders
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
