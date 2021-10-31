import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import CONSTANTS from "../../constants/constants";
// @ts-ignore
import Loading from "react-fullscreen-loading";
import { IconContext } from "react-icons";
import { BiMessageAdd } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import moment from "moment";
interface companyOrder {
  _id: any;
  userId: { username: String; email: string; phone: Number };
  toAddress: string;
  fromAddress: string;
  date: Date;
  weight: Number;
  price: Number;
  orderedOn: Date;
  expectedDelivery: string;
  paymentMode: string;
}

const Orders = () => {
  const [loaded, setLoaded] = useState(false);
  const [Order, setOrder] = useState<companyOrder[]>([]);
  useEffect(() => {
    let getData;
    const fetchCompanyOrders = async () => {
      getData = await axios.get(`${CONSTANTS.BASE_URL}/admin/order`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      getData = getData.data;
      console.log(getData);
      setOrder(getData);
    };
    fetchCompanyOrders();

    setLoaded(true);
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.warn("Logging out !");
    setTimeout(() => {
      history.push("login");
    }, 2000);
  };
  const closeOrder = async (id: any) => {
    const orderId = {
      orderId: id,
    };
    console.log(orderId);
    try {
      const orderClose: AxiosResponse = await axios.post(
        `http://localhost:5000/api/userorder/close`,
        orderId,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (orderClose.status === 200) {
        toast.success("Order closed successfully");
      }
      console.log(orderClose);
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          toast.warn("Order Invalid");
        }
      }
    }
  };
  const history = useHistory();
  return (
    <div>
      {/* Navigation Bar */}
      <ToastContainer />
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Post.io</span>
        </div>
        <div
          className="btn btn-ghost btn-md rounded-btn flex  content-center "
          onClick={() => history.push("dashboard")}
        >
          <div className="mt-1">
            <IconContext.Provider value={{ size: "27px" }}>
              <BiMessageAdd />
            </IconContext.Provider>
          </div>
          <pre> </pre>
          ADD LISTING
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

      {/*Main page */}
      <div className="w-100 min-h-screen text-black bg-gray-100">
        <div className="w-100 flex h-full min-h-screen flex-col items-center p-10 ">
          {loaded === true ? (
            <div className="w-full min-h-screen m-5">
              {Order.length > 0 ? (
                Order?.map((item: companyOrder) => (
                  <div className="jusitfy-between p-7 w-3/6 h-full">
                    <div className="m-5 p-5 h-full rounded-md shadow-lg text-black font-light">
                      <div className="flex flex-row space-x-4 text-lg font-bold">
                        <div className="text-xl">{item.fromAddress}</div>
                        <div className="pt-1">
                          <IconContext.Provider value={{ size: "24px" }}>
                            <BsFillArrowRightCircleFill />
                          </IconContext.Provider>
                        </div>
                        <div>{item.toAddress}</div>
                        <div className="flex flex-col pl-10 ">
                          <div className="">{item.weight} Kg(s)</div>
                        </div>
                      </div>
                      <div className="flex flex-row text-lg pt-3">
                        <div>
                          Ordered on:{" "}
                          <p>{moment(item.orderedOn).format("DD-MM-YYYY")}</p>
                        </div>
                        <div className="pl-80 ml-11 text-3xl">
                          <b>₹{item.price}/-</b>
                        </div>
                      </div>

                      <div className="flex flex-row text-lg space-x-28 pt-2">
                        <div className="flex flex-col justify-between">
                          <div>
                            To Ship package on:{" "}
                            <b>{moment(item.date).format("DD-MM-YYYY")}</b>
                          </div>
                          <div>
                            Delivery :{" "}
                            <b>
                              In {item.expectedDelivery} hours from shipping
                            </b>
                          </div>
                          <div>
                            Order ID: <b>{item._id}</b>
                          </div>
                          <div
                            className="btn btn-outline btn-secondary"
                            onClick={() => {
                              closeOrder(item._id);
                            }}
                          >
                            END ORDER
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div>
                            Ordered By : <b>{item.userId.username}</b>
                          </div>
                          <div className="">
                            Email : <b>{item.userId.email}</b>
                          </div>
                          <div className="pb-4">
                            Payment Method : <b>{item.paymentMode}</b>
                          </div>
                          <div
                            className="btn btn-outline btn-accent"
                            onClick={() => history.push(`/order/${item._id}`)}
                          >
                            Add Updates
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center text-red-900 justify-self-center">
                  NO ORDERS PLACED
                </div>
              )}
            </div>
          ) : (
            <Loading loading background="#D3D3D3" loaderColor="#f2ff00" />
          )}
        </div>
      </div>
    </div>
  );
};
export default Orders;
