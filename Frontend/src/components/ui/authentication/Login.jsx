import React, { useState, useContext } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../label";
import { Input } from "../input";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../utils/api";

const Login = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [input, setInput] = useState({

    email: "",
    password: "",
    role: " ",

  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", input);
      if (res.data.success) {
        login(res.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    }
  }



  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-grey-500 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center text-green-900">
            Login
          </h1>
          <div className=" my-2">
            <Label>Email</Label>
            <Input type="email" value={input.email} name='email' onChange={changeEventHandler} placeholder="samWalker@gmail.com"></Input>
          </div>
          <div className=" my-2">
            <Label>Password</Label>
            <Input type="password" value={input.password} name='password' onChange={changeEventHandler} placeholder="********"></Input>
          </div>
          <div className="flex item-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === 'Student'}
                  onChange={changeEventHandler}
                  className="cursor-pinter"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === 'Recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pinter"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <button className=" w-3/4 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-lime-700 hover:bg-primary/90 rounded-md">
            Login
          </button>
          {/* already account then login */}
          <p className="text-green-700 text-center my-2">
            Create new Account
            <Link to="/register" className="text-blue-950">
              <button className=" w-1/2 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-gray-800 hover:bg-primary/90 rounded-md">
                Register
              </button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
