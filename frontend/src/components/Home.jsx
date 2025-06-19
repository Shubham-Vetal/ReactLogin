import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
//
const Home = () => {
  const login = () => {
    user ? navigate("/profile") : navigate("/login");
  };
  const signup = () => {
    user ? navigate("/profile") : navigate("/signup");
  };
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="px-[24px] py-[56px] flex flex-col justify-end h-full gap-[16px]">
      <div>
        <div className="font-normal text-[28px] w-[231px] h-[33px] mb-2.5 text-primary">
          Welcome to PopX
        </div>
        <p className="w-[232px] h-[48px] text-[18px] text-primary opacity-60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        <button
          className="bg-[#6C25FF] hover:bg-[#6e25ffdc] h-[46px] rounded-[6px] text-white font-medium cursor-pointer"
          onClick={signup}
        >
          Create Account
        </button>
        <button
          className="bg-[#6C25FF4B] hover:bg-[#6e25ff6a] h-[46px] rounded-[6px] text-primary font-medium cursor-pointer"
          onClick={login}
        >
          Already Registered? Login
        </button>
      </div>
    </div>
  );
};

export default Home;
