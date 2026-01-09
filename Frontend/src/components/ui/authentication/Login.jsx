import React, { useState, useContext } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../label";
import { Input } from "../input";
import { RadioGroup } from "../radio-group";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../utils/api";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "Job Seeker", // ✅ MUST match backend enum
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", input);
      if (res.data.token) {
        alert("Login Successful");
        login(res.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }

  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center text-green-900">
            Login
          </h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="samwalker@gmail.com"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
            />
          </div>

          {/* Role */}
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Job Seeker" // ✅ BACKEND ENUM
                  checked={input.role === "Job Seeker"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Employer" // ✅ BACKEND ENUM
                  checked={input.role === "Employer"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <button type="submit" className="w-3/4 py-3 my-3 text-white flex items-center justify-center mx-auto bg-lime-700 hover:bg-primary/90 rounded-md">
            Login
          </button>

          <p className="text-green-700 text-center my-2">
            Create new Account
          </p>
          <Link to="/register">
            <button className="w-1/2 py-3 my-3 text-white flex items-center justify-center mx-auto bg-gray-800 rounded-md">
              Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
