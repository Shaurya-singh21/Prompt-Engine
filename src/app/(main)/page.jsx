"use client";
import About from "@/components/About";
import Feed from "@/components/feed";
import { Draggable3DImageRing } from "@/components/lightswind/draggable-3d-image-ring.js";
import Loader from "@/components/Loading";
import { useSession } from "next-auth/react";

function Homepage() {
  let { data: session,status } = useSession();
  const imagesForRing = [
    "/852.jpg",
    "/3920.jpg",
    "/30756.jpg",
    "/90447.jpg",
    "/4841945.jpg",
    "/5055401.jpg",
    "/19197001.jpg",
  ];

  return (
    <>
     
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          {status === "authenticated" ? (
            <div>
              <div className="flex flex-col items-center justify-center w-screen h-fit sm:py-15 py-12 text-amber-100">
                <span className="flex flex-col items-center justify-center text-center">
                  <div>
                    <h1 className="sm:text-7xl text-4xl sm:mb-4  tracking-wide font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-600 to-slate-600">
                      Unleash & Share
                    </h1>
                    <h1 className="sm:text-5xl text-3xl tracking-wider font-extrabold ">
                      AI Creativity
                    </h1>
                  </div>
                  <p className="sm:text-2xl mx-2 text-lg text-gray-200 mt-6 sm:px-10 leading-relaxed ">
                    Prompt Engine empowers your AI journey. Discover, create
                    <br /> and refine prompts for any AI model, turning your
                    ideas into stunning realities with ease
                  </p>
                </span>
              </div>
              <Feed />
            </div>
          ) : (
            <div> 
              <div className="flex flex-col items-center justify-center w-screen h-fit sm:py-15 py-8 text-amber-100">
                <span className="flex flex-col items-center justify-center text-center">
                  <div>
                    <h1 className="sm:text-7xl text-4xl sm:mb-4  tracking-wide font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-600 to-slate-600">
                      Unleash & Share
                    </h1>
                    <h1 className="sm:text-5xl text-3xl tracking-wider font-extrabold ">
                      AI Creativity
                    </h1>
                  </div>
                  <p className="sm:text-2xl mx-2 text-lg text-gray-200 mt-6 sm:px-10 leading-relaxed ">
                    Prompt Engine empowers your AI journey. Discover, create
                    <br /> and refine prompts for any AI model, turning your
                    ideas into stunning realities with ease
                  </p>
                </span>
              </div>
              <div className="sm:mx-20 my-10">
                <Draggable3DImageRing
                  images={imagesForRing}
                  imageDistance={400}
                />
              </div>
              <About />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Homepage;
