import React, { useContext, useState } from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Users, Sparkles, ArrowRight } from "lucide-react";

const Header = () => {
  const { isAuth } = useContext(AuthContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div
      className="relative overflow-hidden min-h-screen flex items-center justify-center bg-white group"
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      }}
    >
      {/* 1. GRAIN OVERLAY (Film texture) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* 2. AURORA BACKGROUND (Fluid Shader Effect) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-green-50/20 to-white">
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-green-200/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-[20%] w-[40rem] h-[40rem] bg-teal-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000"></div>

        {/* Moving Gradient Mesh */}
        <div className="absolute inset-0 opacity-30 blur-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-100 via-emerald-50 to-transparent animate-pulse-slow"></div>
      </div>

      {/* 3. MOUSE SPOTLIGHT (Dynamic Lighting) */}
      <div
        className="absolute inset-0 -z-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 mix-blend-soft-light"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(34, 197, 94, 0.15), transparent 40%)`,
        }}
      ></div>

      <div className="relative z-10 text-center pt-32 pb-16 px-4 max-w-5xl mx-auto">
        <div className="flex flex-col gap-8">



          <h2 className="text-5xl md:text-7xl font-bold leading-tight animate-slideUp tracking-tight text-gray-900">
            Search, Apply & <br />
            Get Your{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-green-200/40 blur-lg rounded-full transform -skew-x-12"></span>
              <span className="relative bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-gradient bg-300% pb-2">
                Dream Job
              </span>
            </span>
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto animate-fadeIn animation-delay-200 leading-relaxed">
            Discover life-changing career opportunities in your chosen field and get hired faster with our AI-powered matching.
          </p>

          {/* CTA Buttons for non-logged in users */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 my-2 animate-fadeIn animation-delay-600">
            <Link to="/login">
              <Button className="group bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-full font-semibold text-lg shadow-xl shadow-green-600/20 hover:shadow-green-600/40 transition-all duration-300 hover:-translate-y-1">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="group border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-8 py-6 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1">
                Find Talent
                <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
        .bg-300% {
          background-size: 300%;
        }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Header;
