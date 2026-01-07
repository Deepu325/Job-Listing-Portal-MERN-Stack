import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../label";
import { Input } from "../input";
import { RadioGroup } from "../radio-group";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "Job Seeker",
  });

  const [error, setError] = useState("");
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!input.email || !input.password) {
      setError("All fields are required");
      return false;
    }
    if (!input.email.match(/^\S+@\S+\.\S+$/)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      dispatch(setLoading(true));
      const response = await authService.login(input);
      if (response) {
        dispatch(setUser(response.user));
        localStorage.setItem("token", response.token);
        navigate("/");
      }
    } catch (err) {
      setError(err.toString());
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-sm"
        >
          <h1 className="font-bold text-xl mb-5 text-center text-green-900">
            Welcome Back
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-2 rounded-md mb-4 text-sm font-medium text-center border border-red-100">
              {error}
            </div>
          )}

          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="samwalker@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  id="r1"
                  value="Job Seeker"
                  checked={input.role === "Job Seeker"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Job Seeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  id="r2"
                  value="Employer"
                  checked={input.role === "Employer"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Employer</Label>
              </div>
            </RadioGroup>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`block w-full py-3 my-3 text-white rounded-md transition-colors ${loading
                ? "bg-lime-600 opacity-70 cursor-not-allowed"
                : "bg-lime-700 hover:bg-lime-800"
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                Signing in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center my-4 text-gray-500 text-sm">
            Don't have an account?
            <Link to="/register" className="text-blue-700 font-bold ml-1 hover:underline">
              Register Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
