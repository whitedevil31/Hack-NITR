import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import constants from "../../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { GoPackage } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { setTimeout } from "timers";
type FormData = {
  orderId: any;
};

const Hero: React.FC = () => {
  const [data, setData] = useState<any>();
  const { register, handleSubmit } = useForm<FormData>();
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.warn("Logging out !");
    setTimeout(() => {
      history.push("login");
    }, 2000);
  };

  const getTrack = async (orderId: FormData) => {
    try {
      const trackPost: AxiosResponse = await axios.post(
        `${constants.BASE_URL}/get/update`,
        orderId
      );
      console.log(trackPost.data);
      setData(trackPost.data);
    } catch (err) {}
  };

  return (
    <div className="block justify-center">
      <div>
        <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
          <div className="flex-1 px-2 mx-2">
            <span className="text-lg font-bold">Post.io</span>
          </div>
          <div
            className="btn btn-ghost btn-md rounded-btn flex  content-center "
            onClick={() => history.push("myorders")}
          >
            <IconContext.Provider value={{ size: "32px" }}>
              <GoPackage />
            </IconContext.Provider>
            <pre> </pre>
            MY ORDERS
          </div>
          <a
            className="btn btn-ghost btn-md rounded-btn flex  content-center"
            onClick={logoutHandler}
          >
            <IconContext.Provider value={{ size: "26px" }}>
              <BiLogOut />
            </IconContext.Provider>
            <pre> </pre>
            SIGN OUT
          </a>
        </div>
        <ToastContainer />
        <form onSubmit={handleSubmit(getTrack)}>
          <div className="flex">
            <div className="mt-48 w-full mx-20">
              <div className="flex flex-row">
                <input
                  placeholder="Enter your orderId here"
                  className="w-full mr-10 input input-neutral input-bordered"
                  {...register("orderId", { required: true })}
                  type="text"
                />
                <button className="btn btn-outline btn-neutral">
                  Track your order
                </button>
              </div>
              <div className="mt-48 mr-8">
                {data?.update.length > 0 ? (
                  data.update.map((item: any) => (
                    <div className="flex flex-col m-6 p-4 border-2 border-black rounded-lg w-full h-24">
                      <div className="flex">
                        {" "}
                        <p> Date: </p>{" "}
                        <p className="ml-3 font-medium">
                          {" "}
                          {moment(item.createdAt).format("DD-MM-YYYY")}{" "}
                        </p>
                      </div>
                      <div className="flex">
                        <p>Update: </p>
                        <p className="ml-3 font-medium">{item.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>There are no updates on your package!</div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
