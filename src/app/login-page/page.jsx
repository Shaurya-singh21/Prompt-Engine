"use client";

import Image from "next/image";
import React, { useState } from "react";
import { HelpCircle } from "lucide-react"; // For icons
import { signIn, useSession, getProviders } from "next-auth/react";
import { useEffect } from "react";
import { TrustedUsers } from "@/components/lightswind/trusted-users";
import Feed_loader from "@/components/Feed_load";

export default function AuthPage() {
  const [load, setLoad] = useState(true);
  let [provider, setProviders] = useState(null);
  const URL = "http://localhost:3000/"
  const getUser = async () => {
    const res = await getProviders();
    setProviders(res);
    setLoad(false);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {load ? (
        <div className="h-screen w-screen flex justify-center mt-50 ">
          <Feed_loader />
        </div>
      ) : (
        <div className="flex h-screen bg-gray-900  font-sans">
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8  relative">
            <div className="max-w-md w-full space-y-6">
              <h2 className="text-4xl font-bold text-white">Welcome </h2>
              <p className="text-gray-400 text-lg">
                Log in to your account to continue
              </p>
              {provider &&
                Object.values(provider).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id, { callbackUrl: "/" });
                    }}
                    className="w-full text-lg flex items-center justify-center px-4 py-2 border border-gray-300 rounded-2xl shadow-sm bg-white cursor-pointer font-medium text-slate-900 hover:bg-gray-200/80 focus:outline-none ">
                    <Image
                      src={`/${provider.id}.png`}
                      alt="Google logo"
                      width={20}
                      height={20}
                      className="mr-3"
                    />
                    Continue with {provider.name}
                  </button>
                ))}

             
              
            </div>

            <div className="absolute bottom-6 left-6 text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-6 w-6" />
            </div>
          </div>

          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-blue-600 text-white relative">
            {" "}
            {/* Added relative here */}
            <div className="max-w-md w-full text-center space-y-8">
              <h2 className="text-4xl font-extrabold tracking-tight">
                Your New <br />
                Prompt Power
              </h2>
              <div className="flex items-center justify-center mt-6">
                <TrustedUsers
                  avatars={[
                    "/user1.png",
                    "/user2.png",
                    "/user3.png",
                    "/user4.png",
                  ]}
                />
              </div>

            </div>
            {/* Help Icon for right side */}
            <div className="absolute bottom-6 right-6 text-indigo-300 hover:text-white">
              <HelpCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
