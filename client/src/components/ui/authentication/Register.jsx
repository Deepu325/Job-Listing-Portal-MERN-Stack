import React, { useState } from "react";
import { Label } from "../label";
import { Input } from "../input";
import { RadioGroup } from "../radio-group";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "Job Seeker", // ✅ MUST match backend enum
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!input.name || !input.email || !input.password) {
      setError("All fields are required");
      return false;
    }
    if (!input.email.match(/^\S+@\S+\.\S+$/)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (input.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);
      await authService.register(input);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-sm"
        >
          <h1 className="font-bold text-xl mb-5 text-center text-green-900">
            Create Account
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-2 rounded-md mb-4 text-sm font-medium text-center border border-red-100">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="my-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Sam Walker"
            />
          </div>

          {/* Email */}
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="samwalker@gmail.com"
            />
          </div>

          {/* Phone */}
          <div className="my-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="+1234567890"
            />
          </div>

          {/* Password */}
          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="********"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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
                <Label>Job Seeker</Label>
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
                <Label>Employer</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit */}
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
                Processing...
              </span>
            ) : (
              "Register"
            )}
          </button>

          <p className="text-gray-600 text-sm my-2 text-center">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-700 font-bold ml-1 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
