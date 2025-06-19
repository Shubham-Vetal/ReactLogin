import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const { user, login, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
 
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false); 

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage(''); 
    setIsError(false); 

    if (user) {
      console.log('User is already logged in:', user);
      // Optional: If already logged in, show message and redirect
      setFeedbackMessage('You are already logged in!');
      setTimeout(() => {
          navigate('/profile'); // Redirect if user is already logged in
      }, 500);
      return;
    }

    const response = await login(form.email, form.password);

    if (!response.success) {

      setFeedbackMessage(response.error || 'Login failed. Please try again.');
      setIsError(true); 
    } else {
      console.log('Logged in successfully!');
      setFeedbackMessage(response.message || 'Logged in successfully!');
      // Navigate to the profile page after successful login
      setTimeout(() => {
        navigate('/profile'); 
      },); 
    }
  };

  return (
    <div className="flex flex-col h-full gap-[33px] justify-start">
      <div className="flex flex-col gap-[14px]">
        <div className="text-primary text-[1.75rem] font-medium leading-9 h-[69px] w-[188px] mt-5">
          Signin to your PopX account
        </div>
        <div className="content text-primary opacity-60 text-[18px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[23px] h-[max-content] relative">
        {/* Display feedback messages here */}
        {feedbackMessage && (
          <p className={`text-center text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {feedbackMessage}
          </p>
        )}

        <div className="relative text-[13px]">
          <input
            className="border border-[#CBCBCB] rounded-[6px] w-full h-[40px] pl-[17.22px]"
            name="email"
            value={form.email} 
            onChange={handleChange}
            placeholder="Enter email address"
            required
            type="email"
          />
          <p className="absolute -top-1/2 translate-y-1/2 left-[9px] pl-[5px] w-[96px] h-[17px] bg-[#F7F8F9] text-[#6C25FF]">
            Email address
          </p>
        </div>
        <div className="relative text-[13px]">
          <input
            className="border border-[#CBCBCB] rounded-[6px] w-full h-[40px] pl-[17.22px]"
            name="password"
            value={form.password} 
            onChange={handleChange}
            placeholder="Enter password"
            required
            type="password"
            minLength={8}
          />
          <p className="absolute -top-1/2 translate-y-1/2 left-[9px] pl-[5px] w-[96px] h-[17px] bg-[#F7F8F9] text-[#6C25FF]">
            Password
          </p>
        </div>
        <button
          className="w-full bg-[#6C25FF] hover:bg-[#CBCBCB] h-[46px] rounded-[6px] text-white font-medium cursor-pointer"
          type="submit"
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? 'Logging you in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;