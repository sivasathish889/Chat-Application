"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { FaCamera, FaRegUserCircle, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const route = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setLoading(true);
    await axios
      .post("api/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        if (data.data.success) {
          toast.success(data.data.message);
          route.replace("/login");
          setLoading(false);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSetProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };
  return (
    <div className="z-10">
      <form onSubmit={(e) => handleLogin(e)} encType="multipart/form-data">
        <div className="body rounded-lg p-2 px-10 backdrop-blur-md">
          <div className="header text-center my-4 py-2 text-xl underline">
            Chat-Application
          </div>
          <div className="main">
            <div className="flex justify-center items-center my-5">
              <div
                className="border border-black rounded-full cursor-pointer"
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.click();
                  }
                }}
              >
                <input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  hidden
                  ref={inputRef}
                  accept="image/gif, image/jpeg"
                  onChange={handleSetProfile}
                />
                {preview ? (
                  <Image
                    src={preview}
                    alt="Profile Preview"
                    className="rounded-full object-cover"
                    style={{ width: 100, height: 100 }}
                    width={100}
                    height={100}
                  />
                ) : (
                  <FaRegUserCircle size={100} strokeWidth={0} />
                )}
              </div>
              {!preview ? (
                <FaCamera
                  size={20}
                  color="#D6A8A8"
                  className="relative right-6 top-8 cursor-pointer"
                />
              ) : (
                <FaTrash
                  size={20}
                  color="#D6A8A8"
                  className="relative right-6 top-8 cursor-pointer"
                  onClick={() => setPreview(null)}
                />
              )}
            </div>
            <div className="inputs flex flex-col space-y-4 ">
              <div className="input-filed1 flex flex-col">
                <input
                  type="userName"
                  name="userName"
                  id="userName"
                  placeholder="User Name"
                  className="ps-2 rounded-md placeholder:text-sm py-1 text-sm w-64"
                  required
                />
              </div>
              <div className="input-filed2 flex flex-col">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  className="ps-2 rounded-md placeholder:text-sm py-1 text-sm w-64"
                  required
                />
              </div>
              <div className="inputfiled4 flex flex-col">
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Phone "
                  className="ps-2 rounded-md placeholder:text-sm py-1 text-sm w-64"
                  required
                />
              </div>
              <div className="inputfiled3 flex flex-col">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="ps-2 rounded-md placeholder:text-sm py-1 text-sm w-64"
                  required
                />
              </div>

              <div className="signup flex  items-center ">
                <p className="text-xs"> You have account? &nbsp;</p>
                <Link href={"/login"} className="underline text-sm">
                  Sign In
                </Link>
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

export default Login;
