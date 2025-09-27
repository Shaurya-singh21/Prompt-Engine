"use client";
import Image from "next/image";
import { useState } from "react";
import Feed_loader from "./Feed_load";
import { Clipboard, ClipboardList } from "lucide-react";
import Alert from "./Alert";
function Feed() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [Post, setPost] = useState([]);
  const [copyAlert, setCopyAlert] = useState(false);

  const handleSubmit = async (e, Term) => {
    e.preventDefault();
    Term = Term.trim();
    const url = `/api/search?tag=${encodeURIComponent(Term)}`;

    const res = await fetch(url, {
      method: "GET",
    });

    if (res.status === 404) {
      setPost(null);
    }
    if (res.ok) {
      const data = await res.json();
      setPost(data.final);
    }

    setLoading(false);
  };
  const copyMesaage = (id) => {
    let val = document.getElementById(id).value;
    window.navigator.clipboard.writeText(val);
    setCopyAlert(true);
    setTimeout(() => {
      setCopyAlert(false);
    }, 1000);
  };
  return (
    <>
      <Alert showAlert={copyAlert} desc={"Prompt Copied SUCCESSFULLY!"} />

      <div
        className={`${
          copyAlert ? "blur-sm" : ""
        } relative mb-4 flex flex-col items-center justify-center w-screen`}>
        <div className="ring-1 bg-green-900/20 ring-gray-300 rounded-2xl sm:w-[45vw] w-[80vw] flex justify-between px-2 py-2 h-fit  ">
          <input
            id="input"
            type="text"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="search prompts"
            className=" text-lg w-[60%] px-2  outline-none"
          />
          <button
            type="button"
            onClick ={(e) => {
              handleSubmit(e, searchTerm);
              setLoading(true);
            }}
            
            className="px-3 hover:from-green-500 hover:via-cyan-600 hover:to-blue-600 bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500    duration-150 hover:scale-105 transition cursor-pointer sm:py-2 py-1  bg-cyan-800   font-semibold text-white rounded-xl">
            Search
          </button>
        </div>

        {loading ? (
          <Feed_loader />
        ) : Post == [] ? (
          <></>
        ) : Post === null ? (
          <h1 className="text-3xl mt-15 font-semibold">No Result Found</h1>
        ) : (
          <ol className="grid lg:grid-cols-2 gap-2 lg:w-full my-20 lg:px-5 px-10">
            {Post.map((p) => {
              return (
                <li
                  key={p._id}
                  className="border-1 text-2xl border-gray-800  h-[300px]  m-4 px-4 py-2 flex flex-col items-center bg-slate-900/90 rounded-2xl">
                  <h1 className=" font-semibold">{p.title}</h1>
                  <h1 className="text-xl mt-1">{p.Cemail}</h1>
                  <span className="flex flex-col text-xl h-[70%] mt-2 w-full items-start justify-between">
                    <textarea
                      defaultValue={p.message}
                      readOnly
                      id={p._id}
                      className="pr-3  outline-none rounded-md text-gray-400 font-semibold h-full  py-1  w-full"></textarea>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-wrap items-center w-full gap-5 mt-5">
                        {p.tag.map((item) => {
                          return (
                            <span
                              key={item}
                              className="py-1  list-none text-md px-3 flex items-center justify-center  bg-gradient-to-r cursor-pointer from-red-600/20 to-red-700/20 text-red-400 rounded-3xl hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 border border-red-500/30">
                              {item.charAt(0) === "#" ? item : "#" + item}
                            </span>
                          );
                        })}
                      </div>
                      <ClipboardList
                        className="cursor-pointer mt-2 w-8 h-8"
                        onClick={() => {
                          copyMesaage(p._id);
                        }}
                      />
                    </div>
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </>
  );
}

export default Feed;
