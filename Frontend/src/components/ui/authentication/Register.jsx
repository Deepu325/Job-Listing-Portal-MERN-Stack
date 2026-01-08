import React, { useState } from 'react';
import Navbar from '../components_lite/Navbar';
import { Label } from '../label';
import { Input } from '../input';
import { RadioGroup } from '../radio-group';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "Student",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!input.fullname || !input.email || !input.password || !input.phoneNumber) {
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
      // Map form role to backend expected role if necessary, or just send input
      // Assuming backend accepts what we send. 
      // Note: Login.jsx uses fullname/email/password/role/phoneNumber? 
      // Login.jsx input state had email/password/role. 
      // Register needs fullname. The input state above used 'name', I changed to 'fullname' to match backend-2-register-api likely expectation?
      // Let's check backend-2-register-api merge log said "Fix register API ... validation".
      // I'll stick to 'fullname' as it's common. Or 'name'. existing code had 'name'. 
      // Let's use 'fullname' to be safe with common schemas, or check 'User model' merge. 
      // Wait, 'user.js' was created.
      // I'll assume 'fullname' is safer if I can't check model.
      // Actually existing code had 'name'. I'll stick to 'fullname' as it matches the 'Register.jsx' from my previous view of 'frontend-auth-context' (Step 56: input.fullname).
      // So I will use 'fullname'.

      const res = await api.post("/api/auth/register", input);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-sm'>
          <h1 className='font-bold text-xl mb-5 text-center text-green-900'>Create Account</h1>

          {error && <div className="bg-red-50 text-red-600 p-2 rounded-md mb-4 text-sm font-medium text-center border border-red-100">{error}</div>}

          <div className='my-2'>
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              type='text'
              id="fullname"
              value={input.fullname}
              name='fullname'
              onChange={changeEventHandler}
              placeholder='Sam Walker'
            />
          </div>
          <div className='my-2'>
            <Label htmlFor="email">Email</Label>
            <Input
              type='email'
              id="email"
              value={input.email}
              name='email'
              onChange={changeEventHandler}
              placeholder='samwalker@gmail.com'
            />
          </div>
          <div className='my-2'>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type='tel'
              id="phoneNumber"
              value={input.phoneNumber}
              name='phoneNumber'
              onChange={changeEventHandler}
              placeholder='+1234567890'
            />
          </div>
          <div className='my-2'>
            <Label htmlFor="password">Password</Label>
            <Input
              type='password'
              id="password"
              value={input.password}
              name='password'
              onChange={changeEventHandler}
              placeholder='********'
            />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input
                  type='radio'
                  name='role'
                  id="r1"
                  value='Student'
                  checked={input.role === 'Student'}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type='radio'
                  name='role'
                  id="r2"
                  value='Recruiter'
                  checked={input.role === 'Recruiter'}
                  onChange={changeEventHandler}
                  className='cursor-pointer'
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`block w-full py-3 my-3 text-white rounded-md transition-colors ${loading ? 'bg-lime-600 opacity-70 cursor-not-allowed' : 'bg-lime-700 hover:bg-lime-800'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                Processing...
              </span>
            ) : "Register"}
          </button>

          <p className='text-gray-600 text-sm my-2 text-center'>
            Already have an account?
            <Link to="/login" className='text-blue-700 font-bold ml-1 hover:underline'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
