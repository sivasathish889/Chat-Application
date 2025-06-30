import React from 'react'

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white px-8 py-10 rounded-lg shadow-md text-center">
        <h2 className="mb-2 text-2xl font-semibold text-[#075e54]">Welcome to ChatApp</h2>
        <p className="text-gray-600 mb-5">Connect with your friends  instantly.</p>
        <button className="bg-primary text-white border-none px-6 py-2 rounded cursor-pointer font-semibold">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Welcome