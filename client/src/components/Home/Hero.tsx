import React from "react";
import { Link } from "react-router-dom";
import { BiNotepad } from "react-icons/bi";
import { BsGlobe2 } from "react-icons/bs";
import { BsTruck } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useHistory } from "react-router-dom";

const Hero = () => {
  const history = useHistory();
  return (
    <div>
      {/* Navigation Bar */}
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Post.io</span>
        </div>
        <div className="flex-none hidden px-2 mx-2 lg:flex">
          <div className="flex items-stretch">
            <a
              className="btn btn-ghost btn-sm rounded-btn"
              onClick={() => history.push("/login")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                <circle cx="12" cy="10" r="3" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <pre> </pre>
              Login
            </a>

            <a
              className="btn btn-ghost btn-sm rounded-btn"
              onClick={() => history.push("/signup")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <pre> </pre>
              SignUp
            </a>
          </div>
        </div>
      </div>

      {/* Initial Screen */}
      <div className="hero min-h-screen  bg-base-200">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <img
            src="https://picsum.photos/id/1005/600/600"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="mb-6 text-5xl font-bold">
              One Stop Shop For All Your <br />
              <div className="text-purple-700"> Courier Services</div>
            </h1>
            <p className="mb-5 text-xl ">
              We make sure you make the best financial decision and help to fill
              the void of miscommunication between the recipient and the
              delivery company. Take complete advantage of our platform and stay
              carefree about your courier services.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="w-100 h-40 bg-purple-700 grid grid-flow-col justify-items-stretch py-4 px-4">
        <div className="flex flex-col justify-center  text-white justify-items-center items-center">
          <div className="flex">
            {" "}
            <IconContext.Provider value={{ size: "40px" }}>
              <div>
                <h2>
                  <BiNotepad />
                </h2>
              </div>
            </IconContext.Provider>
            <pre> </pre>
            <h1 className="mb-5 text-2xl">Projects Completed</h1>
          </div>{" "}
          <p className="mb-5 text-4xl font-bold">120+</p>
        </div>
        <div className="flex flex-col justify-center  text-white justify-items-center items-center">
          <div className="flex">
            {" "}
            <IconContext.Provider value={{ size: "40px" }}>
              <div>
                <h2>
                  <BsGlobe2 />
                </h2>
              </div>
            </IconContext.Provider>
            <pre> </pre>
            <h1 className="mb-5 text-2xl">Clients Worldwide</h1>
          </div>

          <p className="mb-5 text-4xl font-bold">100+</p>
        </div>
        <div className="flex flex-col justify-center  text-white justify-items-center items-center">
          <div className="flex">
            {" "}
            <IconContext.Provider value={{ size: "40px" }}>
              <div>
                <h2>
                  <BsTruck />
                </h2>
              </div>
            </IconContext.Provider>
            <pre> </pre>
            <h1 className="mb-5 text-2xl">Owned Vehicles</h1>
          </div>

          <p className="mb-5 text-4xl font-bold">300+</p>
        </div>
        <div className="flex flex-col justify-center  text-white justify-items-center items-center">
          <div className="flex">
            {" "}
            <IconContext.Provider value={{ size: "40px" }}>
              <div>
                <h2>
                  <FiUsers />
                </h2>
              </div>
            </IconContext.Provider>
            <pre> </pre>
            <h1 className="mb-5 text-2xl">People in Team</h1>
          </div>

          <p className="mb-5 text-4xl font-bold">50+</p>
        </div>
      </div>

      <footer className="p-10 footer bg-base-400 text-base-content">
        <div>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            className="fill-current"
          >
            <path d=""></path>
          </svg>
          <p>
            Start.exe Ltd.
            <br />
            Company you can rely on
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Arrange a Shipment!</a>
          <a className="link link-hover">Track your shipment?</a>
          <a className="link link-hover">View History</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Hero;
