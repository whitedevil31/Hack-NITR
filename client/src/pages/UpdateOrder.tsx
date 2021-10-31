import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import constants from "../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { GoPackage } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// @ts-ignore
import Loading from "react-fullscreen-loading";
import { useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { setTimeout } from "timers";
type FormData = {
  id: any;
  message: string;
};
const Hero = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
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
  const updateTrack = async (data: FormData) => {
    const orderId = props.match.params.orderId;
    const updateData = {
      orderId,
      message: data.message,
    };
    //console.log(updateData);

    try {
      const update: AxiosResponse = await axios.post(
        `${constants.BASE_URL}/post/update`,
        updateData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(update.status);
      if (update.status === 200) {
        console.log("working");
        toast.success("Updated Successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        // alert("Job posted Successfully!");
      } else {
        toast.warn("Something went wrong ");
      }
    } catch (error) {
      toast.warn("Update did not happen!");
    }
  };

  useEffect(() => {
    const getOrder = async () => {
      const getData: AxiosResponse = await axios.post(
        `${constants.BASE_URL}/get/update`,
        {
          orderId: props.match.params.orderId,
        }
      );
      //console.log(getData?.data);
      setData(getData.data);
      setLoading(true);
    };

    getOrder();
  }, []);

  console.log(data);
  return (
    <div className="block justify-center">
      {loading === false ? (
        <Loading loading background="#D3D3D3" loaderColor="#f2ff00" />
      ) : (
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
          <form onSubmit={handleSubmit(updateTrack)}>
            <div className="flex">
              <div className="mt-48 w-full mx-20">
                <div className="flex flex-row">
                  <input
                    placeholder="Add your Tracking Update here"
                    className="w-full mr-10 input input-neutral input-bordered"
                    {...register("message", { required: true })}
                    type="text"
                  />
                  <button
                    className="btn btn-outline btn-neutral"
                    onClick={() => updateTrack}
                  >
                    Add Update
                  </button>
                </div>
                <div className="mt-48 mr-8">
                  {data.update.length > 0 ? (
                    data.update.map((item: any) => (
                      <div className="flex flex-col m-6 p-4 border-2 border-black rounded-lg w-full h-24">
                        <div className="flex">
                          {" "}
                          <p> Date : </p>{" "}
                          <p className="font-medium">
                            {" "}
                            {moment(item.createdAt).format("DD-MM-YYYY")}{" "}
                          </p>
                        </div>
                        <div className="flex">
                          <p>Update : </p>
                          <p className="font-medium">{item.message}</p>
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
      )}
    </div>
  );
};

export default Hero;
