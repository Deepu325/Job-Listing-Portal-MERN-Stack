import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

const Home = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Find Your <span className="text-green-600">Dream Job</span> Today
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Connecting the brightest minds with the best opportunities. Browse thousands of job listings or find the perfect candidate for your team.
        </p>
        {!user && (
          <div className="flex justify-center gap-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors">
              Get Started
            </button>
          </div>
        )}

        {user && (
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome back, {user.name}! 🚀
          </h2>
        )}
      </div>
    </div>
  )
}

export default Home
