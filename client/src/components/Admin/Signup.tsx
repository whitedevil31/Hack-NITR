import React from "react";
import constants from "../../constants/constants";
import axios, { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
type FormData = {
  companyName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
};
const AdminSignup: React.FC = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    const postData: AxiosResponse = await axios.post(
      `${constants.BASE_URL}/admin/register`,
      data
    );
    if (postData.status === 200) {
      toast.success("Registered successfully !");
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200 ">
      <ToastContainer />
      <div className="flex-col hero-content lg:flex-row bg-blue-400 pr-32">
        <div className="m-6 card bg-base-200 w-2/3  rounded h-2/3 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="flex ml-6">
                <div className="form-control my-4 mx-2 w-52">
                  <label className="label">
                    <span className="label-text">Company Name</span>
                  </label>
                  <input
                    type="text"
                    className="input rounded-sm"
                    {...register("companyName", { required: true })}
                  />
                  {errors.companyName?.type === "required" && (
                    <p className="text-sm text-red-500 pt-2 ">
                      *Please enter the Company Name
                    </p>
                  )}
                </div>
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
              <div className="">
                <div className="form-control my-4 mx-2 w-4/5 ml-8">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    type="text"
                    className="input rounded-sm "
                    {...register("address", { required: true })}
                  />
                  {errors.address?.type === "required" && (
                    <p className="text-sm text-red-500 pt-2 ">
                      *Please enter the Address
                    </p>
                  )}
                </div>
              </div>
              <div className="flex ml-6">
                <div className="form-control my-4 mx-2 w-52">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="text"
                    className="input rounded-sm"
                    {...register("phone", { required: true, minLength: 10 })}
                  />
                  {errors.phone?.type === "required" && (
                    <p className="text-sm text-red-500 pt-2 ">
                      *Please enter phone number
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-sm text-red-500 pt-2 ">
                      *Min characters required is 10
                    </p>
                  )}
                </div>
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
                REGISTER
              </button>
              <a href="/admin/login" className="pl-16 text-blue-500">
                Already have an account?
              </a>
            </div>
          </form>
        </div>
        <div className="flex-col justify-center hero-content ">
          <div className="text-center lg:text-left">
            <p className="mb-5 text-5xl font-bold">Register as an company </p>
            <p className="text-lg">
              Link your company with our platform to expand your reach <br />
              <br />
              <br /> <br />
              <br />{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
