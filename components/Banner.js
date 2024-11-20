"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BannerImage from "@/public/Image/tuincanvas.png";
import { FaFacebookSquare, FaGoogle, FaLinkedin } from "react-icons/fa";
import { ShieldQuestion } from "lucide-react";

const Banner = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://social-login.druckland.de/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Redirect or perform post-login actions here
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center min-h-screen px-5">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-evenly gap-10 w-full">
          <Image
            src={BannerImage}
            layout="responsive"
            quality={90}
            width={200}
            height={200}
            className="basis-[40%] w-full object-cover"
            alt="banner"
          />
          {/* Login form */}
          <form
            onSubmit={handleSubmit}
            className="basis-[60%] bg-white p-4 rounded-md shadow w-full md:max-w-md space-y-4 flex items-center justify-center flex-col"
          >
            <div className="text-center space-y-5">
              <h2 className="text-3xl font-bold">Drukland.de</h2>
              <span>Sign In to your account</span>
              <div className="space-y-4 gap-1">
                <span>Don’t you have an account?</span>
                <Link href={"#"}>Register</Link>
                {error && (
                  <div className="flex items-center justify-center gap-1 text-red-600">
                    <ShieldQuestion size={16} />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8 w-full space-y-10">
              <div className="flex flex-col w-full">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-500 outline-none p-2"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-gray-500 outline-none p-2"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <input type="checkbox" />
              <span>I agree to all</span>
              <Link href={"#"} className="font-semibold text-base">
                Terms & Conditions
              </Link>
            </div>
            <button
              type="submit"
              className="bg-gray-900 text-white font-semibold w-full p-2 rounded-md"
            >
              Log In
            </button>
            <div>
              <span>or sign in with</span>
            </div>
            <div className="flex items-center justify-center gap-5">
              <Link href={"#"} className="text-xl cursor-pointer">
                <FaFacebookSquare />
              </Link>
              <Link href={"#"} className="text-xl cursor-pointer">
                <FaGoogle />
              </Link>
              <Link href={"#"} className="text-xl cursor-pointer">
                <FaLinkedin />
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Banner;
