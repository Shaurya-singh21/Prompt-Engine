"use client";
import React, { useEffect, useState } from "react";

import { FileText, Calendar, Trash2, LogOut, Files } from "lucide-react";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Loader from "@/components/Loading";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";

function Profile_page() {
  let { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [copyAlert, setCopyAlert] = useState(false);
  const [delAlert, setDelAlert] = useState(false);
  const [np, setnp] = useState(0);
  //getting DATA ++++++
  const getData = async () => {
    setLoading(true);
    const res = await fetch("/api/profile", {
      method: "GET",
    });
    if (res.ok) {
      const item = await res.json();
      setData(item);
      setPrompts(item.user.prompts);
      setnp(item.user.totalPrompts);
      setLoading(false);
    }
   
  };

  //delete data +++++++++++++++
  const deletePrompt = async (id) => {
    const res = await fetch(`/api/profile/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setDelAlert(true);
      setPrompts((t) => t.filter((p) => p._id !== id));
      setnp(np - 1);
    } else {
      alert("Something Went Wrong");
    }
    setTimeout(() => {
      setDelAlert(false);
    }, 1500);
  };

  //update data ++++++++++++++++++++
  const updatePrompt = async (id, updatedData) => {
    const res = await fetch(`/api/prompt/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const copyMesaage = (id) => {
    let message = document.getElementById(id).value;
    window.navigator.clipboard.writeText(message);
    setCopyAlert(true);
    setTimeout(() => {
      setCopyAlert(false);
    }, 1500);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!profile) {
    return <h1>No data</h1>;
  }
  return (
    <>
      {copyAlert && (
        <Alert showAlert={copyAlert} desc={"Prompt Copied SUCCESSFULLY!"} />
      )}
      {delAlert && (
        <Alert showAlert={delAlert} desc={"Prompt Deleted SUCCESSFULLY!"} />
      )}

      <div className={`${session ? "" : "hidden"}`}>
        <div className="lg:mx-20 md:mx-5  px-10 my-10  md:grid grid-cols-3  lg:gap-10 gap-6">
          <div className="col-span-1 w-full bg-slate-900/90  border-r rounded-2xl ring-1 ring-gray-800 border-slate-700/50  p-8">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8">
              <div
                className={`${
                  copyAlert || delAlert ? "blur-sm" : ""
                } relative mb-4`}>
                <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-slate-600/50">
                  <Image
                    src={profile.user.image}
                    layout="fill"
                    objectFit="cover"
                    alt="Profile"
                    className={` w-full h-full object-cover`}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-3 border-slate-900 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">
                {profile.user.username}
              </h2>
              <p className="text-slate-400 text-md mb-4">
                {profile.user.email}
              </p>
            </div>

            {/* Stats Section */}
            <div className="space-y-6">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1">
                    <FileText className="text-cyan-400" size={20} />
                  </div>
                  <span className="text-slate-400 text-md">Total Prompts</span>
                </div>
                <p className="text-3xl font-bold text-start text-white">{np}</p>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1">
                    <Calendar className="text-cyan-400" size={20} />
                  </div>
                  <span className="text-slate-400 text-md">Member Since</span>
                </div>
                <p className="text-3xl font-bold text-start text-white">
                  {profile.user.memberSince}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  signOut({
                    callbackUrl: "/",
                  });
                }}
                className="w-full flex items-center justify-center py-3 bg-gradient-to-r cursor-pointer from-red-600/20 to-red-700/20 text-red-400 rounded-xl hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 border border-red-500/30">
                <LogOut size={20} className="mr-2" />
                Sign-Out
              </button>
            </div>
          </div>
          <div className="col-span-2 rounded-xl mt-10 md:mt-0  ">
            {prompts.length === 0 ? (
              <div className=" sm:h-full h-50 rounded-2xl overflow-hidden ring-1 ring-gray-800 relative w-full flex-col items-center justify-center  text-3xl font-extrabold ">
                <Image
                  src={"/not found.png"}
                  alt="not found"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : (
              <>
                <div className="mb-8 text-start">
                  <h1 className="text-4xl sm:text-start text-center font-bold text-white mb-3">
                    {profile.user.username.charAt(0).toUpperCase() +
                      profile.user.username.slice(1)}
                    's Prompts
                  </h1>
                  <p className="text-slate-400 sm:text-start text-center text-lg">
                    Manage and organize your created prompts
                  </p>
                </div>
                {prompts.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className="ring-1 text-2xl ring-gray-800 bg-slate-900/90  w-full mt-8 px-5 py-2 flex flex-col items-center  rounded-2xl">
                      <div className="flex justify-between w-full">
                        <input
                          className="outline-none w-full  text-xl font-semibold text-white leading-tight my-1   sm:text-2xl"
                          type="text"
                          defaultValue={item.title}
                          onBlur={(e) => {
                            updatePrompt(item._id, { title: e.target.value });
                          }}
                        />
                        <span className="sm:flex sm:gap-4 gap-2 hidden">
                          <div className="p-2 bg-gradient-to-r from-red-600/20 to-red-700/20 text-red-400 rounded-lg hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 border border-red-500/30">
                            <Files
                              className="cursor-pointer  w-7 h-7"
                              onClick={() => {
                                copyMesaage(item._id);
                              }}
                            />
                          </div>
                          <div className="p-2 bg-gradient-to-r from-green-600/20 to-cyan-600/20 text-green-400 rounded-lg hover:from-green-600/30 hover:to-cyan-600/30 transition-all duration-300 border border-green-500/30">
                            <Trash2
                              className="cursor-pointer  w-7 h-7 "
                              onClick={() => {
                                deletePrompt(item._id);
                              }}
                            />
                          </div>
                        </span>
                      </div>
                      <span className="flex outline-none flex-col text-xl h-[80%] my-3 w-full items-start justify-between">
                        <textarea
                          id={item._id}
                          type="text"
                          defaultValue={item.message}
                          rows={4}
                          onBlur={(e) => {
                            item.message = e.target.value;
                            updatePrompt(item._id, { message: item.message });
                          }}
                          className="pr-3  outline-none rounded-md text-gray-400 font-semibold h-full  py-1  w-full "></textarea>

                        <div className="flex items-center flex-wrap w-full gap-5 mt-5">
                          {item.tag.map((item) => {
                            return (
                              <span
                                key={item}
                                className="py-1 flex-wrap list-none text-md px-3 flex items-center justify-center  bg-gradient-to-r cursor-pointer from-red-600/20 to-red-700/20 text-red-400 rounded-3xl hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 border border-red-500/30">
                                {item.charAt(0) === "#" ? item : "#" + item}
                              </span>
                            );
                          })}
                        </div>
                      </span>
                      <span className="flex sm:gap-4 w-full mt-2 gap-2 sm:hidden mb-2 justify-between">
                        <div className="p-2 bg-gradient-to-r from-red-600/20 to-red-700/20 text-red-400 rounded-lg hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 border border-red-500/30">
                          <Files
                            className="cursor-pointer  w-7 h-7"
                            onClick={() => {
                              copyMesaage(item._id);
                            }}
                          />
                        </div>
                        <div className="p-2 bg-gradient-to-r from-green-600/20 to-cyan-600/20 text-green-400 rounded-lg hover:from-green-600/30 hover:to-cyan-600/30 transition-all duration-300 border border-green-500/30">
                          <Trash2
                            className="cursor-pointer  w-7 h-7 "
                            onClick={() => {
                              deletePrompt(item._id, session?.user.id);
                            }}
                          />
                        </div>
                      </span>
                    </li>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile_page;
