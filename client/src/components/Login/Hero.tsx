import React, { useContext } from "react";
import constants from "../../constants/constants";
import axios, { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../userContext/context";
type FormData = {
  email: string;
  password: string;
};
const Hero: React.FC = () => {
  const { setLoggedIn } = useAuth();
  // const authContext = useContext(AuthContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  interface responseData {
    success: string;
    token: string;
  }

  const onSubmit = async (data: FormData) => {
    try {
      let postData: AxiosResponse = await axios.post(
        `${constants.BASE_URL}/login`,
        data
      );
      console.log(postData.data);
      // let responseData: responseData = postData.data;

      if (postData.status === 200) {
        localStorage.setItem("token", postData.data["token"]);
        setLoggedIn(true);
        toast.success("Login successful!");

        history.push("/dashboard");
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          toast.warn("Incorrect password");
        }
      } else {
        toast.warn("Something went wrong ");
      }
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200 ">
      <ToastContainer />
      <div className="flex-col hero-content lg:flex-row bg-blue-400 w-full">
        <div className="m-6 card bg-base-200 w-1/3  rounded h-2/3 ">
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
                  {...register("password", { required: true, minLength: 6 })}
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
        <div className="flex-col justify-center hero-content lg:flex-ro w-96">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-5xl font-bold">User login </h1>
            <p className="mb-5">Enter your credentials to login ! </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
