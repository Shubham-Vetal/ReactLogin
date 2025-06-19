import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    password: "",
    email: "",
    name: "",
    phone: "",
    company: "",
    agency: "",
  });

  const { register, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage("");
    setIsSuccess(false);

    const result = await register(form);

    if (result.success) {
      setFeedbackMessage(result.message);
      setIsSuccess(true);
      setForm({
        password: "",
        email: "",
        name: "",
        phone: "",
        company: "",
        agency: "",
      });

      setTimeout(() => {
        navigate("/profile");
      });
    } else {
      setFeedbackMessage(result.error);
      setIsSuccess(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full gap-[31px] justify-start px-[24px]">
        <div className="text-primary text-[1.75rem] font-medium leading-9 h-[69px] w-[188px] mt-5 mb-0.5">
          Create your PopX account
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[29px] h-full relative"
        >
          {feedbackMessage && (
            <p
              className={`text-center text-sm ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedbackMessage}
            </p>
          )}

          <div className="relative text-[13px]">
            <input
              className="border border-[#CBCBCB] rounded-[6px] w-full h-[40px] pl-[17.22px] placeholder-h-[12.46px]"
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
              required
            />
     
            <p className="absolute -top-1/2 translate-y-1/2 left-[9px] pl-[5px] w-[96px] h-[17px] bg-[#F7F8F9] text-[#6C25FF]">
              Full Name<span className="text-[#DD4A3D]">*</span>
            </p>
          </div>

          <div className="relative text-[13px]">
            <input
              className="border border-[#CBCBCB] rounded-[6px] w-full h-[40px] pl-[17.22px]"
              name="phone"
              onChange={handleChange}
              value={form.phone}
              placeholder="Enter phone number"
              required
              type="tel"
              maxLength={10}
            />
           
            <p className="absolute -top-1/2 translate-y-1/2 left-[9px] pl-[5px] w-[100px] h-[17px] bg-[#F7F8F9] text-[#6C25FF]">
              Phone Number<span className="text-[#DD4A3D]">*</span>
            </p>{" "}
           
          </div>

          <div className="relative text-[13px]">
            <input
              className="border border-[#CBCBCB] rounded-[6px] w-full h-[40px] pl-[17.22px]"
              name="email"
              onChange={handleChange}
              value={form.email}
              placeholder="Enter email address"
              required
              type="email"
            />
            
            <p className="absolute -top-1/2 translate-y-1/2 left-[9px] pl-[5px] w-[105px] h-[17px] bg-[#F7F8F9] text-[#6C25FF]">
              Email address<span className="text-[#DD4A3D]">*</span>
            </p>{" "}
          </div>

          <div className="relative text-[13px]">
            <input
              className="border border-[#CBCBCB] rounded-[6px] w-full h-[40px] pl-[17.22px]"
              name="password"
              onChange={handleChange}
              value={form.password}
              placeholder="Enter password"
              required
              type="password"
              minLength={8}
            />
         
            <p className="absolute -top-1/2 translate-y-1/2 left-[9px] pl-[5px] w-[80px] h-[17px] bg-[#F7F8F9] text-[#6C25FF]">
              Password<span className="text-[#DD4A3D]">*</span>
            </p>{" "}
      
          </div>

          <div className="relative text-[13px]">
            <input
              className="border border-[#CBCBCB] rounded-[6px] w-full h-[40px] pl-[17.22px]"
              name="company"
              onChange={handleChange}
              value={form.company}
              placeholder="Enter company name"
            />

            <p className="absolute -top-1/2 left-[9px] pl-[5px] translate-y-1/2 w-[110px] h-[17px] bg-[#F7F8F9] text-[#6C25FF]">
              Company Name
            </p>{" "}

          </div>

          <div className="flex flex-col gap-[15px]">
            <p className="text-[13px]">
              Are you an Agency?<span className="text-[#DD4A3D]">*</span>
            </p>

            <div className="flex gap-[23px] text-[14px]">
              <label className="flex items-center space-x-2">
                <input
                  className="text-[#6C25FF] accent-[#6C25FF] w-[22px] h-[22px]"
                  name="agency"
                  onChange={handleChange}
                  required
                  type="radio"
                  value="yes"
                  checked={form.agency === "yes"}
                />
                <span>Yes</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  className="text-[#6C25FF] accent-[#6C25FF] w-[22px] h-[22px]"
                  name="agency"
                  onChange={handleChange}
                  type="radio"
                  value="no"
                  checked={form.agency === "no"}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="h-max mt-auto w-full">
            <button
              className="w-full bottom-0 bg-[#6C25FF] hover:bg-[#CBCBCB] h-[46px] rounded-[6px] text-white font-medium cursor-pointer mb-[10px]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
