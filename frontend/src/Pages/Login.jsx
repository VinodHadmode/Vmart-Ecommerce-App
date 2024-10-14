import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext)
  const [currentState, setCurrentState] = useState("Log In");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {

      if (currentState == 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })

        if (response.data.success) {
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      }
      else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password })

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('userToken', response.data.token)
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      }


    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message)
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="mt-10 flex items-center justify-center">
      <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-lg shadow-md w-[90%] sm:max-w-md flex flex-col items-center gap-4">
        {/* Title Section */}
        <div className="inline-flex items-center gap-2 mt-5 mb-8">
          <p className="text-3xl font-semibold text-gray-800">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {/* Conditional Name Field */}
        {currentState === "Sign Up" && (
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Name"
            required
          />
        )}

        {/* Email and Password Fields */}
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Password"
          required
        />

        {/* Forgot Password and Toggle State Links */}
        <div className="w-full flex justify-between text-sm mt-[-4px] text-gray-500">
          <p className="cursor-pointer hover:underline">Forgot your password?</p>
          {currentState === "Log In" ? (
            <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer hover:underline">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrentState("Log In")} className="cursor-pointer hover:underline">
              Login Here
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button className="bg-black text-white font-semibold px-8 py-3 mt-6 rounded-lg w-full hover:bg-gray-800 transition duration-300">
          {currentState === "Log In" ? "Log In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
