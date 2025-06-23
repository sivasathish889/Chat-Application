"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const VerifyOtp = () => {
  const route = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setLoading(true);
    await axios
      .post("api/verifyOtp", formData)
      .then((data) => {
        console.log(data.data);
        if (data.data.success) {
          toast.success(data.data.message);
          route.replace("/");
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        }
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="z-10">
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="body rounded-lg p-2 px-10 backdrop-blur-md">
          <div className="header text-center my-4 py-2 text-xl underline">
            Verify OTP
          </div>
          <div className="main">
            <div className="inputs flex flex-col space-y-4 ">
              <div className="input-filed1 flex flex-col"></div>

              <div className="inputfiled3 flex flex-col">
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP"
                  className="ps-2 rounded-md placeholder:text-sm py-1 text-sm w-64"
                  required
                />
              </div>

              <div className="btn flex justify-center items-center">
                <button
                  type="submit"
                  className={`bg-cyan-600 rounded-md px-4 py-1 mt-2 ${
                    loading ? "cursor-not-allowed opacity-45" : ""
                  }`}
                >
                  {loading ? "loading" : " Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
