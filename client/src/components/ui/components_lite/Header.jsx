import React, { useContext } from "react";
import { Button } from "../button";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Briefcase, Users, TrendingUp, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const Header = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient and animated shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="text-center py-16 px-4">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {/* Animated badge */}
          <div className="animate-fadeIn">
            <span className="px-5 mx-auto inline-flex items-center py-2.5 gap-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-100 text-green-800 font-medium border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default">
              <span className="animate-pulse">
                <Sparkles className="h-4 w-4 text-green-600" />
              </span>
              <span className="text-sm">No.1 Career Embarking Website</span>
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full animate-bounce-slow">NEW</span>
            </span>
          </div>

          {/* Main heading with gradient */}
          <h2 className="text-5xl md:text-6xl font-bold leading-tight animate-slideUp">
            Search, Apply & <br />
            Get Your{" "}
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-gradient">
              Dream Job
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto animate-fadeIn animation-delay-200">
            Discover life-changing career opportunities <br className="hidden md:block" />
            in your chosen field and get hired faster.
          </p>

          {/* CTA Buttons for non-logged in users */}
          {!isAuth && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 my-4 animate-fadeIn animation-delay-600">
              <Link to="/login">
                <Button className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="group border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-6 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  Find Talent
                  <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
        .animation-delay-800 { animation-delay: 0.8s; opacity: 0; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Header;
