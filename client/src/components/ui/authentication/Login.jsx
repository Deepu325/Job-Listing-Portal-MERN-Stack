import React, { useContext, useEffect, useState } from 'react'
import { Label } from '../label'
import { Input } from '../input'
import { RadioGroup } from '../radio-group'
import { Button } from '../button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { setToken } from '@/utils/AuthHelpers'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "Job Seeker",
  });
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        setToken(res.data.token); // Save token for api.js

        // Fetch profile data based on role
        try {
          const userRole = res.data.user.role;
          // Construct the correct endpoint manually to avoid relative path issues
          const baseUrl = "http://localhost:4000/api/v1/profile";
          let profileEndpoint = `${baseUrl}/jobseeker`;

          if (userRole === "Employer") {
            profileEndpoint = `${baseUrl}/employer`;
          }

          const profileRes = await axios.get(profileEndpoint, {
            headers: { Authorization: `Bearer ${res.data.token}` }
          });

          const fullUser = {
            ...res.data.user,
            profile: profileRes.data
          };
          dispatch(setUser(fullUser));
        } catch (profileError) {
          console.log("Could not fetch profile on login", profileError);
          // Fallback to basic user data if profile fetch fails
          dispatch(setUser(res.data.user));
        }

        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      {/* 1. GRAIN OVERLAY */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* 2. AURORA BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-green-50/20 to-white">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-green-200/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-[20%] w-[40rem] h-[40rem] bg-teal-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-green-900/5">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-600 text-sm font-medium">Sign in to continue your professional journey</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase tracking-wide text-gray-500 ml-1">Email Address</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="h-11 bg-transparent border-gray-300/50 focus:border-green-500 focus:ring-0 focus:bg-white/40 rounded-xl transition-all duration-200 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold uppercase tracking-wide text-gray-500 ml-1">Password</Label>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="h-11 bg-transparent border-gray-300/50 focus:border-green-500 focus:ring-0 focus:bg-white/40 rounded-xl pr-10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <RadioGroup className="grid grid-cols-2 gap-4" value={input.role}>
                <div
                  className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all duration-200 ${input.role === "Job Seeker"
                    ? "border-green-500/50 bg-green-50/50 text-green-700 shadow-sm"
                    : "border-gray-200/50 hover:border-green-200/50 hover:bg-white/30 text-gray-600"
                    }`}
                  onClick={() => setInput({ ...input, role: "Job Seeker" })}
                >
                  <label className="font-medium text-sm cursor-pointer">Job Seeker</label>
                  <Input
                    type="radio"
                    name="role"
                    value="Job Seeker"
                    checked={input.role === "Job Seeker"}
                    onChange={changeEventHandler}
                    className="hidden"
                  />
                </div>
                <div
                  className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all duration-200 ${input.role === "Employer"
                    ? "border-green-500/50 bg-green-50/50 text-green-700 shadow-sm"
                    : "border-gray-200/50 hover:border-green-200/50 hover:bg-white/30 text-gray-600"
                    }`}
                  onClick={() => setInput({ ...input, role: "Employer" })}
                >
                  <label className="font-medium text-sm cursor-pointer">Recruiter</label>
                  <Input
                    type="radio"
                    name="role"
                    value="Employer"
                    checked={input.role === "Employer"}
                    onChange={changeEventHandler}
                    className="hidden"
                  />
                </div>
              </RadioGroup>
            </div>

            {loading ? (
              <Button disabled className="w-full h-11 bg-green-600 text-white rounded-xl">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-green-600/40 hover:-translate-y-0.5"
              >
                Sign In
              </Button>
            )}

            <div className="text-center text-sm">
              <span className="text-gray-500">Don't have an account? </span>
              <Link to="/register" className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  )
}

export default Login
