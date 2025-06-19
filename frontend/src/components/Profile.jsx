import { useContext } from "react";
import ellipseImg from "../assets/images/Ellipse.png";
import cameraSvg from "../assets/images/camera.svg";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
//
const Profile = () => {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <div className="pt-[100px] text-center text-red-500 font-semibold">
        You are not logged in.
        <Navigate to="/" />;
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-[68px] bg-white absolute top-0 left-0 px-[24px]">
        <p className="text-[18px] pl-[15px] pt-[27px]">Account Settings</p>
      </div>

      <div className="grid grid-cols-[76px_1fr] grid-rows-2 h-[max-content] pt-[78px] gap-5 justify-start relative">
        <div className="w-[76px] h-[76px] rounded-full bg-amber-300 relative">
          <img src={ellipseImg} alt="User Avatar" />
          <img
            src={cameraSvg}
            alt="Edit"
            className="absolute bottom-0 right-0"
          />
        </div>
        <div className="flex flex-col">
          <p className="name font-medium text-[15px]">{user.name}</p>
          <p className="email text-[14px]">{user.email}</p>
        </div>
        <div className="content capitalize col-span-2 w-fit text-[14px]">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
          Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat,
          Sed Diam
        </div>
      </div>

      <button
        className="w-full mt-[14px] bg-[#6C25FF] hover:bg-[#CBCBCB] h-[46px] rounded-[6px] text-white font-medium cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};

export default Profile;
