"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  BookA,
  WandSparkles,
  TextAlignStart,
  HashIcon,
  X,
  Plus,
  PlusIcon,
  CircleX,
} from "lucide-react";
import Alert from "@/components/Alert";

function Page() {
  const { data: session,status } = useSession();
  const [showAlert, setShowAlert] = React.useState(false);
  const [Tags, setTags] = useState([]);
  let [post, setPost] = React.useState({
    message: "",
    title: "",
    tag: [],
  });
  const addTag = (tag) => {
    tag = tag.replace(/\s+/g, "");
    
    if (tag.length === 0) {
      return;
    }
    if(tag.charAt(0) === '#'){
      tag = tag.slice(1);
    }
    if (Tags.includes(tag)) {
      return;
    }
    const nT = [...Tags, tag];
    setTags(nT);
    setPost({ ...post, tag: nT });
    document.getElementById("tag").value = "";
  };
  const createpost = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/prompt/Create-new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: post.message,
          tag: post.tag,
          title: post.title,
          userId: session?.user.id,
          Cemail: session?.user.email,
        }),
      });

      if (res.ok) {
        setShowAlert(true);
        setPost({ message: "", title: "", tag: [] });
        document.getElementById("title").value = "";
        document.getElementById("prompt").value = "";
        document.getElementById("tag").value = "";
        setTags([]);
        setTimeout(() => setShowAlert(false), 1500);
      } else {
      }
    } catch (err) {
      alert("Error creating new post");
    }
  };

  return (
    
    <div className={`${session ? "" : "hidden"} relative min-h-screen mt-5 flex items-center justify-center`}>
      <Alert
        showAlert={showAlert}
        desc={"Your prompt has been created succesfully."}
      />
      {/* Main Form */}
      <main
        className={`z-10 w-full flex items-center justify-center p-4 transition-all duration-500 ${
          showAlert ? "pointer-events-none select-none blur-md" : ""
        }`}>
        <div className="p-8 ring-1 ring-gray-700 rounded-xl shadow-lg w-full sm:max-w-3xl bg-[#1a1f2e]">
          <div className="text-center mb-10">
            <div className="inline-block bg-cyan-700 p-3 rounded-lg mb-4">
              <WandSparkles className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold text-white">Create New Prompt</h1>
            <p className="text-gray-300 text-xl mt-2">
              Craft your perfect AI prompt with precision and creativity
            </p>
          </div>

          {/* Form */}
          <form 
          
          onSubmit={createpost}>
            {/* Title Input */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="flex text-xl items-center font-bold text-gray-300 mb-3">
                <BookA className="mr-2 w-8 h-8" /> Title
              </label>
              <input
                type="text"
                id="title"
                onChange={(e) =>
                  setPost({ ...post, title: e.target.value.trim() })
                }
                required
                placeholder="Enter title..."
                className="w-full bg-[#2a3245] border border-gray-600 rounded-md p-3 text-white placeholder-gray-500 outline-none hover:ring-1 hover:ring-cyan-500 transition duration-200"
              />
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label
                htmlFor="prompt"
                className="flex items-center text-xl font-bold text-gray-300 mb-3">
                <TextAlignStart className="mr-2 w-8 h-8 " /> Description
              </label>
              <textarea
                id="prompt"
                onChange={(e) =>
                  setPost({ ...post, message: e.target.value.trim() })
                }
                required
                placeholder="Enter description..."
                rows="4"
                className="w-full bg-[#2a3245] border border-gray-600 rounded-md p-3 text-white placeholder-gray-500 outline-none hover:ring-2 hover:ring-cyan-500 transition duration-200"></textarea>
            </div>

            {/* Hashtags Input */}
            <div className="mb-6">
              <label
                htmlFor="tag"
                className="flex items-center text-xl font-bold text-gray-300 mb-3">
                <HashIcon className="mr-2 w-8 h-8" /> Hashtags
              </label>
              <div className="flex md:flex-row flex-col  md:items-center justify-between  ">
                <span className="md:w-[70%] bg-[#2a3245] w-full border outline-none hover:ring-2 hover:ring-cyan-500 transition duration-200 border-gray-600 rounded-md flex items-center justify-between">
                  <input
                    maxLength={12}
                    placeholder="Enter hashtags..."
                    type="text"
                    id="tag"
                    className="w-full bg-[#2a3245] outline-none p-3 text-white placeholder-gray-500 "
                  />
                  <CircleX
                    onClick={() => {
                      document.getElementById("tag").value = "";
                    }}
                    className="w-5 h-5 mr-2 text-gray-300 cursor-pointer"
                  />
                </span>
                <button
                  type="button"
                  onClick={() => {
                    let tagVal = document.getElementById("tag").value;
                    addTag(tagVal);
                    
                  }}
                  className="px-6 md:w-1/4 w-fit mt-4 md:mt-0 py-2.5 flex items-center cursor-pointer text-lg justify-center  font-semibold rounded-2xl hover:opacity-80 transition duration-200 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                  <PlusIcon className="mr-1 w-4 h-4" />
                  Add tag
                </button>
              </div>
              <div>
                {Tags.length === 0 ? (
                  <></>
                ) : (
                  <div className="flex flex-wrap items-center w-full gap-5 mt-5">
                    {Tags.map((item) => {
                      return (
                        <li
                          key={item}
                          className="py-1 list-none text-md px-3 flex items-center justify-between  bg-gradient-to-r cursor-pointer from-red-600/20 to-red-700/20 text-red-400 rounded-xl hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 border border-red-500/30">
                          {item.charAt(0) === "#" ? item : "#" + item}
                          <CircleX
                            className="cursor-pointer w-4 h-4 ml-1 text-red-400"
                            onClick={() => {
                              setTags(Tags.filter((t) => t !== item));
                            }}
                          />
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            
            <div className={`flex items-center justify-end gap-4 mt-10`}>
              <Link
                href="/"
                type="button"
                className="px-6 flex items-center py-2.5 text-lg bg-gray-700 text-white font-semibold rounded-2xl hover:bg-gray-600 transition duration-200">
                <X className="mr-2 w-4 h-4" />
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2.5 flex items-center cursor-pointer text-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl hover:opacity-80 transition duration-200">
                <Plus className="mr-2 w-4 h-4" />
                Create Prompt
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Page;
